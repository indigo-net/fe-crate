import { memo, useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import {
  EvaluationApiService,
  EvaluationStateService,
  useEvaluationStore,
  type ApplicationListItem,
  type FormQuestion,
  type ApplicationAnswer,
} from '@/entities/evaluation';
import { FormApiService } from '@/entities/form';
import DeveloperConsole from '@/shared/lib/developer-console';
import { useDebounce } from '@/shared/lib';
import {
  ApplicantSidebar,
  EvaluationForm,
  EvaluationHeader,
  QuestionSidebar,
} from '@/widgets/evaluation-workspace/ui';

type EvaluationMode = 'application' | 'question';

const PageEvaluation = memo(() => {
  const { formId } = useParams<{ formId: string }>();
  const [searchParams] = useSearchParams();
  const mode = (searchParams.get('mode') as EvaluationMode) || 'application';

  const evaluation = useEvaluationStore(state => state.evaluation);
  const setEvaluation = useEvaluationStore(state => state.setEvaluation);
  const clearEvaluation = useEvaluationStore(state => state.clearEvaluation);

  const [formTitle, setFormTitle] = useState('');
  const [questions, setQuestions] = useState<FormQuestion[]>([]);
  const [applicants, setApplicants] = useState<ApplicationListItem[]>([]);
  const [answers, setAnswers] = useState<ApplicationAnswer[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [isLoading, setIsLoading] = useState(true);

  const isSavingRef = useRef(false);

  // Debounce evaluation for auto-save
  const debouncedEvaluation = useDebounce(evaluation, 500);

  // Initial data fetch: form title, questions, applicants
  useEffect(() => {
    if (!formId) {
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch form title
        const forms = await FormApiService.fetchFormList();
        const form = forms.find(f => f.getValue('id') === formId);
        if (form) {
          setFormTitle(form.getValue('title') ?? '폼');
        }

        // Fetch questions and applicants in parallel
        const [questionsData, applicantsData] = await Promise.all([
          EvaluationApiService.fetchQuestions(formId),
          EvaluationApiService.fetchApplications(formId),
        ]);

        setQuestions(questionsData);
        setApplicants(applicantsData);
        setIsLoading(false);
      } catch (error) {
        DeveloperConsole.error({ message: 'Failed to fetch form data', data: error });
        setIsLoading(false);
      }
    };

    fetchData();
  }, [formId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearEvaluation();
    };
  }, [clearEvaluation]);

  // Auto-save when evaluation changes (debounced)
  useEffect(() => {
    const saveEvaluation = async () => {
      if (!debouncedEvaluation?.getValue('id') || isSavingRef.current) {
        return;
      }

      // Don't save if status is PENDING (not yet created)
      if (debouncedEvaluation.getValue('status') === 'PENDING') {
        return;
      }

      try {
        isSavingRef.current = true;
        setSaveStatus('saving');

        await EvaluationApiService.updateEvaluation(
          debouncedEvaluation.getValue('id'),
          {
            scores: debouncedEvaluation.getValue('scores'),
            overallComment: debouncedEvaluation.getValue('overallComment'),
          },
          debouncedEvaluation.getValue('applicationId'),
        );

        setSaveStatus('saved');
      } catch (error) {
        DeveloperConsole.error({ message: 'Failed to save evaluation', data: error });
        setSaveStatus('error');
      } finally {
        isSavingRef.current = false;
      }
    };

    saveEvaluation();
  }, [debouncedEvaluation]);

  // Handle applicant selection
  const handleSelectApplicant = useCallback(
    async (applicantId: string) => {
      setSelectedId(applicantId);
      clearEvaluation();
      setAnswers([]);

      try {
        // Fetch answers and evaluation in parallel
        const [answersData, existingEvaluation] = await Promise.all([
          EvaluationApiService.fetchApplicationWithAnswers(applicantId),
          EvaluationApiService.fetchEvaluation(applicantId),
        ]);

        setAnswers(answersData.answers);

        if (existingEvaluation) {
          setEvaluation(existingEvaluation);
        } else {
          // Create initial evaluation state
          setEvaluation(
            EvaluationStateService.getInitialEvaluation().setValue('applicationId', applicantId),
          );
        }
      } catch (error) {
        DeveloperConsole.error({ message: 'Failed to fetch evaluation data', data: error });
      }
    },
    [clearEvaluation, setEvaluation],
  );

  const handleSelectQuestion = useCallback((questionId: string) => {
    setSelectedId(questionId);
  }, []);

  // Handle score change
  const handleScoreChange = useCallback(
    (questionId: string, score: number) => {
      setEvaluation(prev => {
        if (!prev) {
          return prev;
        }
        return EvaluationStateService.setScore(prev, questionId, score);
      });

      setSaveStatus('saving');
    },
    [setEvaluation],
  );

  // Handle comment change
  const handleCommentChange = useCallback(
    (questionId: string, comment: string) => {
      setEvaluation(prev => {
        if (!prev) {
          return prev;
        }
        return EvaluationStateService.setQuestionComment(prev, questionId, comment);
      });

      setSaveStatus('saving');
    },
    [setEvaluation],
  );

  // Handle evaluation completion
  const handleComplete = useCallback(async () => {
    if (!evaluation) {
      return;
    }

    try {
      setSaveStatus('saving');

      // If evaluation doesn't have an ID yet, create it first
      let evaluationId = evaluation.getValue('id');
      if (!evaluationId || evaluation.getValue('status') === 'PENDING') {
        const newEvaluation = await EvaluationApiService.createEvaluation(
          evaluation.getValue('applicationId'),
          formId ?? '',
        );
        evaluationId = newEvaluation.getValue('id');
        setEvaluation(newEvaluation);
      }

      const updated = EvaluationStateService.markAsCompleted(evaluation);

      await EvaluationApiService.updateEvaluation(
        evaluationId,
        {
          status: 'COMPLETED',
          scores: updated.getValue('scores'),
          overallComment: updated.getValue('overallComment'),
        },
        evaluation.getValue('applicationId'),
      );

      setEvaluation(updated);
      setSaveStatus('saved');
    } catch (error) {
      DeveloperConsole.error({ message: 'Failed to complete evaluation', data: error });
      setSaveStatus('error');
    }
  }, [evaluation, formId, setEvaluation]);

  // Map applicants to sidebar format
  const sidebarApplicants = applicants.map(a => ({
    id: a.id,
    name: a.applicantName,
    submittedAt: a.submittedAt,
    status: a.status === 'EVALUATED' ? 'COMPLETED' as const : 'PENDING' as const,
  }));

  const completedCount = sidebarApplicants.filter(a => a.status === 'COMPLETED').length;

  // Transform questions for EvaluationForm
  const formQuestions = questions.map(q => ({
    id: q.id,
    title: q.title,
    description: q.description,
    type: q.type,
    options: q.options?.map((opt, idx) => ({ id: `opt-${idx}`, content: opt })),
  }));

  // Transform answers for EvaluationForm
  const formAnswers = answers.map(a => ({
    questionId: a.questionId,
    content: Array.isArray(a.value) ? a.value.join(', ') : (a.value ?? ''),
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-bg-base">
        <p className="text-text-secondary">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-bg-base">
      <EvaluationHeader
        mode={mode}
        formTitle={formTitle}
        completedCount={completedCount}
        totalCount={applicants.length}
        saveStatus={saveStatus}
      />

      <div className="flex flex-1 overflow-hidden">
        {mode === 'application' ? (
          <ApplicantSidebar
            applicants={sidebarApplicants}
            selectedId={selectedId}
            onSelect={handleSelectApplicant}
          />
        ) : (
          <QuestionSidebar
            questions={questions.map(q => ({
              id: q.id,
              title: q.title,
              type: q.type,
              order: q.order,
            }))}
            selectedId={selectedId}
            onSelect={handleSelectQuestion}
          />
        )}

        <main className="flex-1 overflow-hidden">
          {selectedId ? (
            <EvaluationForm
              questions={formQuestions}
              answers={formAnswers}
              scores={evaluation?.getValue('scores') ?? []}
              status={evaluation?.getValue('status') ?? 'PENDING'}
              onScoreChange={handleScoreChange}
              onCommentChange={handleCommentChange}
              onComplete={handleComplete}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-text-tertiary">
              <p>평가할 항목을 선택하세요</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
});

PageEvaluation.displayName = 'PageEvaluation';

export default PageEvaluation;
