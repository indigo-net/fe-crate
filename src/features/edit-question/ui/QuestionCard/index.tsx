import { memo, PropsWithChildren } from 'react';

import { FormQuestionModel } from '@/entities/form-question/model';

import { QuestionCardProvider } from './context';
import QuestionProfile from './QuestionProfile';

interface Props {
  question: FormQuestionModel;
}

const QuestionCardSection = (props: PropsWithChildren<Props>) => {
  const { question, children } = props;

  return (
    <QuestionCardProvider value={{ question }}>
      <section className="shadow-sm border border-divider-default rounded-[16px] p-[24px] flex flex-col gap-[16px] bg-bg-default w-full">
        {children}
      </section>
    </QuestionCardProvider>
  );
};

const QuestionCard = Object.assign(memo(QuestionCardSection), {
  Profile: QuestionProfile,
});

export default QuestionCard;
