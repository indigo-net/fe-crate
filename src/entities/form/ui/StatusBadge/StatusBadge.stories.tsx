import StatusBadge from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'entities/form/StatusBadge',
  component: StatusBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['DRAFT', 'SCHEDULED', 'PUBLISHED', 'CLOSED'],
      description: '폼 상태',
    },
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Draft: Story = {
  args: {
    status: 'DRAFT',
  },
};

export const Scheduled: Story = {
  args: {
    status: 'SCHEDULED',
  },
};

export const Active: Story = {
  args: {
    status: 'PUBLISHED',
  },
};

export const Closed: Story = {
  args: {
    status: 'CLOSED',
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <StatusBadge status="DRAFT" />
      <StatusBadge status="SCHEDULED" />
      <StatusBadge status="PUBLISHED" />
      <StatusBadge status="CLOSED" />
    </div>
  ),
  args: {
    status: 'DRAFT',
  },
};
