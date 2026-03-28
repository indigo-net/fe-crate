import { memo } from 'react';
import { Link } from 'react-router-dom';

import { DarkModeButton } from '@/features/toggle-theme/ui';
import { Iconography } from '@/shared/ui';
import { AssignedFormList } from '@/widgets/evaluator-dashboard/ui';

const PageEvaluatorDashboard = memo(() => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-bg-base text-text-primary">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full px-6 py-4 flex justify-between items-center bg-bg-base border-b border-border-default">
        <Link to="/" aria-label="CRATE 홈" className="flex items-center gap-6 group">
          <div className="flex items-center gap-3">
            <div className="bg-brand-primary w-10 h-10 rounded-slim-xl flex justify-center items-center text-text-inverse font-slim-bold text-lg group-hover:scale-105 transition-transform">
              C
            </div>
            <span className="text-xl font-slim-bold tracking-tight group-hover:text-brand-primary transition-colors">
              CRATE
            </span>
          </div>
          <div className="h-6 w-px bg-border-default hidden sm:block" />
          <h1 className="text-lg font-slim-semibold text-text-secondary hidden sm:block">
            평가자 대시보드
          </h1>
        </Link>

        <nav className="flex items-center gap-4">
          <DarkModeButton />
          <div className="h-6 w-px bg-border-default mx-2" />
          <section className="flex items-center gap-3 pl-2" aria-label="사용자 프로필">
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20">
              <Iconography.Stroke.Users className="w-6 h-6" />
            </div>
            <div className="hidden desktop:block leading-tight">
              <p className="text-sm font-slim-bold mb-0.5">평가자</p>
              <p className="text-[11px] text-text-tertiary">evaluator@crate.io</p>
            </div>
          </section>
        </nav>
      </header>

      {/* Main */}
      <main className="flex-1 bg-bg-subtle/30 overflow-y-auto px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-slim-bold mb-6">배정된 폼</h2>
          <AssignedFormList />
        </div>
      </main>

      {/* Footer - TODO 수정 필요 */}
      <footer className="w-full px-6 py-4 border-t border-border-default bg-bg-base">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-[11px] text-text-tertiary font-slim-normal">
          <p>© {new Date().getFullYear()} CRATE by indigo-net. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-neon-green-500" />
              시스템 정상 운영 중
            </span>
            <span className="tabular-nums">v1.2.4</span>
          </div>
        </div>
      </footer>
    </div>
  );
});

PageEvaluatorDashboard.displayName = 'PageEvaluatorDashboard';

export default PageEvaluatorDashboard;
