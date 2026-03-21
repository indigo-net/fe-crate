import CachedService from '@/entities/cache/lib/cached-service';

import {
  getApplication,
  getApplicationEvaluations,
  getApplications,
  getFormQuestions,
  patchEvaluation,
  postEvaluation,
} from '../api';
import EvaluationModel from '../model/evaluation';

import type { ApplicationAnswer, ApplicationListItem, FormQuestion } from '../api';

class EvaluationApiService {
  private static EVALUATION_CACHE_KEY_PREFIX = 'evaluation-';
  private static EVALUATION_CACHE_TTL_MS = 5 * 60 * 1000;

  private static getCacheKey(applicationId: string): string {
    return `${this.EVALUATION_CACHE_KEY_PREFIX}${applicationId}`;
  }

  static async fetchEvaluation(applicationId: string): Promise<EvaluationModel | null> {
    const cacheKey = this.getCacheKey(applicationId);
    const cached = CachedService.get<EvaluationModel>(cacheKey);
    if (cached) {
      return cached;
    }

    const response = await getApplicationEvaluations(applicationId);
    if (!response || response.length === 0) {
      return null;
    }

    const evaluationData = response[0];
    const model = new EvaluationModel({
      id: evaluationData.id,
      applicationId: evaluationData.applicationId,
      evaluatorId: evaluationData.evaluatorId,
      formId: evaluationData.formId,
      status: evaluationData.status,
      scores: evaluationData.scores,
      totalScore: evaluationData.totalScore,
      overallComment: evaluationData.overallComment,
    });

    CachedService.invalidate(cacheKey);
    CachedService.set(cacheKey, model, this.EVALUATION_CACHE_TTL_MS);
    return model;
  }

  static async createEvaluation(
    applicationId: string,
    formId: string,
  ): Promise<EvaluationModel> {
    const response = await postEvaluation({
      applicationId,
      formId,
    });

    const model = new EvaluationModel({
      id: response.id,
      applicationId: response.applicationId,
      evaluatorId: response.evaluatorId,
      formId: response.formId,
      status: response.status,
      scores: response.scores,
      totalScore: response.totalScore,
      overallComment: response.overallComment,
    });

    CachedService.set(this.getCacheKey(applicationId), model, this.EVALUATION_CACHE_TTL_MS);
    return model;
  }

  static async updateEvaluation(
    evaluationId: string,
    data: {
      scores?: { questionId: string; score: number; comment?: string }[];
      status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
      overallComment?: string;
    },
    applicationId: string,
  ): Promise<EvaluationModel> {
    const response = await patchEvaluation(evaluationId, data);

    const model = new EvaluationModel({
      id: response.id,
      applicationId: response.applicationId,
      evaluatorId: response.evaluatorId,
      formId: response.formId,
      status: response.status,
      scores: response.scores,
      totalScore: response.totalScore,
      overallComment: response.overallComment,
    });

    CachedService.set(this.getCacheKey(applicationId), model, this.EVALUATION_CACHE_TTL_MS);
    return model;
  }

  static async fetchApplications(
    formId: string,
    params?: { limit?: number; page?: number },
  ): Promise<ApplicationListItem[]> {
    const response = await getApplications(formId, params);
    return response.data;
  }

  static async fetchApplicationWithAnswers(
    applicationId: string,
  ): Promise<{ id: string; answers: ApplicationAnswer[] }> {
    const response = await getApplication(applicationId);
    return {
      id: response.id,
      answers: response.answers,
    };
  }

  static async fetchQuestions(formId: string): Promise<FormQuestion[]> {
    return getFormQuestions(formId);
  }
}

export default EvaluationApiService;
