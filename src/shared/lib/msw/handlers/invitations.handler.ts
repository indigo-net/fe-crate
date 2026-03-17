import { http } from 'msw';

import { EnvManager } from '@/shared/lib';

import { formsStore, invitationsStore } from '../fixtures';
import { MockDelayManager, MockResponseManager } from '../utils';

import type { InvitationFixture } from '../fixtures';

const BASE_URL = EnvManager.getAppEnv('VITE_API_BASE_URL') || '';
const API_PREFIX = `${BASE_URL}/api/v1`;

export const invitationsHandlers = [
  /**
   * POST /api/v1/forms/:formId/invitations - 초대 생성
   */
  http.post(`${API_PREFIX}/forms/:formId/invitations`, async ({ params, request }) => {
    await MockDelayManager.random('normal');

    const { formId } = params;
    const form = formsStore.find(f => f.id === formId);

    if (!form) {
      return MockResponseManager.error('FORM_NOT_FOUND');
    }

    const body = (await request.json()) as { email: string };

    const existingInvitation = invitationsStore.find(
      inv => inv.formId === formId && inv.email === body.email && inv.status !== 'EXPIRED',
    );

    if (existingInvitation) {
      return MockResponseManager.error('DUPLICATE_INVITATION');
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const newInvitation: InvitationFixture = {
      id: `invitation-${Date.now()}`,
      formId: formId as string,
      email: body.email,
      inviteToken: `token-${crypto.randomUUID().slice(0, 8)}`,
      status: 'PENDING',
      expiresAt: expiresAt.toISOString(),
      acceptedAt: null,
      createdAt: now.toISOString(),
    };

    invitationsStore.push(newInvitation);

    return MockResponseManager.success(newInvitation, { status: 201 });
  }),

  /**
   * GET /api/v1/forms/:formId/invitations - 폼의 초대 목록
   */
  http.get(`${API_PREFIX}/forms/:formId/invitations`, async ({ params }) => {
    await MockDelayManager.random('fast');

    const { formId } = params;
    const form = formsStore.find(f => f.id === formId);

    if (!form) {
      return MockResponseManager.error('FORM_NOT_FOUND');
    }

    const now = new Date();
    const invitations = invitationsStore
      .filter(inv => inv.formId === formId)
      .map(inv => {
        if (inv.status === 'PENDING' && new Date(inv.expiresAt) < now) {
          inv.status = 'EXPIRED';
        }
        return inv;
      });

    return MockResponseManager.success(invitations);
  }),

  /**
   * DELETE /api/v1/invitations/:invitationId - 초대 삭제
   */
  http.delete(`${API_PREFIX}/invitations/:invitationId`, async ({ params }) => {
    await MockDelayManager.random('fast');

    const { invitationId } = params;
    const index = invitationsStore.findIndex(inv => inv.id === invitationId);

    if (index === -1) {
      return MockResponseManager.error('INVITATION_NOT_FOUND');
    }

    invitationsStore.splice(index, 1);

    return MockResponseManager.success({ deleted: true });
  }),

  /**
   * GET /api/v1/public/invitations/:inviteToken - 공개 초대 정보
   */
  http.get(`${API_PREFIX}/public/invitations/:inviteToken`, async ({ params }) => {
    await MockDelayManager.random('fast');

    const { inviteToken } = params;
    const invitation = invitationsStore.find(inv => inv.inviteToken === inviteToken);

    if (!invitation) {
      return MockResponseManager.error('INVITATION_NOT_FOUND');
    }

    const now = new Date();
    if (invitation.status === 'PENDING' && new Date(invitation.expiresAt) < now) {
      invitation.status = 'EXPIRED';
    }

    const form = formsStore.find(f => f.id === invitation.formId);

    return MockResponseManager.success({
      formTitle: form?.title ?? '알 수 없는 공고',
      inviterName: '운영지원팀',
      inviterEmail: 'admin@crate.io',
      status: invitation.status,
      expiresAt: invitation.expiresAt,
    });
  }),

  /**
   * POST /api/v1/invitations/:inviteToken/accept - 초대 수락
   */
  http.post(`${API_PREFIX}/invitations/:inviteToken/accept`, async ({ params }) => {
    await MockDelayManager.random('normal');

    const { inviteToken } = params;
    const invitation = invitationsStore.find(inv => inv.inviteToken === inviteToken);

    if (!invitation) {
      return MockResponseManager.error('INVITATION_NOT_FOUND');
    }

    if (invitation.status === 'ACCEPTED') {
      return MockResponseManager.error('INVITATION_ALREADY_ACCEPTED');
    }

    const now = new Date();
    if (invitation.status === 'PENDING' && new Date(invitation.expiresAt) < now) {
      invitation.status = 'EXPIRED';
      return MockResponseManager.error('INVITATION_EXPIRED');
    }

    invitation.status = 'ACCEPTED';
    invitation.acceptedAt = now.toISOString();

    const form = formsStore.find(f => f.id === invitation.formId);
    if (form && !form.evaluatorIds.includes('current-user-id')) {
      form.evaluatorIds.push('current-user-id');
    }

    return MockResponseManager.success({
      formId: invitation.formId,
      evaluatorId: 'current-user-id',
    });
  }),
];
