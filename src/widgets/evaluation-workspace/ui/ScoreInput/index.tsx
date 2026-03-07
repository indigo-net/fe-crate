import { memo } from 'react';

interface Props {
  value: number | null;
  onChange: (score: number) => void;
  disabled?: boolean;
}

const SCORE_RANGE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

const ScoreInput = memo(({ value, onChange, disabled }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-slim-semibold text-text-secondary">점수</label>
      <div className="flex gap-1">
        {SCORE_RANGE.map(score => {
          const isSelected = value === score;
          return (
            <button
              key={score}
              type="button"
              disabled={disabled}
              onClick={() => onChange(score)}
              className={`w-8 h-8 text-sm font-slim-semibold rounded-slim-md transition-all ${
                isSelected
                  ? 'bg-brand-primary text-text-inverse scale-105'
                  : 'bg-bg-subtle text-text-secondary hover:bg-bg-subtle/80 hover:text-text-primary'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              aria-label={`${score}점`}
              aria-pressed={isSelected}
            >
              {score}
            </button>
          );
        })}
      </div>
    </div>
  );
});

ScoreInput.displayName = 'ScoreInput';

export default ScoreInput;
