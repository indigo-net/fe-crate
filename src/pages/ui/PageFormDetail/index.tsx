import { memo, useState } from 'react';
import { Link } from 'react-router-dom';

import { FormSignatureModel, FormQuestionModel, FormQuestionOptionModel } from '@/entities/form';
import { DarkModeButton } from '@/features/toggle-theme/ui';
import { Iconography } from '@/shared/ui';
import { FormMetaInfo, QuestionPreview } from '@/widgets/form-detail/ui';

import ModalInviteEvaluator from '../ModalInviteEvaluator';

import { usePageFormDetailController } from './hook';

const PageFormDetail = memo(() => {
  const { formSignature, formQuestions, canEdit, handleEditClick } = usePageFormDetailController();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

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

  return (
    <div className="w-full min-h-[100dvh] flex flex-col bg-bg-base text-text-primary">
      <header className="w-full px-6 py-4 flex justify-between items-center bg-bg-base border-b border-border-default sticky top-0 z-50">
        <div className="mx-auto w-full max-w-4xl flex justify-between items-center">
          <Link
            to="/dashboard"
            className="group px-4 py-2 flex items-center gap-2 text-text-secondary hover:text-text-primary rounded-slim-lg hover:bg-bg-subtle transition-all font-slim-semibold"
          >
            <Iconography.Stroke.Monitor className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>대시보드</span>
          </Link>

          <div className="flex items-center gap-4">
            <DarkModeButton />
            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="px-5 py-2.5 bg-bg-subtle text-text-primary font-slim-bold text-sm rounded-slim-lg hover:bg-bg-base hover:shadow-md transition-all flex items-center gap-2 border border-border-default"
            >
              <Iconography.Stroke.Users className="w-4 h-4" />
              <span>평가자 초대</span>
            </button>
            {canEdit && (
              <>
                <div className="h-4 w-px bg-border-default mx-1" />
                <button
                  onClick={handleEditClick}
                  className="px-5 py-2.5 bg-brand-primary text-text-inverse font-slim-bold text-sm rounded-slim-lg shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Iconography.Stroke.Document className="w-4 h-4" />
                  <span>수정하기</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-bg-subtle/50">
        <div className="max-w-4xl mx-auto py-12 px-6 flex flex-col gap-8">
          <FormMetaInfo formSignature={displayFormSignature} />
          <QuestionPreview questions={displayQuestions} />
        </div>
      </main>
      <ModalInviteEvaluator
        formId={formSignature?.getValue('id') ?? ''}
        formTitle={displayFormSignature.getValue('title') ?? ''}
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </div>
  );
});

PageFormDetail.displayName = 'PageFormDetail';

export default PageFormDetail;
