import { http, HttpResponse, delay } from 'msw';

import { EnvManager } from '@/shared/lib';

interface CreateFormRequest {
  title: string;
  description?: string;
  questions: Array<{
    title: string;
    type: string;
    options?: string[];
  }>;
}

interface FormResponse {
  id: string;
  title: string;
  description?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
  questions: Array<{
    id: string;
    title: string;
    type: string;
    options?: string[];
  }>;
}

// Mock database
const forms: FormResponse[] = [
  {
    id: 'form-1',
    title: '2026 동계 개발 인턴십',
    description: '개발자 인턴십 지원 폼',
    status: 'PUBLISHED',
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-02-10T15:30:00Z',
    questions: [
      { id: 'q-1', title: '자기소개를 해주세요', type: 'LONG_TEXT' },
      { id: 'q-2', title: '지원 동기', type: 'LONG_TEXT' },
      {
        id: 'q-3',
        title: '개발 경력',
        type: 'SINGLE_CHOICE',
        options: ['신입', '1-3년', '3-5년', '5년 이상'],
      },
    ],
  },
  {
    id: 'form-2',
    title: '브랜드 디자인 주니어 공채',
    status: 'PUBLISHED',
    createdAt: '2026-01-20T09:00:00Z',
    updatedAt: '2026-02-05T11:00:00Z',
    questions: [
      { id: 'q-4', title: '포트폴리오 링크', type: 'SHORT_TEXT' },
      {
        id: 'q-5',
        title: '디자인 툴 경험',
        type: 'MULTIPLE_CHOICE',
        options: ['Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator'],
      },
    ],
  },
];

const BASE_URL = EnvManager.getAppEnv('VITE_API_BASE_URL') || '';

export const handlers = [
  // GET /forms - 폼 목록 조회
  http.get(`${BASE_URL}/forms`, async () => {
    await delay(200);

    return HttpResponse.json({
      success: true,
      data: forms.map(form => ({
        id: form.id,
        title: form.title,
        description: form.description,
        status: form.status,
        createdAt: form.createdAt,
        updatedAt: form.updatedAt,
      })),
    });
  }),

  // GET /forms/:id - 폼 상세 조회
  http.get(`${BASE_URL}/forms/:id`, async ({ params }) => {
    await delay(150);

    const { id } = params;
    const form = forms.find(f => f.id === id);

    if (!form) {
      return HttpResponse.json(
        { success: false, error: 'FORM_NOT_FOUND', message: '폼을 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      success: true,
      data: form,
    });
  }),

  // POST /forms - 폼 생성
  http.post(`${BASE_URL}/forms`, async ({ request }) => {
    await delay(300);

    const body = (await request.json()) as CreateFormRequest;

    const newForm: FormResponse = {
      id: `form-${Date.now()}`,
      title: body.title,
      description: body.description,
      status: 'DRAFT',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      questions: body.questions.map((q, index) => ({
        id: `q-${Date.now()}-${index}`,
        ...q,
      })),
    };

    forms.push(newForm);

    return HttpResponse.json(
      {
        success: true,
        data: newForm,
      },
      { status: 201 },
    );
  }),

  // PUT /forms/:id - 폼 수정
  http.put(`${BASE_URL}/forms/:id`, async ({ params, request }) => {
    await delay(250);

    const { id } = params;
    const body = (await request.json()) as Partial<CreateFormRequest>;
    const formIndex = forms.findIndex(f => f.id === id);

    if (formIndex === -1) {
      return HttpResponse.json(
        { success: false, error: 'FORM_NOT_FOUND', message: '폼을 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    const updatedForm: FormResponse = {
      ...forms[formIndex],
      ...body,
      updatedAt: new Date().toISOString(),
      questions: body.questions
        ? body.questions.map((q, index) => ({
            id: forms[formIndex].questions[index]?.id || `q-${Date.now()}-${index}`,
            ...q,
          }))
        : forms[formIndex].questions,
    };

    forms[formIndex] = updatedForm;

    return HttpResponse.json({
      success: true,
      data: updatedForm,
    });
  }),

  // DELETE /forms/:id - 폼 삭제
  http.delete(`${BASE_URL}/forms/:id`, async ({ params }) => {
    await delay(200);

    const { id } = params;
    const formIndex = forms.findIndex(f => f.id === id);

    if (formIndex === -1) {
      return HttpResponse.json(
        { success: false, error: 'FORM_NOT_FOUND', message: '폼을 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    forms.splice(formIndex, 1);

    return HttpResponse.json({
      success: true,
      message: '폼이 삭제되었습니다.',
    });
  }),

  // POST /forms/:id/publish - 폼 게시
  http.post(`${BASE_URL}/forms/:id/publish`, async ({ params }) => {
    await delay(200);

    const { id } = params;
    const form = forms.find(f => f.id === id);

    if (!form) {
      return HttpResponse.json(
        { success: false, error: 'FORM_NOT_FOUND', message: '폼을 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    form.status = 'PUBLISHED';
    form.updatedAt = new Date().toISOString();

    return HttpResponse.json({
      success: true,
      data: form,
    });
  }),
];
