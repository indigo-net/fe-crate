import { createContext, useContext } from 'react';

import { FormQuestionModel } from '@/entities/form-question/model';

interface State {
  question: FormQuestionModel;
}

const QuestionCardContext = createContext<State | null>(null);
const QuestionCardProvider = QuestionCardContext.Provider;

const useQuestionCardContext = () => {
  const context = useContext(QuestionCardContext);
  if (!context) {
    throw new Error('useQuestionCardContext must be used within a QuestionCardProvider');
  }
  return context;
};

export { QuestionCardProvider, useQuestionCardContext };
