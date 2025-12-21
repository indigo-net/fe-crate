import { create } from 'zustand';

import FormQuestionModel from '../model/form-question';

interface State {
  formQuestions: FormQuestionModel[];

  addQuestion: (question: FormQuestionModel) => void;
  removeQuestion: (questionId: string) => void;
}

const useFormQuestionList = create<State>(set => ({
  formQuestions: [],
  addQuestion: question => {
    set(state => ({
      formQuestions: [...state.formQuestions, question],
    }));
  },
  removeQuestion: questionId => {
    set(state => ({
      formQuestions: state.formQuestions.filter(question => question.id !== questionId),
    }));
  },
}));

export default useFormQuestionList;
