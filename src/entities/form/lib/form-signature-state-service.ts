import { FormSignatureModel } from '../model';

class FormSignatureStateService {
  static getInitialFormSignature() {
    return new FormSignatureModel({});
  }

  static editTitle(prev: FormSignatureModel, title: string) {
    return prev.setValue('title', title);
  }

  static editDescription(prev: FormSignatureModel, description: string) {
    return prev.setValue('description', description);
  }
}

export default FormSignatureStateService;
