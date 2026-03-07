import { memo } from 'react';

import { Iconography } from '@/shared/ui';

import useTargetCountInputController from './hook';

const TargetCountInput = memo(() => {
  const {
    targetCount,
    standbyCount,
    showInput,
    isDraft,
    handleTargetCountChange,
    handleStandbyCountChange,
  } = useTargetCountInputController();

  if (!showInput) {
    return null;
  }

  return (
    <section
      className={`flex flex-col gap-4 transition-all duration-300 ${
        isDraft ? 'opacity-40 grayscale pointer-events-none' : ''
      }`}
    >
      <h3 className="text-lg font-slim-bold text-text-primary flex items-center gap-2">
        <Iconography.Stroke.Users className="w-5 h-5 text-brand-primary" />
        선발 인원 설정
      </h3>
      <div className="bg-bg-subtle p-6 rounded-slim-xl border border-border-default">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="target-count-input"
              className="text-sm font-slim-semibold text-text-secondary ml-1"
            >
              목표 인원
            </label>
            <input
              id="target-count-input"
              type="number"
              min="1"
              value={targetCount ?? ''}
              onChange={e => handleTargetCountChange(e.target.value)}
              placeholder="선발할 인원 수"
              className="w-full px-4 py-3 bg-bg-base border border-border-default rounded-slim-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all outline-none text-text-primary font-slim-medium"
              aria-describedby="target-count-helper"
            />
            <p id="target-count-helper" className="text-[11px] text-text-tertiary ml-1">
              * 최종 선발할 인원 수입니다.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="standby-count-input"
              className="text-sm font-slim-semibold text-text-secondary ml-1"
            >
              예비 인원
            </label>
            <input
              id="standby-count-input"
              type="number"
              min="0"
              value={standbyCount ?? ''}
              onChange={e => handleStandbyCountChange(e.target.value)}
              placeholder="예비 합격 인원 수"
              className="w-full px-4 py-3 bg-bg-base border border-border-default rounded-slim-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all outline-none text-text-primary font-slim-medium"
              aria-describedby="standby-count-helper"
            />
            <p id="standby-count-helper" className="text-[11px] text-text-tertiary ml-1">
              * 합격자 미등록 시 대체될 인원입니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

TargetCountInput.displayName = 'TargetCountInput';

export default TargetCountInput;
