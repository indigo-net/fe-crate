import AxiosManager from '@/shared/lib/axios-manager';

import type { InvitationStatus } from '../types';

interface GetInvitationInfoResponse {
  formTitle: string;
  inviterName: string;
  inviterEmail: string;
  status: InvitationStatus;
  expiresAt: string;
}

async function getInvitationInfo(inviteToken: string): Promise<GetInvitationInfoResponse> {
  const axios = AxiosManager.getAxiosInstance();
  const response = await axios.get<GetInvitationInfoResponse>(
    `/api/v1/public/invitations/${inviteToken}`,
  );
  return response.data;
}

export { getInvitationInfo };
export type { GetInvitationInfoResponse };
