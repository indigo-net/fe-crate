import { memo } from 'react';

import { Iconography } from '@/shared/ui';
import { InvitationListTable } from '@/widgets/evaluator-invitation/ui';

interface Props {
  formId: string;
  formTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

const ModalInviteEvaluator = memo(({ formId, formTitle, isOpen, onClose }: Props) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-lg mx-4 bg-bg-base rounded-slim-2xl shadow-xl max-h-[80vh] flex flex-col">
        <header className="flex items-center justify-between px-6 py-4 border-b border-border-default">
          <div>
            <h2 className="text-lg font-slim-bold text-text-primary flex items-center gap-2">
              <Iconography.Stroke.Users className="w-5 h-5 text-brand-primary" />
              평가자 초대
            </h2>
            <p className="text-xs text-text-tertiary mt-0.5">{formTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-slim-lg hover:bg-bg-subtle text-text-secondary transition-colors"
          >
            <Iconography.Stroke.Minus className="w-5 h-5" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <InvitationListTable formId={formId} />
        </div>
      </div>
    </div>
  );
});

ModalInviteEvaluator.displayName = 'ModalInviteEvaluator';

export default ModalInviteEvaluator;
