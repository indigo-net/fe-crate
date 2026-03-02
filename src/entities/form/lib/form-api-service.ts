import { postForm } from '../api';
import FormSignatureModel from '../model/form-signature';

import type { FormQuestionModel } from '../model';

class FormApiService {
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
}

export { FormApiService };
