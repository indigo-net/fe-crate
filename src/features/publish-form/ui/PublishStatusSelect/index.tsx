import { memo } from 'react';

import { Iconography, Radio } from '@/shared/ui';

import usePublishStatusSelectController from './hook';

import type { FormStatusType } from '@/entities/form';

const statuses: {
  value: FormStatusType;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    value: 'DRAFT',
    label: '임시 저장 (Draft)',
    description: '작성 중인 상태로 저장하며, 외부에는 공개되지 않습니다.',
    icon: Iconography.Stroke.Document,
  },
  {
    value: 'PUBLISHED',
    label: '즉시 게시 (Publish)',
    description: '설정한 시작일시부터 폼이 활성화되어 지원을 받습니다.',
    icon: Iconography.Stroke.Rocket,
  },
];

const PublishStatusSelect = memo(() => {
  const { status, handleStatusChange } = usePublishStatusSelectController();

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-lg font-slim-bold text-text-primary flex items-center gap-2">
        <Iconography.Stroke.Document className="w-5 h-5 text-brand-primary" />
        게시 상태 설정
      </h3>
      <Radio.Group value={status} onChange={handleStatusChange}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {statuses.map(s => (
            <Radio.Item key={s.value} value={s.value}>
              {({ isActive }) => (
                <div
                  className={`p-4 rounded-slim-xl border-2 transition-all flex flex-col gap-3 text-left group cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                    isActive
                      ? 'border-brand-primary bg-primary-50/50 dark:bg-primary-900/20 shadow-lg shadow-brand-primary/10'
                      : 'border-border-subtle bg-bg-base hover:border-border-strong'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-slim-lg flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-brand-primary text-text-inverse'
                        : 'bg-bg-muted text-text-tertiary group-hover:text-text-secondary'
                    }`}
                  >
                    <s.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div
                      className={`font-slim-bold text-sm mb-1 ${
                        isActive ? 'text-brand-primary' : 'text-text-primary'
                      }`}
                    >
                      {s.label}
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">{s.description}</p>
                  </div>
                </div>
              )}
            </Radio.Item>
          ))}
        </div>
      </Radio.Group>
    </section>
  );
});

PublishStatusSelect.displayName = 'PublishStatusSelect';

export default PublishStatusSelect;
