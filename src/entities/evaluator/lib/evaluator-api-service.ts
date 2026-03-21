import CachedService from '@/entities/cache/lib/cached-service';

import { deleteInvitation } from '../api/delete-invitation';
import { getEvaluators } from '../api/get-evaluators';
import { getInvitationInfo } from '../api/get-invitation-info';
import { getInvitations } from '../api/get-invitations';
import { postAcceptInvitation } from '../api/post-accept-invitation';
import { postInvitation } from '../api/post-invitation';

import type { GetEvaluatorsResponse } from '../api/get-evaluators';
import type { GetInvitationInfoResponse } from '../api/get-invitation-info';
import type { GetInvitationResponse } from '../api/get-invitations';
import type { PostAcceptInvitationResponse } from '../api/post-accept-invitation';
import type { PostInvitationResponse } from '../api/post-invitation';

class EvaluatorApiService {
  private static DASHBOARD_CACHE_KEY = 'evaluator-dashboard-list';
  private static DASHBOARD_CACHE_TTL_MS = 5 * 60 * 1000;
  private static INVITATION_CACHE_TTL_MS = 1 * 60 * 1000;

  static async fetchDashboardEvaluators(): Promise<GetEvaluatorsResponse[]> {
    const cached = CachedService.get<GetEvaluatorsResponse[]>(this.DASHBOARD_CACHE_KEY);
    if (cached) {
      return cached;
    }

    const response = await getEvaluators();
    CachedService.set(this.DASHBOARD_CACHE_KEY, response, this.DASHBOARD_CACHE_TTL_MS);
    return response;
  }

  static async fetchInvitations(
    formId: string,
    force = false,
  ): Promise<GetInvitationResponse[]> {
    const cacheKey = `invitations-${formId}`;
    if (!force) {
      const cached = CachedService.get<GetInvitationResponse[]>(cacheKey);
      if (cached) {
        return cached;
      }
    }

    const response = await getInvitations(formId);
    CachedService.invalidate(cacheKey);
    CachedService.set(cacheKey, response, this.INVITATION_CACHE_TTL_MS);
    return response;
  }

  static async createInvitation(
    formId: string,
    email: string,
  ): Promise<PostInvitationResponse> {
    const result = await postInvitation(formId, { email });
    CachedService.invalidate(`invitations-${formId}`);
    return result;
  }

  static async removeInvitation(
    formId: string,
    invitationId: string,
  ): Promise<void> {
    await deleteInvitation(invitationId);
    CachedService.invalidate(`invitations-${formId}`);
  }

  static async fetchInviteInfo(
    inviteToken: string,
  ): Promise<GetInvitationInfoResponse> {
    return getInvitationInfo(inviteToken);
  }

  static async acceptInvite(
    inviteToken: string,
  ): Promise<PostAcceptInvitationResponse> {
    return postAcceptInvitation(inviteToken);
  }
}

export { EvaluatorApiService };
