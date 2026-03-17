import AxiosManager from '@/shared/lib/axios-manager';

interface PostAcceptInvitationResponse {
  formId: string;
  evaluatorId: string;
}

async function postAcceptInvitation(
  inviteToken: string,
): Promise<PostAcceptInvitationResponse> {
  const axios = AxiosManager.getAxiosInstance();
  const response = await axios.post<PostAcceptInvitationResponse>(
    `/api/v1/invitations/${inviteToken}/accept`,
  );
  return response.data;
}

export { postAcceptInvitation };
export type { PostAcceptInvitationResponse };
