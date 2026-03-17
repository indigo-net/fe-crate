import { memo } from 'react';

import type InvitationModel from '@/entities/evaluator/model/invitation';

import { InviteEmailInput } from '@/features/invite-evaluator/ui';
import { Iconography } from '@/shared/ui';

import useInvitationListTableController from './hook';

import type { InvitationStatus } from '@/entities/evaluator';


const getStatusLabel = (status: InvitationStatus): string => {
  switch (status) {
    case 'PENDING':
      return '대기';
    case 'ACCEPTED':
      return '수락';
    case 'EXPIRED':
      return '만료';
    default:
      return '알 수 없음';
  }
};

const getStatusColor = (status: InvitationStatus): string => {
  switch (status) {
    case 'PENDING':
      return 'text-warning';
    case 'ACCEPTED':
      return 'text-success';
    case 'EXPIRED':
      return 'text-text-tertiary';
    default:
      return 'text-text-tertiary';
  }
};

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

const InvitationRow = memo(
  ({
    invitation,
    onRemove,
    onCopyLink,
  }: {
    invitation: InvitationModel;
    onRemove: (id: string) => void;
    onCopyLink: (token: string) => void;
  }) => {
    const status = invitation.getValue('status');
    const statusLabel = getStatusLabel(status);
    const statusColor = getStatusColor(status);

    return (
      <tr className="border-b border-border-subtle last:border-b-0 hover:bg-bg-subtle/50 transition-colors">
        <td className="px-4 py-3 text-sm text-text-primary">{invitation.getValue('email')}</td>
        <td className="px-4 py-3">
          <span className={`text-xs font-slim-bold ${statusColor}`}>{statusLabel}</span>
        </td>
        <td className="px-4 py-3 text-xs text-text-tertiary">
          {formatDate(invitation.getValue('expiresAt'))}
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-1">
            {status === 'PENDING' && (
              <button
                onClick={() => onCopyLink(invitation.getValue('inviteToken'))}
                className="p-1.5 rounded-slim-md hover:bg-bg-subtle text-text-secondary hover:text-brand-primary transition-colors"
                title="초대 링크 복사"
              >
                <Iconography.Stroke.Document className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => onRemove(invitation.getValue('id'))}
              className="p-1.5 rounded-slim-md hover:bg-bg-subtle text-text-secondary hover:text-error transition-colors"
              title="초대 삭제"
            >
              <Iconography.Stroke.Trash className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
    );
  },
);
InvitationRow.displayName = 'InvitationRow';

interface Props {
  formId: string;
}

const InvitationListTable = memo(({ formId }: Props) => {
  const {
    invitations,
    isLoading,
    isInviting,
    existingEmails,
    handleInvite,
    handleRemove,
    handleCopyLink,
  } = useInvitationListTableController(formId);

  return (
    <div className="space-y-6">
      <InviteEmailInput
        onInvite={handleInvite}
        existingEmails={existingEmails}
        isLoading={isInviting}
      />

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin" />
        </div>
      ) : invitations.length === 0 ? (
        <p className="text-center py-8 text-sm text-text-tertiary">
          아직 초대된 평가자가 없습니다.
        </p>
      ) : (
        <div className="border border-border-default rounded-slim-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-bg-subtle/50 border-b border-border-default">
                <th className="px-4 py-2.5 text-left text-xs font-slim-bold text-text-secondary">
                  이메일
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-slim-bold text-text-secondary">
                  상태
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-slim-bold text-text-secondary">
                  만료일
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-slim-bold text-text-secondary w-24">
                  액션
                </th>
              </tr>
            </thead>
            <tbody>
              {invitations.map(inv => (
                <InvitationRow
                  key={inv.getValue('id')}
                  invitation={inv}
                  onRemove={handleRemove}
                  onCopyLink={handleCopyLink}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
});

InvitationListTable.displayName = 'InvitationListTable';

export default InvitationListTable;
