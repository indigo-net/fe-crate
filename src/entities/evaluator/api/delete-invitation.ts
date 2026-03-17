import AxiosManager from '@/shared/lib/axios-manager';

async function deleteInvitation(invitationId: string): Promise<void> {
  const axios = AxiosManager.getAxiosInstance();
  await axios.delete(`/api/v1/invitations/${invitationId}`);
}

export { deleteInvitation };
