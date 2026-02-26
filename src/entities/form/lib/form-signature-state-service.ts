import { FormSignatureModel } from '../model';

import type { FormStatusType, SelectionMethodType } from '@/entities/form';


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

  static setStatus(prev: FormSignatureModel, status: FormStatusType) {
    return prev.setValue('status', status);
  }

  static setSelectionMethod(prev: FormSignatureModel, method: SelectionMethodType) {
    return prev.setValue('selectionMethod', method);
  }

  static setPublishedAt(prev: FormSignatureModel, date: string | null) {
    return prev.setValue('publishedAt', date);
  }

  static setClosedAt(prev: FormSignatureModel, date: string | null) {
    return prev.setValue('closedAt', date);
  }

  static setTargetCount(prev: FormSignatureModel, count: number | null) {
    return prev.setValue('targetCount', count);
  }

  static setStandbyCount(prev: FormSignatureModel, count: number | null) {
    return prev.setValue('standbyCount', count);
  }
}

export default FormSignatureStateService;
