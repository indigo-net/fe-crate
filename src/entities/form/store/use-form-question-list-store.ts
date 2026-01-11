import { create } from 'zustand';

import type { FormQuestionModel } from '../model';

interface State {
  formQuestions: FormQuestionModel[];
  setFormQuestions: (
    next: FormQuestionModel[] | ((prev: FormQuestionModel[]) => FormQuestionModel[]),
  ) => void;
}

const useFormQuestionListStore = create<State>(set => ({
  formQuestions: [],
  setFormQuestions: next => {
    set(state => {
      return {
        formQuestions: typeof next === 'function' ? next(state.formQuestions) : next,
      };
    });
  },
}));

export default useFormQuestionListStore;
