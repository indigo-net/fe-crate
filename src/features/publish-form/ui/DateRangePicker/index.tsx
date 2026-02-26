import { memo } from 'react';

import { Iconography } from '@/shared/ui';

import useDateRangePickerController from './hook';

const DateRangePicker = memo(() => {
  const {
    publishedAt,
    closedAt,
    isAlwaysOpen,
    isDraft,
    handlePublishedAtChange,
    handleClosedAtChange,
    handleAlwaysOpenChange,
  } = useDateRangePickerController();

  return (
    <section
      className={`flex flex-col gap-4 transition-all duration-300 ${
        isDraft ? 'opacity-40 grayscale pointer-events-none' : ''
      }`}
    >
      <h3 className="text-lg font-slim-bold text-text-primary flex items-center gap-2">
        <Iconography.Stroke.Calendar className="w-5 h-5 text-brand-primary" />
        모집 기간 설정
      </h3>
      <div className="bg-bg-subtle p-6 rounded-slim-xl border border-border-default">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-slim-semibold text-text-secondary ml-1">
              게시 시작일
            </label>
            <div className="relative group">
              <input
                type="date"
                value={publishedAt ?? ''}
                onChange={e => handlePublishedAtChange(e.target.value)}
                className="w-full px-4 py-3 bg-bg-base border border-border-default rounded-slim-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all outline-none text-text-primary font-slim-medium"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-brand-primary transition-colors pointer-events-none">
                <Iconography.Stroke.Calendar className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[11px] text-text-tertiary ml-1">* 해당 시점부터 폼이 공개됩니다.</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-slim-semibold text-text-secondary ml-1">
              모집 마감일
            </label>
            <div className="relative group">
              <input
                type="date"
                value={closedAt ?? ''}
                onChange={e => handleClosedAtChange(e.target.value)}
                disabled={isAlwaysOpen}
                className={`w-full px-4 py-3 bg-bg-base border border-border-default rounded-slim-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all outline-none text-text-primary font-slim-medium ${
                  isAlwaysOpen ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-brand-primary transition-colors pointer-events-none">
                <Iconography.Stroke.Clock className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[11px] text-text-tertiary ml-1">
              * 마감 시 더 이상 지원할 수 없습니다.
            </p>
          </div>
        </div>

        {/* 상시 모집 체크박스 */}
        <div className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="always-open"
            checked={isAlwaysOpen}
            onChange={e => handleAlwaysOpenChange(e.target.checked)}
            className="w-4 h-4 text-brand-primary border-border-default rounded focus:ring-brand-primary"
          />
          <label htmlFor="always-open" className="text-sm text-text-secondary cursor-pointer">
            상시 모집 (마감일 없음)
          </label>
        </div>
      </div>
    </section>
  );
});

DateRangePicker.displayName = 'DateRangePicker';

export default DateRangePicker;
