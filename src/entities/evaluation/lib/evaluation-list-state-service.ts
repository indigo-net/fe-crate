import EvaluationModel from '../model/evaluation';

import EvaluationStateService from './evaluation-state-service';

class EvaluationListStateService {
  static setScore<T extends { getValue(key: 'id'): string }>(
    list: EvaluationModel<T>[],
    targetId: string,
    score: number,
  ): EvaluationModel<T>[] {
    return list.map(item => {
      if (item.getValue('target').getValue('id') === targetId) {
        return EvaluationStateService.setScore(item, score);
      }
      return item;
    });
  }

  static setComment<T extends { getValue(key: 'id'): string }>(
    list: EvaluationModel<T>[],
    targetId: string,
    comment: string,
  ): EvaluationModel<T>[] {
    return list.map(item => {
      if (item.getValue('target').getValue('id') === targetId) {
        return EvaluationStateService.setComment(item, comment);
      }
      return item;
    });
  }

  static getByTarget<T extends { getValue(key: 'id'): string }>(
    list: EvaluationModel<T>[],
    targetId: string,
  ): EvaluationModel<T> | undefined {
    return list.find(item => item.getValue('target').getValue('id') === targetId);
  }

  static getTotalScore<T>(list: EvaluationModel<T>[]): number {
    return list.reduce((sum, item) => sum + item.getValue('score'), 0);
  }

  static getMaxScore<T>(list: EvaluationModel<T>[]): number {
    return list.reduce((sum, item) => sum + item.getValue('weight') * 100, 0);
  }

  static getCompletedCount<T>(list: EvaluationModel<T>[]): number {
    return list.filter(item => item.getValue('status') === 'COMPLETED').length;
  }

  static checkIsAllScored<T>(list: EvaluationModel<T>[]): boolean {
    return list.length > 0 && list.every(item => item.getValue('status') === 'COMPLETED');
  }
}

export default EvaluationListStateService;
