import ActiveFormsSection from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'widgets/admin-dashboard/ActiveFormsSection',
  component: ActiveFormsSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="max-w-4xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ActiveFormsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
