import { memo } from 'react';
import { Link } from 'react-router-dom';

import DateStandard from '@/shared/lib/date-standard';

import type FormSignatureModel from '@/entities/form/model/form-signature';

import { Iconography } from '@/shared/ui';

import useActiveFormsSectionController from './hook';

import type { FormStatusType } from '@/entities/form/types';

const getStatusLabel = (status: FormStatusType, closedAt: string | null): string => {
  if (status === 'DRAFT') {
    return '모집 대기';
  }
  if (status === 'CLOSED') {
    return '모집 종료';
  }
  if (status === 'SCHEDULED') {
    return '모집 예정';
  }
  if (status === 'PUBLISHED') {
    if (closedAt) {
      const now = new Date();
      const end = DateStandard.fromISO(closedAt);
      const diffDays = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays > 0) {
        return `모집 종료 D-${diffDays}`;
      }
    }
    return '모집 중';
  }
  return '상태 미정';
};

const getStatusColor = (status: FormStatusType): string => {
  switch (status) {
    case 'PUBLISHED':
      return 'neon-green-500';
    case 'SCHEDULED':
      return 'info';
    case 'DRAFT':
      return 'text-tertiary';
    case 'CLOSED':
      return 'error';
    default:
      return 'text-tertiary';
  }
};

const formatUpdatedAt = (updatedAt: string | null): string => {
  if (!updatedAt) {
    return '-';
  }

  const now = new Date();
  const updated = DateStandard.fromISO(updatedAt);
  const diffMs = now.getTime() - updated.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) {
    return `${diffMins}분 전`;
  }
  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }
  if (diffDays === 1) {
    return '어제';
  }
  return `${diffDays}일 전`;
};

const FormCard = ({
  form,
  onInvite,
}: {
  form: FormSignatureModel;
  onInvite: (formId: string) => void;
}) => {
  const status = form.getValue('status');
  const closedAt = form.getValue('closedAt');
  const statusLabel = getStatusLabel(status, closedAt);
  const statusColor = getStatusColor(status);
  const updatedAtLabel = formatUpdatedAt(form.getValue('updatedAt'));

  return (
    <article
      key={form.getValue('id')}
      className="p-6 bg-bg-base border border-border-default rounded-slim-2xl shadow-sm hover:shadow-md hover:border-brand-primary transition-all group cursor-pointer flex flex-col justify-between min-h-[160px]"
    >
      <header className="flex justify-between items-start">
        <span
          className="px-3 py-1 rounded-slim-full text-[11px] font-slim-bold bg-bg-subtle"
          style={{
            color: statusColor.startsWith('var') ? statusColor : `var(--color-${statusColor})`,
          }}
        >
          {statusLabel}
        </span>
        <time className="text-[11px] text-text-tertiary">{updatedAtLabel}</time>
      </header>
      <h3 className="text-lg font-slim-bold text-text-primary group-hover:text-brand-primary transition-colors my-4">
        {form.getValue('title')}
      </h3>
      <footer className="pt-4 border-t border-border-subtle flex items-center gap-2">
        <Iconography.Stroke.Users className="w-4 h-4 text-text-tertiary" />
        <span className="text-sm font-slim-semibold">0</span>
        <span className="text-xs text-text-tertiary">지원자</span>
        <button
          onClick={e => {
            e.stopPropagation();
            onInvite(form.getValue('id'));
          }}
          className="ml-auto px-2.5 py-1 rounded-slim-md border border-border-default text-[11px] font-slim-semibold text-text-secondary hover:text-brand-primary hover:border-brand-primary transition-colors flex items-center gap-1"
        >
          <Iconography.Stroke.Plus className="w-3 h-3" />
          <span>평가자 초대</span>
        </button>
      </footer>
    </article>
  );
};

const ActiveFormsSection = memo(() => {
  const { forms, handleInviteButtonClick } = useActiveFormsSectionController();

  return (
    <section className="desktop:col-span-2 space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-slim-bold flex items-center gap-2">
          <Iconography.Stroke.Target className="w-5 h-5 text-brand-primary" />
          진행 중인 모집 공고
        </h2>
        <Link
          to="/forms"
          className="text-sm text-brand-primary font-slim-semibold hover:underline"
        >
          모두 보기
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {forms.map(form => (
          <FormCard key={form.getValue('id')} form={form} onInvite={handleInviteButtonClick} />
        ))}
        <Link
          to="/new-form"
          className="flex flex-col items-center justify-center gap-3 p-6 bg-bg-subtle/50 border-2 border-dashed border-border-default rounded-slim-2xl hover:border-brand-primary hover:bg-bg-base transition-all group min-h-[160px]"
        >
          <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
            <Iconography.Stroke.Plus className="w-6 h-6" />
          </div>
          <span className="text-sm font-slim-bold text-text-secondary group-hover:text-brand-primary">
            새로운 모집 폼 만들기
          </span>
        </Link>
      </div>
    </section>
  );
});

ActiveFormsSection.displayName = 'ActiveFormsSection';

export default ActiveFormsSection;
