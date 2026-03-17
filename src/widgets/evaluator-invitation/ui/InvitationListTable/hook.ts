import { useCallback, useEffect, useState } from 'react';

import { EvaluatorApiService, InvitationModel, InvitationStateService } from '@/entities/evaluator';
import { DeveloperConsole } from '@/shared/lib';

const useInvitationListTableController = (formId: string) => {
  const [invitations, setInvitations] = useState<InvitationModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInviting, setIsInviting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await EvaluatorApiService.fetchInvitations(formId);
        setInvitations(data.map(item => new InvitationModel(item)));
      } catch (err) {
        DeveloperConsole.log({ message: 'InvitationListTable fetch error', data: err });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [formId]);

  const handleInvite = useCallback(
    async (email: string) => {
      try {
        setIsInviting(true);
        const result = await EvaluatorApiService.createInvitation(formId, email);
        const model = new InvitationModel(result);
        setInvitations(prev => InvitationStateService.add(prev, model));
      } catch (err) {
        DeveloperConsole.log({ message: 'Invitation create error', data: err });
        throw err;
      } finally {
        setIsInviting(false);
      }
    },
    [formId],
  );

  const handleRemove = useCallback(
    async (invitationId: string) => {
      try {
        await EvaluatorApiService.removeInvitation(formId, invitationId);
        setInvitations(prev => InvitationStateService.remove(prev, invitationId));
      } catch (err) {
        DeveloperConsole.log({ message: 'Invitation remove error', data: err });
      }
    },
    [formId],
  );

  const handleCopyLink = useCallback(async (inviteToken: string) => {
    const url = `${window.location.origin}/invite/${inviteToken}`;
    await navigator.clipboard.writeText(url);
  }, []);

  const existingEmails = invitations.map(inv => inv.getValue('email'));

  return {
    invitations,
    isLoading,
    isInviting,
    existingEmails,
    handleInvite,
    handleRemove,
    handleCopyLink,
  };
};

export default useInvitationListTableController;
