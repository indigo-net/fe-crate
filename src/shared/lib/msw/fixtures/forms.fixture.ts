/**
 * Form Fixture Data
 * Mock 데이터: 모집 공고
 */

export type FormStatus = 'DRAFT' | 'SCHEDULED' | 'ACTIVE' | 'CLOSED';

export interface FormFixture {
  id: string;
  title: string;
  description: string;
  status: FormStatus;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export const formsFixture: FormFixture[] = [
  {
    id: 'form-1',
    title: '2026 동계 개발 인턴십',
    description: '개발자 인턴십 지원 폼입니다. 열정 있는 개발자를 찾습니다.',
    status: 'ACTIVE',
    startDate: '2026-01-15T00:00:00Z',
    endDate: '2026-03-15T23:59:59Z',
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'form-2',
    title: '브랜드 디자인 주니어 공채',
    description: '디자인팀 주니어 포지션 채용',
    status: 'CLOSED',
    startDate: '2026-01-01T00:00:00Z',
    endDate: '2026-02-01T23:59:59Z',
    createdAt: '2025-12-20T09:00:00Z',
    updatedAt: '2026-02-01T23:59:59Z',
  },
  {
    id: 'form-3',
    title: '2026 상반기 마케팅 인턴',
    description: '마케팅팀 인턴 모집',
    status: 'DRAFT',
    startDate: null,
    endDate: null,
    createdAt: '2026-02-25T14:00:00Z',
    updatedAt: '2026-02-25T14:00:00Z',
  },
  {
    id: 'form-4',
    title: '동아리 신입 부원 모집',
    description: '프로그래밍 동아리 신입 부원을 모집합니다.',
    status: 'SCHEDULED',
    startDate: '2026-03-10T00:00:00Z',
    endDate: '2026-03-31T23:59:59Z',
    createdAt: '2026-02-20T11:00:00Z',
    updatedAt: '2026-02-28T16:00:00Z',
  },
];

/**
 * In-memory store for mutation
 */
export const formsStore = [...formsFixture];

/**
 * Reset store to initial state
 */
export function resetFormsStore(): void {
  formsStore.length = 0;
  formsStore.push(...formsFixture);
}
