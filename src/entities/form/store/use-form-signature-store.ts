import { create } from 'zustand';

import FormSignatureModel from '../model/form-signature';

interface State {
  formSignature: null | FormSignatureModel;
  setFormSignature: (
    next: FormSignatureModel | ((prev: null | FormSignatureModel) => FormSignatureModel),
  ) => void;
}

const useFormSignatureStore = create<State>(set => ({
  formSignature: null,
  setFormSignature: next => {
    set(state => {
      return {
        formSignature: typeof next === 'function' ? next(state.formSignature) : next,
      };
    });
  },
}));

export default useFormSignatureStore;
