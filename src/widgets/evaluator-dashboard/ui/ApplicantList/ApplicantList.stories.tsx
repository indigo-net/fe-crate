import ApplicantList from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

type EvaluationStatusType = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

interface ApplicantData {
  id: string;
  name: string;
  submittedAt: string;
  status: EvaluationStatusType;
}

const mockApplicants: ApplicantData[] = [
  { id: '1', name: '김철수', submittedAt: '2026-03-01T14:30:00Z', status: 'PENDING' },
  { id: '2', name: '이영희', submittedAt: '2026-03-01T15:00:00Z', status: 'IN_PROGRESS' },
  { id: '3', name: '박지성', submittedAt: '2026-03-01T16:00:00Z', status: 'COMPLETED' },
  { id: '4', name: '최유진', submittedAt: '2026-03-02T09:00:00Z', status: 'PENDING' },
  { id: '5', name: '정민호', submittedAt: '2026-03-02T10:30:00Z', status: 'PENDING' },
];

const meta = {
  title: 'widgets/ApplicantList',
  component: ApplicantList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    applicants: { control: 'object', description: '지원자 목록 데이터' },
    onStartEvaluation: { action: 'evaluationStarted', description: '평가 시작 버튼 클릭 핸들러' },
  },
} satisfies Meta<typeof ApplicantList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    applicants: mockApplicants,
  },
};

export const AllPending: Story = {
  args: {
    applicants: mockApplicants.map(a => ({ ...a, status: 'PENDING' as const })),
  },
};

export const AllInProgress: Story = {
  args: {
    applicants: mockApplicants.map(a => ({ ...a, status: 'IN_PROGRESS' as const })),
  },
};

export const AllCompleted: Story = {
  args: {
    applicants: mockApplicants.map(a => ({ ...a, status: 'COMPLETED' as const })),
  },
};

export const Empty: Story = {
  args: {
    applicants: [],
  },
};

export const SingleApplicant: Story = {
  args: {
    applicants: [mockApplicants[0]],
  },
};
