import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentType, SVGProps } from 'react';

import Iconography from './index';

const StrokeIconEntries = Object.entries(Iconography.Stroke) as [
  string,
  ComponentType<SVGProps<SVGSVGElement>>,
][];

const LogoIconEntries = Object.entries(Iconography.Logo) as [
  string,
  ComponentType<SVGProps<SVGSVGElement>>,
][];

const IconGallery = ({
  icons,
  color = 'currentColor',
  size = 24,
}: {
  icons: [string, ComponentType<SVGProps<SVGSVGElement>>][];
  color?: string;
  size?: number;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
      gap: '24px',
      padding: '16px',
    }}
  >
    {icons.map(([name, Icon]) => (
      <div
        key={name}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div
          style={{
            padding: '16px',
            borderRadius: '8px',
            backgroundColor: '#f5f5f5',
            color,
          }}
        >
          <Icon width={size} height={size} />
        </div>
        <span style={{ fontSize: '12px', color: '#666' }}>{name}</span>
      </div>
    ))}
  </div>
);

const meta = {
  title: 'shared/Iconography',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <IconGallery icons={StrokeIconEntries} />,
};

export const StrokeIcons: Story = {
  render: () => <IconGallery icons={StrokeIconEntries} />,
};

export const LogoIcons: Story = {
  render: () => <IconGallery icons={LogoIconEntries} />,
};
