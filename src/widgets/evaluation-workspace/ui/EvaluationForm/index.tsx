import { memo, useCallback } from 'react';

import { Iconography } from '@/shared/ui';

import ScoreInput from '../ScoreInput';

import type { EvaluationStatus, QuestionScore } from '@/entities/evaluation';

interface Question {
  id: string;
  title: string;
  description?: string;
  type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT';
  options?: { id: string; content: string }[];
}

interface Answer {
  questionId: string;
  content: string;
}

interface Props {
  questions: Question[];
  answers: Answer[];
  scores: QuestionScore[];
  status: EvaluationStatus;
  onScoreChange: (questionId: string, score: number) => void;
  onCommentChange?: (questionId: string, comment: string) => void;
  onComplete: () => void;
}

const EvaluationForm = memo(
  ({ questions, answers, scores, status, onScoreChange, onCommentChange, onComplete }: Props) => {
    const getAnswer = useCallback(
      (questionId: string) => {
        return answers.find(a => a.questionId === questionId)?.content ?? '';
      },
      [answers],
    );

    const getScore = useCallback(
      (questionId: string) => {
        return scores.find(s => s.questionId === questionId)?.score ?? null;
      },
      [scores],
    );

    const getComment = useCallback(
      (questionId: string) => {
        return scores.find(s => s.questionId === questionId)?.comment ?? '';
      },
      [scores],
    );

    const isCompleted = status === 'COMPLETED';

    return (
      <form className="flex flex-col h-full" onSubmit={e => e.preventDefault()}>
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-3xl mx-auto space-y-8">
            {questions.map((question, index) => {
              const answer = getAnswer(question.id);
              const score = getScore(question.id);
              const comment = getComment(question.id);

              return (
                <article
                  key={question.id}
                  className="bg-bg-base border border-border-default rounded-slim-2xl p-6 space-y-4"
                >
                  <header className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-slim-full bg-brand-primary/10 text-brand-primary text-sm font-slim-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-base font-slim-semibold text-text-primary">{question.title}</h3>
                      {question.description && (
                        <p className="text-sm text-text-secondary mt-1">{question.description}</p>
                      )}
                    </div>
                  </header>

                  <div className="pl-12 space-y-4">
                    <div className="p-4 bg-bg-subtle rounded-slim-lg">
                      <p className="text-sm font-slim-semibold text-text-secondary mb-2">지원자 답변</p>
                      <p className="text-sm text-text-primary whitespace-pre-wrap">
                        {answer || <span className="text-text-tertiary italic">답변 없음</span>}
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <ScoreInput
                        value={score}
                        onChange={s => onScoreChange(question.id, s)}
                        disabled={isCompleted}
                      />

                      {onCommentChange && (
                        <div className="flex-1">
                          <label className="text-xs font-slim-semibold text-text-secondary">
                            코멘트 (선택)
                          </label>
                          <textarea
                            value={comment}
                            onChange={e => onCommentChange(question.id, e.target.value)}
                            disabled={isCompleted}
                            placeholder="이 답변에 대한 코멘트를 입력하세요..."
                            className="w-full mt-1 px-3 py-2 text-sm bg-bg-subtle border border-border-default rounded-slim-lg resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-50"
                            rows={2}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}

            {questions.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-text-tertiary">
                <Iconography.Stroke.Document className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-base">평가할 질문이 없습니다</p>
              </div>
            )}
          </div>
        </div>

        <footer className="sticky bottom-0 bg-bg-base border-t border-border-default px-8 py-4">
          <div className="max-w-3xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">총 점수:</span>
              <span className="text-lg font-slim-bold text-brand-primary">
                {scores.reduce((sum, s) => sum + s.score, 0)}점
              </span>
              <span className="text-sm text-text-tertiary">/ {questions.length * 10}점</span>
            </div>

            {!isCompleted && (
              <button
                type="button"
                onClick={onComplete}
                className="px-6 py-2.5 bg-neon-green-500 text-text-inverse text-sm font-slim-semibold rounded-slim-lg hover:bg-neon-green-600 transition-colors"
              >
                평가 완료
              </button>
            )}

            {isCompleted && (
              <span className="px-4 py-2 bg-neon-green-500/10 text-neon-green-600 text-sm font-slim-semibold rounded-slim-lg">
                평가 완료됨
              </span>
            )}
          </div>
        </footer>
      </form>
    );
  },
);

EvaluationForm.displayName = 'EvaluationForm';

export default EvaluationForm;
