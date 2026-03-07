/**
 * Activity Fixture Data
 * Mock 데이터: 활동 로그
 */

export type ActivityType = 'PASS' | 'RECV' | 'NOTE' | 'STAT';

export interface ActivityFixture {
  id: string;
  user: string;
  action: string;
  target: string;
  type: ActivityType;
  createdAt: string;
}

export const activitiesFixture: ActivityFixture[] = [
  {
    id: 'activity-1',
    user: 'Admin_A',
    action: '합격 처리',
    target: '지_원_자_094번',
    type: 'PASS',
    createdAt: '2026-03-07T22:45:12Z',
  },
  {
    id: 'activity-2',
    user: 'System',
    action: '신규 지원서 접수',
    target: '지_원_자_122번',
    type: 'RECV',
    createdAt: '2026-03-07T22:42:05Z',
  },
  {
    id: 'activity-3',
    user: 'Evaluator_K',
    action: '코멘트 추가',
    target: '지_원_자_015번',
    type: 'NOTE',
    createdAt: '2026-03-07T22:38:59Z',
  },
  {
    id: 'activity-4',
    user: 'System',
    action: '상태 변경',
    target: '데이터 엔지니어 공고',
    type: 'STAT',
    createdAt: '2026-03-07T22:30:11Z',
  },
  {
    id: 'activity-5',
    user: 'Admin_B',
    action: '평가자 배정',
    target: '2026 동계 개발 인턴십',
    type: 'STAT',
    createdAt: '2026-03-07T21:15:00Z',
  },
  {
    id: 'activity-6',
    user: 'Evaluator_L',
    action: '평가 완료',
    target: '지_원_자_088번',
    type: 'PASS',
    createdAt: '2026-03-07T20:50:30Z',
  },
];

export const activitiesStore = structuredClone(activitiesFixture);

export function resetActivitiesStore(): void {
  activitiesStore.length = 0;
  activitiesStore.push(...structuredClone(activitiesFixture));
}
