import { memo } from 'react';

import { DarkModeButton } from '@/features/toggle-theme/ui';
import { Iconography } from '@/shared/ui';
import { FormMetaInfo, QuestionPreview } from '@/widgets/form-detail/ui';

import { usePageFormApplyController } from './hook';

const PageFormApply = memo(() => {
  const { formSignature, formQuestions, isSubmitting, handleApplyClick } =
    usePageFormApplyController();

  if (!formSignature) {
    return (
      <div className="w-full min-h-[100dvh] flex items-center justify-center bg-bg-base">
        <div className="flex flex-col items-center gap-4 p-8">
          <Iconography.Stroke.Document className="w-12 h-12 text-text-tertiary" />
          <p className="text-text-secondary">공고 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const status = formSignature.getValue('status');
  const canApply = status === 'PUBLISHED';
  const isClosed = status === 'CLOSED';

  return (
    <div className="w-full min-h-[100dvh] flex flex-col bg-bg-base text-text-primary">
      <header className="w-full px-6 py-4 flex justify-between items-center bg-bg-base border-b border-border-default sticky top-0 z-50">
        <div className="mx-auto w-full max-w-4xl flex justify-between items-center">
          <h1 className="text-lg font-slim-bold text-text-primary">지원서 작성</h1>
          <DarkModeButton />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-bg-subtle/50">
        <div className="max-w-4xl mx-auto py-12 px-6 flex flex-col gap-8">
          <FormMetaInfo formSignature={formSignature} />
          <QuestionPreview questions={formQuestions} />

          <div className="w-full flex justify-center pt-4">
            {canApply && (
              <button
                onClick={handleApplyClick}
                disabled={isSubmitting}
                className="px-8 py-3 bg-brand-primary text-text-inverse font-slim-bold text-base rounded-slim-lg shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Iconography.Stroke.Rocket className="w-5 h-5" />
                <span>{isSubmitting ? '제출 중...' : '지원하기'}</span>
              </button>
            )}

            {isClosed && (
              <div className="flex flex-col items-center gap-2 p-6 bg-error/5 border border-error/20 rounded-slim-xl">
                <Iconography.Stroke.Cancel className="w-8 h-8 text-error" />
                <span className="text-lg font-slim-bold text-error">모집 종료</span>
                <p className="text-sm text-text-secondary">이 공고의 모집 기간이 종료되었습니다.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
});

PageFormApply.displayName = 'PageFormApply';

export default PageFormApply;
