import ActivityFeedSection from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'widgets/admin-dashboard/ActivityFeedSection',
  component: ActivityFeedSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ActivityFeedSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
