import EvaluationModel from '../model/evaluation';

import type { EvaluationStatus, QuestionScore } from '@/entities/evaluation';

class EvaluationStateService {
  static getInitialEvaluation(): EvaluationModel {
    return new EvaluationModel({});
  }

  static setScore(
    prev: EvaluationModel,
    questionId: string,
    score: number,
  ): EvaluationModel {
    const scores = prev.getValue('scores');
    const existingIndex = scores.findIndex(s => s.questionId === questionId);
    let newScores: QuestionScore[];

    if (existingIndex >= 0) {
      newScores = scores.map((s, index) =>
        index === existingIndex ? { ...s, score } : s,
      );
    } else {
      newScores = [...scores, { questionId, score }];
    }

    const totalScore = newScores.reduce((sum, s) => sum + s.score, 0);
    return prev.setValue('scores', newScores).setValue('totalScore', totalScore);
  }

  static setQuestionComment(
    prev: EvaluationModel,
    questionId: string,
    comment: string,
  ): EvaluationModel {
    const scores = prev.getValue('scores');
    const existingIndex = scores.findIndex(s => s.questionId === questionId);
    let newScores: QuestionScore[];

    if (existingIndex >= 0) {
      newScores = scores.map((s, index) =>
        index === existingIndex ? { ...s, comment } : s,
      );
    } else {
      newScores = [...scores, { questionId, score: 0, comment }];
    }

    return prev.setValue('scores', newScores);
  }

  static setOverallComment(prev: EvaluationModel, comment: string): EvaluationModel {
    return prev.setValue('overallComment', comment);
  }

  static setStatus(prev: EvaluationModel, status: EvaluationStatus): EvaluationModel {
    return prev.setValue('status', status);
  }

  static markAsInProgress(prev: EvaluationModel): EvaluationModel {
    if (prev.getValue('status') === 'PENDING') {
      return prev.setValue('status', 'IN_PROGRESS');
    }
    return prev;
  }

  static markAsCompleted(prev: EvaluationModel): EvaluationModel {
    return prev.setValue('status', 'COMPLETED');
  }
}

export default EvaluationStateService;
