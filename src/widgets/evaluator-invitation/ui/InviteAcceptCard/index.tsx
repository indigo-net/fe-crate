import { memo } from 'react';
import { Link } from 'react-router-dom';

import { Iconography } from '@/shared/ui';

import useInviteAcceptCardController from './hook';

interface Props {
  inviteToken: string;
}

const InviteAcceptCard = memo(({ inviteToken }: Props) => {
  const { inviteInfo, inviteStatus, isAccepting, handleAccept } =
    useInviteAcceptCardController(inviteToken);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-bg-base border border-border-default rounded-slim-2xl shadow-sm p-8 space-y-6">
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-full bg-brand-primary/10 flex items-center justify-center">
            <Iconography.Stroke.Users className="w-8 h-8 text-brand-primary" />
          </div>
        </div>

        {inviteStatus === 'loading' && (
          <div className="flex justify-center py-4">
            <div className="w-6 h-6 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin" />
          </div>
        )}

        {inviteStatus === 'pending' && inviteInfo && (
          <>
            <div className="text-center space-y-2">
              <h2 className="text-xl font-slim-bold text-text-primary">평가자 초대</h2>
              <p className="text-sm text-text-secondary">
                <span className="font-slim-semibold">{inviteInfo.inviterName}</span>
                님이 다음 공고의 평가자로 초대했습니다.
              </p>
            </div>
            <div className="bg-bg-subtle rounded-slim-xl p-4 text-center">
              <p className="text-lg font-slim-bold text-text-primary">{inviteInfo.formTitle}</p>
            </div>
            <button
              onClick={handleAccept}
              disabled={isAccepting}
              className="w-full py-3 bg-brand-primary text-text-inverse font-slim-bold rounded-slim-lg hover:shadow-md hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all"
            >
              {isAccepting ? '수락 처리 중...' : '수락하기'}
            </button>
          </>
        )}

        {inviteStatus === 'accepted' && (
          <div className="text-center space-y-4">
            <h2 className="text-xl font-slim-bold text-text-primary">이미 수락된 초대</h2>
            <p className="text-sm text-text-secondary">이미 수락된 초대입니다.</p>
            <Link
              to="/evaluator/dashboard"
              className="inline-block px-6 py-2.5 bg-brand-primary text-text-inverse font-slim-bold text-sm rounded-slim-lg hover:shadow-md transition-all"
            >
              대시보드로 이동
            </Link>
          </div>
        )}

        {inviteStatus === 'expired' && (
          <div className="text-center space-y-2">
            <h2 className="text-xl font-slim-bold text-text-primary">만료된 초대</h2>
            <p className="text-sm text-text-secondary">
              초대가 만료되었습니다. 관리자에게 다시 초대를 요청하세요.
            </p>
          </div>
        )}

        {inviteStatus === 'not-found' && (
          <div className="text-center space-y-2">
            <h2 className="text-xl font-slim-bold text-text-primary">유효하지 않은 링크</h2>
            <p className="text-sm text-text-secondary">유효하지 않은 초대 링크입니다.</p>
          </div>
        )}

        {inviteStatus === 'error' && (
          <div className="text-center space-y-2">
            <h2 className="text-xl font-slim-bold text-text-primary">오류</h2>
            <p className="text-sm text-text-secondary">
              오류가 발생했습니다. 잠시 후 다시 시도해주세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

InviteAcceptCard.displayName = 'InviteAcceptCard';

export default InviteAcceptCard;
