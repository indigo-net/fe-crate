import { create } from 'zustand';

import LegacyEvaluationModel from '../model/evaluation/legacy';

interface State {
  evaluation: LegacyEvaluationModel | null;
  setEvaluation: (
    next:
      | LegacyEvaluationModel
      | ((prev: LegacyEvaluationModel | null) => LegacyEvaluationModel | null),
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
