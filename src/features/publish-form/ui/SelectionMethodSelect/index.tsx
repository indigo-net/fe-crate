import { memo } from 'react';

import { Iconography, Radio } from '@/shared/ui';

import useSelectionMethodSelectController from './hook';

import type { SelectionMethodType } from '@/entities/form';

const methods: {
  value: SelectionMethodType;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    value: 'QUANTITATIVE',
    label: '정량 평가',
    description: '점수 기반으로 공정하게 선발합니다.',
    icon: Iconography.Stroke.Target,
  },
  {
    value: 'LOTTERY',
    label: '추첨제',
    description: '무작위 추첨을 통해 선발합니다.',
    icon: Iconography.Stroke.Rocket,
  },
  {
    value: 'FIRST_COME_FIRST_SERVED',
    label: '선착순',
    description: '지원 순서대로 선발합니다.',
    icon: Iconography.Stroke.Flag,
  },
];

const SelectionMethodSelect = memo(() => {
  const { selectionMethod, isDraft, handleSelectionMethodChange } =
    useSelectionMethodSelectController();

  return (
    <section
      className={`flex flex-col gap-4 transition-all duration-300 ${
        isDraft ? 'opacity-40 grayscale pointer-events-none' : ''
      }`}
    >
      <h3 className="text-lg font-slim-bold text-text-primary flex items-center gap-2">
        <Iconography.Stroke.Target className="w-5 h-5 text-brand-primary" />
        선발 방식 설정
      </h3>
      <Radio.Group value={selectionMethod} onChange={handleSelectionMethodChange}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {methods.map(method => (
            <Radio.Item key={method.value} value={method.value}>
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
                    <method.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div
                      className={`font-slim-bold text-sm mb-1 ${
                        isActive ? 'text-brand-primary' : 'text-text-primary'
                      }`}
                    >
                      {method.label}
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {method.description}
                    </p>
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

SelectionMethodSelect.displayName = 'SelectionMethodSelect';

export default SelectionMethodSelect;
