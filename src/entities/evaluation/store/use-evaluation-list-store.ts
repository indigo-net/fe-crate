import { create } from 'zustand';

import { AnswerModel } from '@/entities/answer';
import { FormQuestionModel } from '@/entities/form';

import EvaluationModel from '../model/evaluation';

type Evaluation = EvaluationModel<AnswerModel<FormQuestionModel>>;

interface State {
  evaluations: Evaluation[];
  setEvaluations: (next: Evaluation[] | ((prev: Evaluation[]) => Evaluation[])) => void;
}

const useEvaluationListStore = create<State>(set => ({
  evaluations: [],
  setEvaluations: next => {
    set(state => ({
      evaluations: typeof next === 'function' ? next(state.evaluations) : next,
    }));
  },
}));

export default useEvaluationListStore;
