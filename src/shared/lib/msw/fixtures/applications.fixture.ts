/**
 * Application Fixture Data
 * Mock 데이터: 지원서
 */

export type ApplicationStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'EVALUATED';

export interface ApplicationAnswer {
  questionId: string;
  value: string | string[] | null;
}

export interface ApplicationFixture {
  id: string;
  formId: string;
  applicantName: string;
  applicantEmail: string;
  status: ApplicationStatus;
  answers: ApplicationAnswer[];
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

export const applicationsFixture: ApplicationFixture[] = [
  // form-2 applications (closed form)
  {
    id: 'app-1',
    formId: 'form-2',
    applicantName: '김디자인',
    applicantEmail: 'design.kim@example.com',
    status: 'SUBMITTED',
    answers: [
      { questionId: 'q-4', value: 'https://portfolio.example.com/kim' },
      { questionId: 'q-5', value: ['Figma', 'Photoshop'] },
    ],
    submittedAt: '2026-01-20T14:30:00Z',
    createdAt: '2026-01-20T14:30:00Z',
    updatedAt: '2026-01-20T14:30:00Z',
  },
  {
    id: 'app-2',
    formId: 'form-2',
    applicantName: '이창작',
    applicantEmail: 'creative.lee@example.com',
    status: 'EVALUATED',
    answers: [
      { questionId: 'q-4', value: 'https://behance.net/leecreative' },
      { questionId: 'q-5', value: ['Figma', 'Sketch', 'Adobe XD'] },
    ],
    submittedAt: '2026-01-22T09:15:00Z',
    createdAt: '2026-01-22T09:15:00Z',
    updatedAt: '2026-02-05T16:00:00Z',
  },
  {
    id: 'app-3',
    formId: 'form-2',
    applicantName: '박아트',
    applicantEmail: 'art.park@example.com',
    status: 'UNDER_REVIEW',
    answers: [
      { questionId: 'q-4', value: 'https://dribbble.com/artpark' },
      { questionId: 'q-5', value: ['Illustrator', 'Photoshop'] },
    ],
    submittedAt: '2026-01-25T11:45:00Z',
    createdAt: '2026-01-25T11:45:00Z',
    updatedAt: '2026-02-03T10:00:00Z',
  },
  // form-1 application (active form)
  {
    id: 'app-4',
    formId: 'form-1',
    applicantName: '최개발',
    applicantEmail: 'dev.choi@example.com',
    status: 'SUBMITTED',
    answers: [
      { questionId: 'q-1', value: '안녕하세요, 풀스택 개발자 최개발입니다.' },
      { questionId: 'q-2', value: '새로운 기술을 배우고 성장하고 싶습니다.' },
      { questionId: 'q-3', value: '1-3년' },
    ],
    submittedAt: '2026-02-15T16:20:00Z',
    createdAt: '2026-02-15T16:20:00Z',
    updatedAt: '2026-02-15T16:20:00Z',
  },
];

/**
 * In-memory store for mutation
 */
export const applicationsStore = [...applicationsFixture];

/**
 * Reset store to initial state
 */
export function resetApplicationsStore(): void {
  applicationsStore.length = 0;
  applicationsStore.push(...applicationsFixture);
}
