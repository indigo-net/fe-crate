import { memo } from 'react';
import { useParams, Link } from 'react-router-dom';

import { InviteAcceptCard } from '@/widgets/evaluator-invitation/ui';

const PageInviteAccept = memo(() => {
  const { inviteToken } = useParams<{ inviteToken: string }>();

  if (!inviteToken) {
    return (
      <div className="w-full min-h-[100dvh] flex items-center justify-center bg-bg-base">
        <p className="text-text-secondary">유효하지 않은 초대 링크입니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[100dvh] flex flex-col bg-bg-subtle/30">
      <header className="w-full px-6 py-4 bg-bg-base border-b border-border-default">
        <div className="max-w-md mx-auto">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-brand-primary w-10 h-10 rounded-slim-xl flex justify-center items-center text-text-inverse font-slim-bold text-lg group-hover:scale-105 transition-transform">
              C
            </div>
            <span className="text-xl font-slim-bold tracking-tight group-hover:text-brand-primary transition-colors">
              CRATE
            </span>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <InviteAcceptCard inviteToken={inviteToken} />
      </main>
    </div>
  );
});

PageInviteAccept.displayName = 'PageInviteAccept';

export default PageInviteAccept;
