import EvaluatorStatusTable from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'widgets/admin-dashboard/EvaluatorStatusTable',
  component: EvaluatorStatusTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EvaluatorStatusTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
