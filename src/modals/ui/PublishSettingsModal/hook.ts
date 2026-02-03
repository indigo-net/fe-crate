import { useState, useMemo } from 'react';

import type { FormStatusType, SelectionMethodType } from '@/entities/form/model/type';

interface PublishSettings {
  status: FormStatusType;
  selectionMethod: SelectionMethodType;
  startDate: string;
  endDate: string;
}

interface Props {
  onConfirm?: (settings: PublishSettings) => void;
}

const usePublishSettingsModalController = (props: Props) => {
  const { onConfirm } = props;
  const [status, setStatus] = useState<FormStatusType>('PUBLISHED');
  const [selectionMethod, setSelectionMethod] = useState<SelectionMethodType>('QUANTITATIVE');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const isDraft = status === 'DRAFT';

  const isValid = useMemo(() => {
    if (isDraft) return true;

    // Publish status requires all fields
    return !!selectionMethod && !!startDate && !!endDate;
  }, [isDraft, selectionMethod, startDate, endDate]);

  const handleConfirm = () => {
    if (!isValid) return;

    onConfirm?.({
      status,
      selectionMethod,
      startDate,
      endDate,
    });
  };

  return {
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
  };
};

export default usePublishSettingsModalController;
