import { memo } from 'react';

import { FormSignatureModel, StatusBadge } from '@/entities/form';
import { Iconography } from '@/shared/ui';

import type { SelectionMethodType } from '@/entities/form';

interface Props {
  formSignature: FormSignatureModel;
}

const SELECTION_METHOD_LABEL: Record<SelectionMethodType, string> = {
  QUANTITATIVE: '정량 평가',
  LOTTERY: '추첨제',
  FIRST_COME_FIRST_SERVED: '선착순',
};

const SELECTION_METHOD_ICON: Record<SelectionMethodType, React.ElementType> = {
  QUANTITATIVE: Iconography.Stroke.Target,
  LOTTERY: Iconography.Stroke.Dice,
  FIRST_COME_FIRST_SERVED: Iconography.Stroke.Flag,
};

const formatDate = (dateString: string | null, isClosedAt?: boolean): string => {
  if (!dateString) {
    return isClosedAt ? '상시 모집' : '-';
  }
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const FormMetaInfo = (props: Props) => {
  const { formSignature } = props;

  const title = formSignature.getValue('title');
  const description = formSignature.getValue('description');
  const status = formSignature.getValue('status');
  const publishedAt = formSignature.getValue('publishedAt');
  const closedAt = formSignature.getValue('closedAt');
  const selectionMethod = formSignature.getValue('selectionMethod');
  const targetCount = formSignature.getValue('targetCount');
  const standbyCount = formSignature.getValue('standbyCount');

  const SelectionMethodIcon = SELECTION_METHOD_ICON[selectionMethod];

  return (
    <section className="w-full flex flex-col gap-6 p-8 bg-bg-base border border-border-default rounded-slim-2xl shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-2xl font-slim-bold text-text-primary">{title || '제목 없음'}</h1>
        <StatusBadge status={status} />
      </div>

      {description && (
        <p className="text-base text-text-secondary leading-relaxed">{description}</p>
      )}

      <div className="flex flex-col gap-2 pt-4 border-t border-border-subtle">
        <div className="flex items-center gap-2 text-sm text-text-tertiary">
          <Iconography.Stroke.Calendar className="w-4 h-4" aria-hidden />
          <span>모집 기간:</span>
          <span className="text-text-secondary font-slim-semibold">
            {formatDate(publishedAt)} ~ {formatDate(closedAt, true)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-text-tertiary">
          <SelectionMethodIcon className="w-4 h-4" aria-hidden />
          <span>선발 방식:</span>
          <span className="text-text-secondary font-slim-semibold">
            {SELECTION_METHOD_LABEL[selectionMethod]}
          </span>
        </div>

        {targetCount !== null && (
          <div className="flex items-center gap-2 text-sm text-text-tertiary">
            <Iconography.Stroke.Users className="w-4 h-4" aria-hidden />
            <span>모집 인원:</span>
            <span className="text-text-secondary font-slim-semibold">
              {targetCount}명
              {standbyCount !== null && standbyCount > 0 && ` (대기 ${standbyCount}명)`}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(FormMetaInfo);
