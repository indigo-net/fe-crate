import { create } from 'zustand';

import FormSignatureModel from '../model/form-signature';

interface State {
  forms: FormSignatureModel[];
  setForms: (
    next: FormSignatureModel[] | ((prev: FormSignatureModel[]) => FormSignatureModel[]),
  ) => void;
}

const useFormSignatureListStore = create<State>(set => ({
  forms: [],
  setForms: next => {
    set(state => ({
      forms: typeof next === 'function' ? next(state.forms) : next,
    }));
  },
}));

export default useFormSignatureListStore;
