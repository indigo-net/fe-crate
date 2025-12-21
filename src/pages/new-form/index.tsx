import { QuestionAddSection } from '@/features/add-question/ui';
import { QuestionCard } from '@/features/edit-question/ui';

import useNewForm from './hook';

const NewFormPage = () => {
  const { formQuestions, handleAddQuestion } = useNewForm();

  return (
    <div className="w-full h-[100dvh] flex flex-col">
      <header className="px-[32px] py-[16px] flex justify-center items-center bg-default border-b border-b-divider-default">
        <div className="mx-auto w-full max-w-[1200px] flex justify-between items-center">
          {/** 👇 TODO: Button 컴포넌트로 대체 */}
          <button className="rounded-[8px] w-fit flex items-center justify-center gap-[8px] py-[8px] px-[16px] bg-transparent color-text-tertiary hover:bg-gray-100/90 text-text-primary text-[16px]">
            {/** 👇 TODO: Icon 컴포넌트로 대체 */}
            <span>I</span>
            <span>돌아가기</span>
          </button>

          <div className="flex items-center gap-[12px]">
            <button className="border-border-sub rounded-[8px] w-fit flex items-center justify-center gap-[8px] py-[8px] px-[16px] bg-transparent color-text-tertiary hover:bg-gray-100/90">
              초기화
            </button>
            {/** 👇 TODO: Button 컴포넌트로 대체 */}
            <button className="border-none rounded-[8px] w-fit flex items-center justify-center gap-[8px] py-[8px] px-[16px] bg-brand-primary color-white hover:bg-brand-primary/90">
              {/** 👇 TODO: Icon 컴포넌트로 대체 */}
              <span>I</span>
              <span>저장 및 게시</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto flex flex-col bg-bg-sub items-center h-full w-full">
        <div className="p-[32px] flex flex-col gap-[24px] w-full max-w-[1200px]">
          {formQuestions.map(question => {
            const { id, type } = question.toJSON();
            switch (type) {
              case 'SHORT_TEXT':
                return (
                  <QuestionCard key={id} question={question}>
                    <QuestionCard.Profile />
                  </QuestionCard>
                );
              case 'LONG_TEXT':
                return (
                  <QuestionCard key={id} question={question}>
                    <QuestionCard.Profile />
                  </QuestionCard>
                );
              case 'MULTIPLE_CHOICE':
                return (
                  <QuestionCard key={id} question={question}>
                    <QuestionCard.Profile />
                  </QuestionCard>
                );
              case 'SINGLE_CHOICE':
                return (
                  <QuestionCard key={id} question={question}>
                    <QuestionCard.Profile />
                  </QuestionCard>
                );
            }
          })}

          <QuestionAddSection
            onClickShortTextButton={() => handleAddQuestion('SHORT_TEXT')}
            onClickLongTextButton={() => handleAddQuestion('LONG_TEXT')}
            onClickMultipleChoiceButton={() => handleAddQuestion('MULTIPLE_CHOICE')}
            onClickSingleChoiceButton={() => handleAddQuestion('SINGLE_CHOICE')}
          />
        </div>
      </main>
    </div>
  );
};

export default NewFormPage;
