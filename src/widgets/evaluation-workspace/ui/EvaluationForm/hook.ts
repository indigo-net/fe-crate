import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAlertContext } from '@/app/lib';
import { AnswerModel } from '@/entities/answer';
import { EvaluationApiService, EvaluationListStateService, EvaluationModel, useEvaluationListStore } from '@/entities/evaluation';
import { FormQuestionModel } from '@/entities/form';
import { DeveloperConsole, IndexedDBManager, UUID } from '@/shared/lib';

import type { EvaluationStatus } from '@/entities/evaluation';
import type { FormQuestionType } from '@/entities/form';

const IDB_DB_NAME = 'crate-evaluation';
const IDB_DB_VERSION = 1;
const IDB_STORE_NAME = 'evaluations';

interface SerializedEvaluation {
  id: string;
  target: {
    id: string;
    question: {
      id: string;
      type: string;
      title: string;
      description: string | null;
      required: boolean;
      options: unknown[] | null;
    };
    value: string | string[] | null;
  };
  score: number;
  weight: number;
  comment?: string;
  status: EvaluationStatus;
}

function serializeEvaluations(
  evaluations: EvaluationModel<AnswerModel<FormQuestionModel>>[],
): SerializedEvaluation[] {
  return evaluations.map(e => ({
    ...e.toJSON(),
    target: {
      ...e.getValue('target').toJSON(),
      question: e.getValue('target').getValue('question').toJSON(),
    },
  }));
}

function deserializeEvaluations(
  data: SerializedEvaluation[],
): EvaluationModel<AnswerModel<FormQuestionModel>>[] {
  return data.map(
    item =>
      new EvaluationModel<AnswerModel<FormQuestionModel>>({
        id: item.id,
        target: new AnswerModel<FormQuestionModel>({
          id: item.target.id,
          question: new FormQuestionModel({
            id: item.target.question.id,
            title: item.target.question.title,
            description: item.target.question.description,
            type: item.target.question.type as FormQuestionType,
            required: item.target.question.required,
          }),
          value: item.target.value,
        }),
        weight: item.weight,
        score: item.score,
        comment: item.comment,
        status: item.status ?? 'IN_COMPLETE',
      }),
  );
}

const useEvaluationFormController = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const { showAlert } = useAlertContext();

  const evaluations = useEvaluationListStore(state => state.evaluations);
  const setEvaluations = useEvaluationListStore(state => state.setEvaluations);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentEvaluation = evaluations[currentIndex] ?? null;
  const totalScore = EvaluationListStateService.getTotalScore(evaluations);
  const isAllScored = EvaluationListStateService.checkIsAllScored(evaluations);

  // 초기화: IndexedDB open → 캐시 복원 또는 API fetch
  const initialize = useCallback(async () => {
    if (!formId) {
      return;
    }

    try {
      setIsLoading(true);

      await IndexedDBManager.open({
        name: IDB_DB_NAME,
        version: IDB_DB_VERSION,
        onUpgrade: db => {
          if (!db.objectStoreNames.contains(IDB_STORE_NAME)) {
            db.createObjectStore(IDB_STORE_NAME);
          }
        },
      });

      const cached = await IndexedDBManager.get<SerializedEvaluation[]>(IDB_STORE_NAME, formId);

      if (cached && cached.length > 0) {
        setEvaluations(deserializeEvaluations(cached));
      } else {
        const result = await EvaluationApiService.fetchFormEvaluations(formId);
        setEvaluations(result.evaluations);
        setIsSubmitted(result.isSubmitted);

        if (result.evaluations.length > 0 && !result.isSubmitted) {
          await IndexedDBManager.put(IDB_STORE_NAME, formId, serializeEvaluations(result.evaluations));
        }
      }
    } catch (error) {
      DeveloperConsole.log({
        message: 'Failed to initialize evaluations',
        data: error,
        location: 'EvaluationForm/hook.ts',
      });
    } finally {
      setIsLoading(false);
    }
  }, [formId, setEvaluations]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // unmount 시 스토어 cleanup
  useEffect(() => {
    return () => {
      setEvaluations([]);
    };
  }, [setEvaluations]);

  const persistToIndexedDB = useCallback(
    async (updated: typeof evaluations) => {
      if (!formId) {
        return;
      }
      try {
        await IndexedDBManager.put(IDB_STORE_NAME, formId, serializeEvaluations(updated));
      } catch (error) {
        DeveloperConsole.log({
          message: 'Failed to persist to IndexedDB',
          data: error,
          location: 'EvaluationForm/hook.ts',
        });
      }
    },
    [formId],
  );

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(prev + 1, evaluations.length - 1));
  }, [evaluations.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  }, []);

  const handleScoreChange = useCallback(
    (score: number) => {
      if (!currentEvaluation || isSubmitted) {
        return;
      }
      const targetId = currentEvaluation.getValue('target').getValue('id');
      const updated = EvaluationListStateService.setScore(evaluations, targetId, score);
      setEvaluations(updated);
      persistToIndexedDB(updated);
    },
    [currentEvaluation, evaluations, isSubmitted, setEvaluations, persistToIndexedDB],
  );

  const handleCommentChange = useCallback(
    (comment: string) => {
      if (!currentEvaluation || isSubmitted) {
        return;
      }
      const targetId = currentEvaluation.getValue('target').getValue('id');
      const updated = EvaluationListStateService.setComment(evaluations, targetId, comment);
      setEvaluations(updated);
      persistToIndexedDB(updated);
    },
    [currentEvaluation, evaluations, isSubmitted, setEvaluations, persistToIndexedDB],
  );

  const submitEvaluation = useCallback(async () => {
    if (!formId) {
      return;
    }
    try {
      await EvaluationApiService.submitEvaluation(formId, evaluations);
      await IndexedDBManager.delete(IDB_STORE_NAME, formId);
      setEvaluations([]);
      navigate('/evaluator/dashboard');
    } catch (error) {
      DeveloperConsole.log({
        message: 'Failed to submit evaluation',
        data: error,
        location: 'EvaluationForm/hook.ts',
      });
    }
  }, [formId, evaluations, setEvaluations, navigate]);

  const handleComplete = useCallback(() => {
    showAlert({
      id: UUID.v4(),
      title: '평가 완료',
      content: '완료 후 수정할 수 없습니다. 평가를 제출하시겠습니까?',
      confirmCallback: submitEvaluation,
    });
  }, [showAlert, submitEvaluation]);

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlePrev, handleNext]);

  return {
    isLoading,
    isSubmitted,
    currentIndex,
    currentEvaluation,
    evaluations,
    totalScore,
    isAllScored,
    handleNext,
    handlePrev,
    handleScoreChange,
    handleCommentChange,
    handleComplete,
  };
};

export default useEvaluationFormController;
