import EvaluationModel from '../model/evaluation';

class EvaluationStateService {
  static create<T>(target: T, weight?: number): EvaluationModel<T> {
    return new EvaluationModel<T>({ target, weight });
  }

  static setScore<T>(model: EvaluationModel<T>, score: number): EvaluationModel<T> {
    return model.setValue('score', score);
  }

  static setComment<T>(model: EvaluationModel<T>, comment: string): EvaluationModel<T> {
    return model.setValue('comment', comment);
  }
}

export default EvaluationStateService;
