import { memo } from 'react';

import { FormSignatureModel, FormQuestionModel, FormQuestionOptionModel } from '@/entities/form';
import { DarkModeButton } from '@/features/toggle-theme/ui';
import { Iconography } from '@/shared/ui';
import { FormMetaInfo, QuestionPreview } from '@/widgets/form-detail/ui';

import { usePageFormApplyController } from './hook';

const PageFormApply = memo(() => {
  const { formSignature, formQuestions, handleApplyClick } = usePageFormApplyController();

  // Mock data for development/testing
  const displayFormSignature =
    formSignature ??
    new FormSignatureModel({
      title: '2024 신입사원 채용 공고',
      description:
        '안녕하세요. 당사의 신입사원 채용에 지원해 주셔서 감사합니다. 아래 질문에 성실히 답변해 주세요.',
      status: 'PUBLISHED',
      publishedAt: '2024-03-01T00:00:00Z',
      closedAt: '2024-03-31T23:59:59Z',
    });

  const displayQuestions =
    formQuestions.length > 0
      ? formQuestions
      : [
          new FormQuestionModel({
            type: 'SHORT_TEXT',
            title: '지원자 이름을 입력해 주세요.',
            required: true,
          }),
          new FormQuestionModel({
            type: 'SINGLE_CHOICE',
            title: '지원 분야를 선택해 주세요.',
            required: true,
            options: [
              new FormQuestionOptionModel({ content: '개발' }),
              new FormQuestionOptionModel({ content: '디자인' }),
              new FormQuestionOptionModel({ content: '마케팅' }),
            ],
          }),
        ];

  const displayStatus = displayFormSignature.getValue('status');
  const canApply = displayStatus === 'PUBLISHED';
  const isClosed = displayStatus === 'CLOSED';

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
          <FormMetaInfo formSignature={displayFormSignature} />
          <QuestionPreview questions={displayQuestions} />

          <div className="w-full flex justify-center pt-4">
            {canApply && (
              <button
                onClick={handleApplyClick}
                className="px-8 py-3 bg-brand-primary text-text-inverse font-slim-bold text-base rounded-slim-lg shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Iconography.Stroke.Rocket className="w-5 h-5" />
                <span>지원하기</span>
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
