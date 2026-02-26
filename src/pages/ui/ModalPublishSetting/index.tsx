import { memo, useMemo } from 'react';

import {
  DateRangePicker,
  PublishStatusSelect,
  SelectionMethodSelect,
  TargetCountInput,
} from '@/features/publish-form/ui';
import { useFormSignatureStore } from '@/entities/form/store';
import { Iconography } from '@/shared/ui';

interface PublishSettings {
  status: string;
  selectionMethod: string;
  publishedAt: string | null;
  closedAt: string | null;
  targetCount: number | null;
  standbyCount: number | null;
}

interface Props {
  onConfirm?: (settings: PublishSettings) => void;
}

const ModalPublishSetting = memo(({ onConfirm }: Props) => {
  const formSignature = useFormSignatureStore(s => s.formSignature);

  const isValid = useMemo(() => {
    if (!formSignature) return false;

    const status = formSignature.getValue('status');
    if (status === 'DRAFT') return true;

    const publishedAt = formSignature.getValue('publishedAt');
    const closedAt = formSignature.getValue('closedAt');
    const selectionMethod = formSignature.getValue('selectionMethod');
    const targetCount = formSignature.getValue('targetCount');

    if (!publishedAt) return false;
    if (closedAt && publishedAt >= closedAt) return false;

    if (selectionMethod !== 'QUANTITATIVE') {
      if (!targetCount || targetCount <= 0) return false;
    }

    return true;
  }, [formSignature]);

  const handleConfirm = () => {
    if (!isValid || !formSignature) return;

    onConfirm?.({
      status: formSignature.getValue('status'),
      selectionMethod: formSignature.getValue('selectionMethod'),
      publishedAt: formSignature.getValue('publishedAt'),
      closedAt: formSignature.getValue('closedAt'),
      targetCount: formSignature.getValue('targetCount'),
      standbyCount: formSignature.getValue('standbyCount'),
    });
  };

  return (
    <div className="flex flex-col gap-8 py-2">
      <PublishStatusSelect />
      <SelectionMethodSelect />
      <DateRangePicker />
      <TargetCountInput />

      <div className="mt-4 p-4 rounded-slim-lg bg-warning-bg/30 border border-warning-border/50 flex gap-3 items-start">
        <Iconography.Stroke.Monitor className="w-5 h-5 text-warning shrink-0 mt-0.5" />
        <p className="text-xs text-text-secondary leading-relaxed">
          <span className="font-slim-bold text-warning">확인해주세요:</span> 게시 이후에는 선발
          방식을 변경하기 어려울 수 있으며, 모든 지원 데이터는 설정된 기간 동안 암호화되어 안전하게
          보관됩니다.
        </p>
      </div>

      <button
        id="modal-confirm-trigger"
        onClick={handleConfirm}
        disabled={!isValid}
        className="hidden"
      />
      <div id="publish-settings-validity" data-valid={isValid} className="hidden" />
    </div>
  );
});

ModalPublishSetting.displayName = 'ModalPublishSetting';

export default ModalPublishSetting;
