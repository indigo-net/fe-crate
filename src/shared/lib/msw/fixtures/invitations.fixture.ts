/**
 * Invitation Fixture Data
 * Mock 데이터: 평가자 초대
 */

export type InvitationFixtureStatus = 'PENDING' | 'ACCEPTED' | 'EXPIRED';

export interface InvitationFixture {
  id: string;
  formId: string;
  email: string;
  inviteToken: string;
  status: InvitationFixtureStatus;
  expiresAt: string;
  acceptedAt: string | null;
  createdAt: string;
}

const now = new Date();
const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

export const invitationsFixture: InvitationFixture[] = [
  {
    id: 'invitation-1',
    formId: 'form-2',
    email: 'pending@example.com',
    inviteToken: 'token-pending-001',
    status: 'PENDING',
    expiresAt: sevenDaysLater.toISOString(),
    acceptedAt: null,
    createdAt: now.toISOString(),
  },
  {
    id: 'invitation-2',
    formId: 'form-2',
    email: 'hong.eval@company.com',
    inviteToken: 'token-accepted-001',
    status: 'ACCEPTED',
    expiresAt: sevenDaysLater.toISOString(),
    acceptedAt: threeDaysAgo.toISOString(),
    createdAt: threeDaysAgo.toISOString(),
  },
];

/**
 * In-memory store for mutation
 */
export const invitationsStore = structuredClone(invitationsFixture);

/**
 * Reset store to initial state
 */
export function resetInvitationsStore(): void {
  invitationsStore.length = 0;
  invitationsStore.push(...structuredClone(invitationsFixture));
}
