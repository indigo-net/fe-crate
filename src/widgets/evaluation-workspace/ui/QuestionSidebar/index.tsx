import { memo } from 'react';

import { Iconography } from '@/shared/ui';

interface Question {
  id: string;
  title: string;
  type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT';
  order: number;
}

interface Props {
  questions: Question[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const QuestionSidebar = memo(({ questions, selectedId, onSelect }: Props) => {
  return (
    <aside className="w-72 h-full bg-bg-base border-r border-border-default overflow-y-auto">
      <header className="sticky top-0 bg-bg-base px-4 py-3 border-b border-border-default">
        <div className="flex items-center gap-2">
          <Iconography.Stroke.Document className="w-5 h-5 text-brand-primary" />
          <h2 className="text-sm font-slim-bold text-text-primary">질문 목록</h2>
          <span className="ml-auto text-xs text-text-tertiary">{questions.length}개</span>
        </div>
      </header>

      <ul className="divide-y divide-border-subtle">
        {questions.map((question, index) => {
          const isSelected = selectedId === question.id;

          return (
            <li key={question.id}>
              <button
                type="button"
                onClick={() => onSelect(question.id)}
                className={`w-full px-4 py-3 text-left transition-colors ${
                  isSelected ? 'bg-brand-primary/5' : 'hover:bg-bg-subtle/50'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-slim-full bg-bg-subtle text-xs font-slim-bold text-text-secondary flex items-center justify-center">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-slim-semibold truncate ${
                        isSelected ? 'text-brand-primary' : 'text-text-primary'
                      }`}
                    >
                      {question.title}
                    </p>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {questions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-text-tertiary">
          <Iconography.Stroke.Document className="w-12 h-12 mb-3 opacity-50" />
          <p className="text-sm">등록된 질문이 없습니다</p>
        </div>
      )}
    </aside>
  );
});

QuestionSidebar.displayName = 'QuestionSidebar';

export default QuestionSidebar;
