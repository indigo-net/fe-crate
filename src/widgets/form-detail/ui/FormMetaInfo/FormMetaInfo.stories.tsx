import { FormSignatureModel } from '@/entities/form';

import FormMetaInfo from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'widgets/form-detail/FormMetaInfo',
  component: FormMetaInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormMetaInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Published: Story = {
  args: {
    formSignature: new FormSignatureModel({
      title: '2024 신입사원 채용 공고',
      description:
        '안녕하세요. 당사의 신입사원 채용에 지원해 주셔서 감사합니다. 아래 질문에 성실히 답변해 주세요.',
      status: 'PUBLISHED',
      publishedAt: '2024-03-01T00:00:00Z',
      closedAt: '2024-03-31T23:59:59Z',
      selectionMethod: 'QUANTITATIVE',
      targetCount: 10,
      standbyCount: 5,
    }),
  },
};

export const Draft: Story = {
  args: {
    formSignature: new FormSignatureModel({
      title: '작성 중인 폼',
      description: '아직 작성 중인 공고입니다.',
      status: 'DRAFT',
      selectionMethod: 'LOTTERY',
      targetCount: 20,
    }),
  },
};

export const AlwaysOpen: Story = {
  args: {
    formSignature: new FormSignatureModel({
      title: '상시 모집 공고',
      description: '상시 모집 중인 공고입니다. 마감일이 없습니다.',
      status: 'PUBLISHED',
      publishedAt: '2024-01-01T00:00:00Z',
      closedAt: null,
      selectionMethod: 'FIRST_COME_FIRST_SERVED',
      targetCount: 100,
    }),
  },
};

export const Closed: Story = {
  args: {
    formSignature: new FormSignatureModel({
      title: '모집 종료된 공고',
      description: '이 공고의 모집 기간이 종료되었습니다.',
      status: 'CLOSED',
      publishedAt: '2024-01-01T00:00:00Z',
      closedAt: '2024-02-28T23:59:59Z',
      selectionMethod: 'LOTTERY',
      targetCount: 50,
      standbyCount: 10,
    }),
  },
};

export const WithoutTargetCount: Story = {
  args: {
    formSignature: new FormSignatureModel({
      title: '모집 인원 미정 공고',
      description: '모집 인원이 정해지지 않은 공고입니다.',
      status: 'PUBLISHED',
      publishedAt: '2024-03-01T00:00:00Z',
      closedAt: '2024-03-31T23:59:59Z',
      selectionMethod: 'QUANTITATIVE',
    }),
  },
};

export const MinimalInfo: Story = {
  args: {
    formSignature: new FormSignatureModel({
      title: '최소 정보 공고',
      status: 'DRAFT',
    }),
  },
};
