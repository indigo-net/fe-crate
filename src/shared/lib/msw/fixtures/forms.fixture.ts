/**
 * Form Fixture Data
 * Mock 데이터: 모집 공고
 */

export type FormStatus = 'DRAFT' | 'SCHEDULED' | 'ACTIVE' | 'CLOSED';

export type SelectionMethod = 'QUANTITATIVE' | 'LOTTERY' | 'FIRST_COME_FIRST_SERVED';

export interface FormFixture {
  id: string;
  title: string;
  description: string | null;
  status: FormStatus;
  selectionMethod: SelectionMethod;
  startDate: string | null;
  endDate: string | null;
  targetCount: number | null;
  standbyCount: number | null;
  questionIds: string[];
  createdAt: string;
  updatedAt: string;
}

// 백엔드 API 요청/응답 타입은 핸들러에서 별도 정의

export const formsFixture: FormFixture[] = [
  {
    id: 'form-1',
    title: '2026 동계 개발 인턴십',
    description: '개발자 인턴십 지원 폼입니다. 열정 있는 개발자를 찾습니다.',
    status: 'ACTIVE',
    selectionMethod: 'QUANTITATIVE',
    startDate: '2026-01-15T00:00:00Z',
    endDate: '2026-03-15T23:59:59Z',
    targetCount: 10,
    standbyCount: 5,
    questionIds: ['q-1', 'q-2', 'q-3'],
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'form-2',
    title: '브랜드 디자인 주니어 공채',
    description: '디자인팀 주니어 포지션 채용',
    status: 'CLOSED',
    selectionMethod: 'QUANTITATIVE',
    startDate: '2026-01-01T00:00:00Z',
    endDate: '2026-02-01T23:59:59Z',
    targetCount: 3,
    standbyCount: null,
    questionIds: ['q-4', 'q-5'],
    createdAt: '2025-12-20T09:00:00Z',
    updatedAt: '2026-02-01T23:59:59Z',
  },
  {
    id: 'form-3',
    title: '2026 상반기 마케팅 인턴',
    description: '마케팅팀 인턴 모집',
    status: 'DRAFT',
    selectionMethod: 'QUANTITATIVE',
    startDate: null,
    endDate: null,
    targetCount: null,
    standbyCount: null,
    questionIds: ['q-6'],
    createdAt: '2026-02-25T14:00:00Z',
    updatedAt: '2026-02-25T14:00:00Z',
  },
  {
    id: 'form-4',
    title: '동아리 신입 부원 모집',
    description: '프로그래밍 동아리 신입 부원을 모집합니다.',
    status: 'SCHEDULED',
    selectionMethod: 'FIRST_COME_FIRST_SERVED',
    startDate: '2026-03-10T00:00:00Z',
    endDate: '2026-03-31T23:59:59Z',
    targetCount: 20,
    standbyCount: 10,
    questionIds: [],
    createdAt: '2026-02-20T11:00:00Z',
    updatedAt: '2026-02-28T16:00:00Z',
  },
];

/**
 * In-memory store for mutation
 */
export const formsStore = structuredClone(formsFixture);

/**
 * Reset store to initial state
 */
export function resetFormsStore(): void {
  formsStore.length = 0;
  formsStore.push(...structuredClone(formsFixture));
}
