import AxiosManager from '@/shared/lib/axios-manager';

import type { InvitationStatus } from '../types';

interface PostInvitationRequestData {
  email: string;
}

interface PostInvitationResponse {
  id: string;
  formId: string;
  email: string;
  inviteToken: string;
  status: InvitationStatus;
  expiresAt: string;
  createdAt: string;
}

async function postInvitation(
  formId: string,
  data: PostInvitationRequestData,
): Promise<PostInvitationResponse> {
  const axios = AxiosManager.getAxiosInstance();
  const response = await axios.post<PostInvitationResponse>(
    `/api/v1/forms/${formId}/invitations`,
    data,
  );
  return response.data;
}

export { postInvitation };
export type { PostInvitationRequestData, PostInvitationResponse };
