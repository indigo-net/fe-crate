import { create } from 'zustand';

import EvaluationModel from '../model/evaluation';

interface State {
  evaluation: EvaluationModel | null;
  setEvaluation: (
    next: EvaluationModel | ((prev: EvaluationModel | null) => EvaluationModel | null),
  ) => void;
  clearEvaluation: () => void;
}

const useEvaluationStore = create<State>(set => ({
  evaluation: null,
  setEvaluation: next => {
    set(state => ({
      evaluation: typeof next === 'function' ? next(state.evaluation) : next,
    }));
  },
  clearEvaluation: () => {
    set({ evaluation: null });
  },
}));

export default useEvaluationStore;
