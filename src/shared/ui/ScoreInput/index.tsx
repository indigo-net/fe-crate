import { memo, useMemo } from 'react';

interface Props {
  value: number | null;
  onChange: (score: number) => void;
  disabled?: boolean;
  max?: number;
  step?: number;
}

const ScoreInput = memo(({ value, onChange, disabled, max = 10, step = 1 }: Props) => {
  const scores = useMemo(() => {
    const safeStep = Math.max(1, step);
    const result: number[] = [];
    for (let i = safeStep; i <= max; i += safeStep) {
      result.push(i);
    }
    return result;
  }, [max, step]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1 flex-wrap">
        {scores.map(score => {
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
