import { memo } from 'react';

import { Iconography } from '@/shared/ui';

import type { FormStatusType } from '@/entities/form/types';

interface Props {
  status: FormStatusType;
}

const STATUS_CONFIG = {
  DRAFT: {
    label: '작성 중',
    className: 'bg-bg-subtle text-text-secondary',
    Icon: Iconography.Stroke.Document,
  },
  SCHEDULED: {
    label: '모집 예정',
    className: 'bg-info/10 text-info',
    Icon: Iconography.Stroke.Clock,
  },
  PUBLISHED: {
    label: '모집 중',
    className: 'bg-success/10 text-success',
    Icon: Iconography.Stroke.Flash,
  },
  CLOSED: {
    label: '모집 종료',
    className: 'bg-error/10 text-error',
    Icon: Iconography.Stroke.Cancel,
  },
} as const;

const StatusBadge = (props: Props) => {
  const { status } = props;
  const { label, className, Icon } = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-slim-lg text-sm font-slim-semibold ${className}`}
    >
      <Icon className="w-4 h-4" aria-hidden />
      <span>{label}</span>
    </span>
  );
};

export default memo(StatusBadge);
