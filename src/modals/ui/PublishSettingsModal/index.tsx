import type { FormStatusType, SelectionMethodType } from '@/entities/form/model/type';

import { Iconography, Radio } from '@/shared/ui';

import usePublishSettingsModalController from './hook';

interface PublishSettings {
  status: FormStatusType;
  selectionMethod: SelectionMethodType;
  startDate: string;
  endDate: string;
}

interface Props {
  onConfirm?: (settings: PublishSettings) => void;
}

const PublishSettingsModal = ({ onConfirm }: Props) => {
  const {
    status,
    setStatus,
    selectionMethod,
    setSelectionMethod,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isValid,
    handleConfirm,
  } = usePublishSettingsModalController({ onConfirm });

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

  return (
    <div className="flex flex-col gap-8 py-2">
      {/* 1. 게시 상태 설정 */}
      <section className="flex flex-col gap-4">
        <h3 className="text-lg font-slim-bold text-text-primary flex items-center gap-2">
          <Iconography.Stroke.Document className="w-5 h-5 text-brand-primary" />
          게시 상태 설정
        </h3>
        <Radio.Group value={status} onChange={setStatus}>
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

      {/* 2. 선발 방식 설정 */}
      <section
        className={`flex flex-col gap-4 transition-all duration-300 ${status === 'DRAFT' ? 'opacity-40 grayscale pointer-events-none' : ''}`}
      >
        <h3 className="text-lg font-slim-bold text-text-primary flex items-center gap-2">
          <Iconography.Stroke.Target className="w-5 h-5 text-brand-primary" />
          선발 방식 설정
        </h3>
        <Radio.Group value={selectionMethod} onChange={setSelectionMethod}>
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

      {/* 3. 모집 기간 설정 */}
      <section
        className={`flex flex-col gap-4 transition-all duration-300 ${status === 'DRAFT' ? 'opacity-40 grayscale pointer-events-none' : ''}`}
      >
        <h3 className="text-lg font-slim-bold text-text-primary flex items-center gap-2">
          <Iconography.Stroke.Document className="w-5 h-5 text-brand-primary" />
          모집 기간 설정
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-bg-subtle p-6 rounded-slim-xl border border-border-default">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-slim-semibold text-text-secondary ml-1">
              게시 시작일
            </label>
            <div className="relative group">
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full px-4 py-3 bg-bg-base border border-border-default rounded-slim-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all outline-none text-text-primary font-slim-medium"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-brand-primary transition-colors pointer-events-none">
                <Iconography.Stroke.Monitor className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[11px] text-text-tertiary ml-1">* 해당 시점부터 폼이 공개됩니다.</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-slim-semibold text-text-secondary ml-1">
              모집 마감일
            </label>
            <div className="relative group">
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="w-full px-4 py-3 bg-bg-base border border-border-default rounded-slim-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all outline-none text-text-primary font-slim-medium"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-brand-primary transition-colors pointer-events-none">
                <Iconography.Stroke.Rocket className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[11px] text-text-tertiary ml-1">
              * 마감 시 더 이상 지원할 수 없습니다.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-4 p-4 rounded-slim-lg bg-warning-bg/30 border border-warning-border/50 flex gap-3 items-start">
        <Iconography.Stroke.Monitor className="w-5 h-5 text-warning shrink-0 mt-0.5" />
        <p className="text-xs text-text-secondary leading-relaxed">
          <span className="font-slim-bold text-warning">확인해주세요:</span> 게시 이후에는 선발
          방식을 변경하기 어려울 수 있으며, 모든 지원 데이터는 설정된 기간 동안 암호화되어 안전하게
          보관됩니다.
        </p>
      </div>

      {/* 
        NOTE: 모달 시스템의 confirm 버튼이 외부에 있으므로 
        이 컴포넌트 내부에서 상태를 전달할 트리거가 필요하거나, 
        ModalProps의 confirmCallback을 잘 활용해야 함.
        isValid 상태를 상위로 전달하는 기믹이 필요할 수 있음.
      */}
      <button
        id="modal-confirm-trigger"
        onClick={handleConfirm}
        disabled={!isValid}
        className="hidden"
      />

      {/* 
        실제 버튼은 모달 Footer에 있겠지만, if validity matters 
        we might need a way to communicate 'isValid' to the parent.
        Usually this is done via a data attribute or a state in a shared store.
      */}
      <div id="publish-settings-validity" data-valid={isValid} className="hidden" />
    </div>
  );
};

export default PublishSettingsModal;
