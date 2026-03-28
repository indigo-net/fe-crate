import CachedService from '@/entities/cache/lib/cached-service';

import FormQuestionModel from '@/entities/form/model/form-question';
import FormSignatureModel from '@/entities/form/model/form-signature';

import { AnswerModel } from '@/entities/answer';

import {
  getApplication,
  getApplicationEvaluations,
  getApplications,
  getEvaluatorAssignedForms,
  getFormQuestions,
  patchEvaluation,
  postEvaluation,
} from '../api';
import EvaluationModel from '../model/evaluation';

import type { ApplicationAnswer, GetApplicationsResponse, FormQuestion } from '../api';
import type { GetApplicationEvaluationsResponse } from '../api';

interface AssignedFormsResult {
  forms: FormSignatureModel[];
  progressMap: Map<string, { total: number; completed: number }>;
}

class EvaluationApiService {
  private static EVALUATION_CACHE_KEY_PREFIX = 'evaluation-';
  private static EVALUATION_CACHE_TTL_MS = 5 * 60 * 1000;

  private static getCacheKey(applicationId: string): string {
    return `${this.EVALUATION_CACHE_KEY_PREFIX}${applicationId}`;
  }

  private static async fetchEvaluation(
    applicationId: string,
  ): Promise<GetApplicationEvaluationsResponse | null> {
    const cacheKey = this.getCacheKey(applicationId);
    const cached = CachedService.get<GetApplicationEvaluationsResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    const response = await getApplicationEvaluations(applicationId);
    if (!response || response.length === 0) {
      return null;
    }

    const evaluationData = response[0];
    CachedService.invalidate(cacheKey);
    CachedService.set(cacheKey, evaluationData, this.EVALUATION_CACHE_TTL_MS);
    return evaluationData;
  }

  private static async createEvaluation(
    applicationId: string,
    formId: string,
  ): Promise<{ id: string }> {
    const response = await postEvaluation({
      applicationId,
      formId,
    });

    CachedService.set(this.getCacheKey(applicationId), response, this.EVALUATION_CACHE_TTL_MS);
    return { id: response.id };
  }

  static async fetchApplications(
    formId: string,
    params?: { limit?: number; page?: number },
  ): Promise<GetApplicationsResponse[]> {
    return getApplications(formId, params);
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

  private static ASSIGNED_FORMS_CACHE_KEY = 'evaluator-assigned-forms';

  static async fetchAssignedForms(): Promise<AssignedFormsResult> {
    const cached = CachedService.get<AssignedFormsResult>(this.ASSIGNED_FORMS_CACHE_KEY);
    if (cached) {
      return cached;
    }

    const response = await getEvaluatorAssignedForms();

    const forms = response.map(
      item => new FormSignatureModel({ id: item.formId, title: item.title }),
    );
    const progressMap = new Map(
      response.map(item => [
        item.formId,
        { total: item.totalApplications, completed: item.completedEvaluations },
      ]),
    );

    const result: AssignedFormsResult = { forms, progressMap };
    CachedService.set(this.ASSIGNED_FORMS_CACHE_KEY, result, this.EVALUATION_CACHE_TTL_MS);
    return result;
  }

  static async fetchFormEvaluations(
    formId: string,
  ): Promise<{
    evaluations: EvaluationModel<AnswerModel<FormQuestionModel>>[];
    isSubmitted: boolean;
  }> {
    const applications = await this.fetchApplications(formId);
    if (applications.length === 0) {
      return { evaluations: [], isSubmitted: false };
    }

    const applicationId = applications[0].id;

    const [questions, answersData, existingEvaluation] = await Promise.all([
      this.fetchQuestions(formId),
      this.fetchApplicationWithAnswers(applicationId),
      this.fetchEvaluation(applicationId),
    ]);

    const existingScores = existingEvaluation?.scores ?? [];
    const isSubmitted = existingEvaluation?.status === 'COMPLETED';

    const evaluations = questions.map(q => {
      const questionModel = new FormQuestionModel({
        id: q.id,
        title: q.title,
        description: q.description,
        type: q.type,
        required: q.required,
      });

      const answer = answersData.answers.find(a => a.questionId === q.id);
      const answerModel = new AnswerModel<FormQuestionModel>({
        question: questionModel,
        value: answer?.value ?? null,
      });

      const existingScore = existingScores.find(s => s.questionId === q.id);

      return new EvaluationModel<AnswerModel<FormQuestionModel>>({
        target: answerModel,
        weight: q.weight,
        score: existingScore?.score,
        comment: existingScore?.comment,
        status: existingScore && existingScore.score > 0 ? 'COMPLETED' : 'IN_COMPLETE',
      });
    });

    return { evaluations, isSubmitted };
  }

  static async submitEvaluation(
    formId: string,
    evaluations: EvaluationModel<AnswerModel<FormQuestionModel>>[],
  ): Promise<void> {
    const applications = await this.fetchApplications(formId);
    if (applications.length === 0) {
      return;
    }

    const applicationId = applications[0].id;
    const existingEvaluation = await this.fetchEvaluation(applicationId);
    const evaluationId = existingEvaluation?.id
      ?? (await this.createEvaluation(applicationId, formId)).id;

    const scores = evaluations.map(e => ({
      questionId: e.getValue('target').getValue('question').getValue('id'),
      score: e.getValue('score'),
      comment: e.getValue('comment'),
    }));

    await patchEvaluation(evaluationId, { status: 'COMPLETED', scores });
  }
}

export default EvaluationApiService;
