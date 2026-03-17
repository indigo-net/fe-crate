import AxiosManager from '@/shared/lib/axios-manager';

import type { InvitationStatus } from '../types';

interface GetInvitationResponse {
  id: string;
  formId: string;
  email: string;
  inviteToken: string;
  status: InvitationStatus;
  expiresAt: string;
  acceptedAt: string | null;
  createdAt: string;
}

async function getInvitations(formId: string): Promise<GetInvitationResponse[]> {
  const axios = AxiosManager.getAxiosInstance();
  const response = await axios.get<GetInvitationResponse[]>(
    `/api/v1/forms/${formId}/invitations`,
  );
  return response.data;
}

export { getInvitations };
export type { GetInvitationResponse };
