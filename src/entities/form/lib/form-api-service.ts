import CacheStateService from '@/entities/cache/lib/cache-state-service';

import { postForm } from '../api';
import { getForms } from '../api/get-forms';
import FormSignatureModel from '../model/form-signature';

import type { FormQuestionModel } from '../model';

class FormApiService {
  private static FORM_LIST_CACHE_KEY = 'form-list';
  private static FORM_LIST_CACHE_TTL_MS = 5 * 60 * 1000;

  /**
   * 폼 생성 요청
   * - formSignature와 questions를 받아 API 호출
   * - 응답 데이터를 FormSignatureModel로 변환하여 반환
   */
  static async createForm(
    formSignature: FormSignatureModel,
    questions: FormQuestionModel[],
  ): Promise<FormSignatureModel> {
    // 질문 배열 변환
    const questionsData = questions.map((q, index) => ({
      type: q.getValue('type'),
      title: q.getValue('title'),
      description: q.getValue('description'),
      required: q.getValue('required'),
      order: index + 1,
      options: q.getValue('options')?.map(opt => opt.getValue('content')) ?? null,
    }));

    const requestData = {
      title: formSignature.getValue('title') ?? '',
      description: formSignature.getValue('description'),
      status: formSignature.getValue('status'),
      selectionMethod: formSignature.getValue('selectionMethod'),
      startDate: formSignature.getValue('publishedAt'),
      endDate: formSignature.getValue('closedAt'),
      targetCount: formSignature.getValue('targetCount'),
      standbyCount: formSignature.getValue('standbyCount'),
      questions: questionsData,
    };

    const response = await postForm(requestData);

    // 응답 데이터를 FormSignatureModel로 변환
    return new FormSignatureModel({
      id: response.id,
      title: response.title,
      description: response.description,
      questionIds: response.questionIds,
      status: response.status,
      selectionMethod: response.selectionMethod,
      publishedAt: response.startDate,
      closedAt: response.endDate,
      targetCount: response.targetCount,
      standbyCount: response.standbyCount,
    });
  }

  /**
   * 폼 목록 조회
   * - API 응답을 FormSignatureModel[]로 변환
   */
  static async fetchFormList(): Promise<FormSignatureModel[]> {
    const cached = CacheStateService.get<FormSignatureModel[]>(this.FORM_LIST_CACHE_KEY);
    if (cached) {
      return cached;
    }

    const response = await getForms();
    const models = response.map(item => {
      return new FormSignatureModel({
        id: item.id,
        title: item.title,
        description: item.description,
        status: item.status,
        selectionMethod: item.selectionMethod,
        publishedAt: item.startDate,
        closedAt: item.endDate,
        targetCount: item.targetCount,
        standbyCount: item.standbyCount,
        questionIds: item.questionIds,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      });
    });

    CacheStateService.set(this.FORM_LIST_CACHE_KEY, models, this.FORM_LIST_CACHE_TTL_MS);
    return models;
  }
}

export { FormApiService };
