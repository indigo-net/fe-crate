import LegacyEvaluationModel from '../model/evaluation/legacy';

import type { EvaluationStatus, QuestionScore } from '../types';

const DEFAULT_WEIGHT = 1.0;

class LegacyEvaluationStateService {
  static getInitialEvaluation(): LegacyEvaluationModel {
    return new LegacyEvaluationModel({});
  }

  static setScore(
    prev: LegacyEvaluationModel,
    questionId: string,
    score: number,
    weight: number = DEFAULT_WEIGHT,
  ): LegacyEvaluationModel {
    const scores = prev.getValue('scores');
    const existingIndex = scores.findIndex(s => s.questionId === questionId);
    let newScores: QuestionScore[];

    if (existingIndex >= 0) {
      newScores = scores.map((s, index) => (index === existingIndex ? { ...s, score } : s));
    } else {
      newScores = [...scores, { questionId, score, weight }];
    }

    const totalScore = newScores.reduce((sum, s) => sum + s.score, 0);
    return prev.setValue('scores', newScores).setValue('totalScore', totalScore);
  }

  static setQuestionComment(
    prev: LegacyEvaluationModel,
    questionId: string,
    comment: string,
    weight: number = DEFAULT_WEIGHT,
  ): LegacyEvaluationModel {
    const scores = prev.getValue('scores');
    const existingIndex = scores.findIndex(s => s.questionId === questionId);
    let newScores: QuestionScore[];

    if (existingIndex >= 0) {
      newScores = scores.map((s, index) => (index === existingIndex ? { ...s, comment } : s));
    } else {
      newScores = [...scores, { questionId, score: 0, weight, comment }];
    }

    return prev.setValue('scores', newScores);
  }

  static setOverallComment(prev: LegacyEvaluationModel, comment: string): LegacyEvaluationModel {
    return prev.setValue('overallComment', comment);
  }

  static setStatus(
    prev: LegacyEvaluationModel,
    status: EvaluationStatus,
  ): LegacyEvaluationModel {
    return prev.setValue('status', status);
  }

  static markAsInProgress(prev: LegacyEvaluationModel): LegacyEvaluationModel {
    if (prev.getValue('status') === 'PENDING') {
      return prev.setValue('status', 'IN_PROGRESS');
    }
    return prev;
  }

  static markAsCompleted(prev: LegacyEvaluationModel): LegacyEvaluationModel {
    return prev.setValue('status', 'COMPLETED');
  }
}

export default LegacyEvaluationStateService;
