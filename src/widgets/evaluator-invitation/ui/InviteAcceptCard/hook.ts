import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { EvaluatorApiService } from '@/entities/evaluator';
import { DeveloperConsole } from '@/shared/lib';

import type { GetInvitationInfoResponse } from '@/entities/evaluator/api/get-invitation-info';

type InviteViewStatus = 'loading' | 'pending' | 'accepted' | 'expired' | 'not-found' | 'error';

const useInviteAcceptCardController = (inviteToken: string) => {
  const navigate = useNavigate();
  const [inviteInfo, setInviteInfo] = useState<GetInvitationInfoResponse | null>(null);
  const [inviteStatus, setInviteStatus] = useState<InviteViewStatus>('loading');
  const [isAccepting, setIsAccepting] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setInviteStatus('loading');
        const info = await EvaluatorApiService.fetchInviteInfo(inviteToken);
        setInviteInfo(info);

        if (info.status === 'EXPIRED') {
          setInviteStatus('expired');
        } else if (info.status === 'ACCEPTED') {
          setInviteStatus('accepted');
        } else {
          setInviteStatus('pending');
        }
      } catch (err: unknown) {
        DeveloperConsole.log({ message: 'InviteAcceptCard fetch error', data: err });
        const status = (err as { response?: { status?: number } })?.response?.status;
        if (status === 404) {
          setInviteStatus('not-found');
        } else {
          setInviteStatus('error');
        }
      }
    };
    fetchInfo();
  }, [inviteToken]);

  const handleAccept = useCallback(async () => {
    try {
      setIsAccepting(true);
      await EvaluatorApiService.acceptInvite(inviteToken);
      navigate('/evaluator/dashboard');
    } catch (err) {
      DeveloperConsole.log({ message: 'InviteAcceptCard accept error', data: err });
      setInviteStatus('error');
    } finally {
      setIsAccepting(false);
    }
  }, [inviteToken, navigate]);

  return { inviteInfo, inviteStatus, isAccepting, handleAccept };
};

export default useInviteAcceptCardController;
