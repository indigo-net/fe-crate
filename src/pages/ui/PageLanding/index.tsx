import { memo } from 'react';
import { Link } from 'react-router-dom';

// import { LoginButton } from '@/features/authenticate/ui';
import { DarkModeButton } from '@/features/toggle-theme/ui';
import { Iconography } from '@/shared/ui';

import usePageLandingController from './hook';

const PageLanding = memo(() => {
  const { isLoggined } = usePageLandingController();

  return (
    <div className="w-full min-h-[100dvh] overflow-y-auto flex flex-col bg-bg-base text-text-primary">
      <header className="w-full px-6 py-4 flex justify-between items-center bg-bg-base border-b border-border-default sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link to="/" aria-label="CRATE 홈" className="flex items-center gap-3 group">
            <div className="bg-brand-primary w-10 h-10 rounded-slim-xl flex justify-center items-center text-text-inverse font-slim-bold text-lg group-hover:scale-105 transition-transform">
              C
            </div>
            <span className="text-xl font-slim-bold tracking-tight text-text-primary group-hover:text-brand-primary transition-colors">
              CRATE
            </span>
          </Link>
        </div>
        <nav className="flex items-center gap-3">
          <DarkModeButton />
          <Link
            to="/dashboard"
            className="px-4 py-2 text-sm font-slim-semibold text-text-secondary hover:text-text-primary rounded-slim-lg hover:bg-bg-subtle transition-all"
          >
            대시보드
          </Link>
          {isLoggined ? (
            <span className="px-4 py-2 text-sm font-slim-semibold text-brand-primary bg-brand-primary/10 rounded-slim-lg">
              로그인됨
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-slim-semibold text-text-secondary hover:text-text-primary rounded-slim-lg hover:bg-bg-subtle transition-all"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-slim-semibold text-text-inverse bg-brand-primary rounded-slim-lg hover:bg-brand-primary-hover transition-all"
              >
                회원가입
              </Link>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full px-6 py-24 flex flex-col items-center gap-8 bg-bg-base">
          <div className="flex flex-col items-center gap-6 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-pink-50 dark:bg-neon-pink-950/30 border border-neon-pink-200 dark:border-neon-pink-800 text-neon-pink-600 dark:text-neon-pink-400 font-slim-semibold rounded-slim-xl text-sm">
              <Iconography.Stroke.Sparkles className="w-4 h-4" />
              <span>선발의 새로운 기준</span>
            </div>

            <h1 className="text-5xl desktop:text-7xl font-slim-bold text-center leading-tight tracking-tight text-text-primary">
              <span className="text-neon-pink-600 dark:text-neon-pink-400">선발,</span> 이제{' '}
              <span className="text-neon-green-600 dark:text-neon-green-400">쉽게</span>!
            </h1>

            <p className="text-xl desktop:text-2xl text-text-secondary text-center font-medium max-w-2xl leading-relaxed">
              흩어진 도구와 복잡한 과정은 이제{' '}
              <span className="font-bold text-brand-primary">CRATE</span>로 끝.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/new-form"
                className="px-8 py-4 bg-brand-primary text-text-inverse font-slim-semibold text-lg rounded-slim-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all flex items-center gap-3"
              >
                <Iconography.Stroke.Rocket className="w-6 h-6" />
                <span>지금 시작하기</span>
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-bg-subtle text-text-primary font-slim-semibold text-lg rounded-slim-xl border border-border-default hover:border-brand-primary hover:shadow-sm transform hover:scale-105 transition-all flex items-center gap-3"
              >
                <Iconography.Stroke.Monitor className="w-6 h-6" />
                <span>로그인하기</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full px-6 py-20 bg-bg-subtle">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl desktop:text-5xl font-slim-bold mb-4 text-text-primary">
                이런 경험 있으신가요?
              </h2>
            </div>

            <div className="grid grid-cols-1 desktop:grid-cols-3 gap-6">
              <article className="p-8 bg-bg-base rounded-slim-2xl border border-border-default shadow-sm hover:shadow-md hover:border-brand-primary transition-all group">
                <div className="w-12 h-12 flex items-center justify-center bg-neon-pink-50 dark:bg-neon-pink-950/30 rounded-slim-xl mb-6 group-hover:scale-110 transition-transform">
                  <Iconography.Stroke.Dizzy className="w-6 h-6 text-neon-pink-600 dark:text-neon-pink-400" />
                </div>
                <h3 className="text-xl font-slim-bold text-text-primary mb-3">
                  도구가 너무 많아요
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  구글 폼으로 수집, 엑셀로 정리, 메신저로 논의... 너무 복잡해요.
                </p>
              </article>

              <article className="p-8 bg-bg-base rounded-slim-2xl border border-border-default shadow-sm hover:shadow-md hover:border-neon-green-500 transition-all group">
                <div className="w-12 h-12 flex items-center justify-center bg-neon-green-50 dark:bg-neon-green-950/30 rounded-slim-xl mb-6 group-hover:scale-110 transition-transform">
                  <Iconography.Stroke.Angry className="w-6 h-6 text-neon-green-600 dark:text-neon-green-400" />
                </div>
                <h3 className="text-xl font-slim-bold text-text-primary mb-3">공정하지 않아요</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  모집 중에 평가하면 먼저 지원한 사람이 유리하고, 일관성도 떨어져요.
                </p>
              </article>

              <article className="p-8 bg-bg-base rounded-slim-2xl border border-border-default shadow-sm hover:shadow-md hover:border-neon-violet-500 transition-all group">
                <div className="w-12 h-12 flex items-center justify-center bg-neon-violet-50 dark:bg-neon-violet-950/30 rounded-slim-xl mb-6 group-hover:scale-110 transition-transform">
                  <Iconography.Stroke.Sad className="w-6 h-6 text-neon-violet-600 dark:text-neon-violet-400" />
                </div>
                <h3 className="text-xl font-slim-bold text-text-primary mb-3">협업이 어려워요</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  여러 운영진이 함께 평가하려면 파일 공유하고 취합하고... 너무 복잡해요.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="w-full px-6 py-20 bg-bg-base">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl desktop:text-5xl font-slim-bold mb-4 text-text-primary">
                CRATE가 해결해요!
              </h2>
              <p className="text-xl text-text-secondary font-medium">
                선발에 집중할 수 있는 올인원 플랫폼
              </p>
            </div>

            <div className="grid grid-cols-1 desktop:grid-cols-2 gap-6">
              <article className="group relative p-8 bg-bg-subtle border-2 border-transparent rounded-slim-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 flex items-center justify-center bg-brand-primary rounded-slim-xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Iconography.Stroke.Target className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-slim-bold text-text-primary mb-2 group-hover:text-brand-primary transition-colors">
                      통합 워크플로우
                    </h3>
                    <p className="text-text-secondary">
                      양식 제작부터 합격 통보까지, 한 곳에서 끝
                    </p>
                  </div>
                </div>
              </article>

              <article className="group relative p-8 bg-bg-subtle border-2 border-transparent rounded-slim-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 flex items-center justify-center bg-neon-pink-500 rounded-slim-xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Iconography.Stroke.Balance className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-slim-bold text-text-primary mb-2 group-hover:text-neon-pink-500 transition-colors">
                      공정한 평가
                    </h3>
                    <p className="text-text-secondary">
                      모집 마감 후 일괄 평가로 완벽한 공정성
                    </p>
                  </div>
                </div>
              </article>

              <article className="group relative p-8 bg-bg-subtle border-2 border-transparent rounded-slim-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 flex items-center justify-center bg-neon-violet-500 rounded-slim-xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Iconography.Stroke.Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-slim-bold text-text-primary mb-2 group-hover:text-neon-violet-500 transition-colors">
                      팀 협업
                    </h3>
                    <p className="text-text-secondary">
                      여러 운영진이 함께 평가, 파일 공유 없이 즉시 협업
                    </p>
                  </div>
                </div>
              </article>

              <article className="group relative p-8 bg-bg-subtle border-2 border-transparent rounded-slim-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 flex items-center justify-center bg-neon-green-500 rounded-slim-xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Iconography.Stroke.Flash className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-slim-bold text-text-primary mb-2 group-hover:text-neon-green-500 transition-colors">
                      단순함
                    </h3>
                    <p className="text-text-secondary">
                      직관적인 드래그 앤 드롭으로 5분 만에 모집 시작
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="w-full px-6 py-20 bg-gradient-to-b from-bg-subtle via-bg-base to-bg-subtle">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl desktop:text-5xl font-slim-bold mb-4 text-text-primary">
                이런 분들께 추천해요
              </h2>
            </div>

            <div className="grid grid-cols-1 desktop:grid-cols-3 gap-8">
              <article className="group relative overflow-hidden p-10 bg-gradient-to-br from-brand-primary via-brand-primary/90 to-brand-primary/80 rounded-slim-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full blur-2xl" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-slim-xl mb-6 group-hover:scale-110 transition-transform">
                    <Iconography.Stroke.Graduation className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-slim-bold text-white mb-4">대학 동아리</h3>
                  <p className="text-white/90 leading-relaxed">
                    부원 모집부터 선정까지 한 번에.
                  </p>
                </div>
              </article>

              <article className="group relative overflow-hidden p-10 bg-gradient-to-br from-neon-pink-500 via-neon-pink-400 to-neon-pink-600 rounded-slim-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full blur-2xl" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-slim-xl mb-6 group-hover:scale-110 transition-transform">
                    <Iconography.Stroke.Rocket className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-slim-bold text-white mb-4">스타트업</h3>
                  <p className="text-white/90 leading-relaxed">
                    전문가 없이도 완벽한 채용 프로세스.
                  </p>
                </div>
              </article>

              <article className="group relative overflow-hidden p-10 bg-gradient-to-br from-neon-violet-500 via-neon-violet-400 to-neon-violet-600 rounded-slim-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full blur-2xl" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-16 h-16 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-slim-xl mb-6 group-hover:scale-110 transition-transform">
                    <Iconography.Stroke.Document className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-slim-bold text-white mb-4">행사 운영진</h3>
                  <p className="text-white/90 leading-relaxed">
                    공정하고 빠른 참가자 모집.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <article className="w-full px-6 py-20 bg-brand-primary text-text-inverse relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl desktop:text-6xl font-slim-bold mb-6 leading-tight tracking-tight">
              선발의 새로운 기준,
              <br />
              지금 시작하세요
            </h2>
            <p className="text-xl desktop:text-2xl mb-10 font-slim-normal flex items-center justify-center gap-2 opacity-90">
              복잡한 설정 없이 5분 만에 모집 시작 <Iconography.Stroke.Flash className="w-5 h-5" />
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/new-form"
                className="px-10 py-5 bg-bg-base text-brand-primary font-slim-bold text-xl rounded-slim-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center gap-3"
              >
                <Iconography.Stroke.Target className="w-8 h-8" />
                <span>무료로 시작하기</span>
              </Link>
              {!isLoggined && (
                <Link
                  to="/signup"
                  className="px-10 py-5 bg-brand-secondary text-text-inverse font-slim-bold text-xl rounded-slim-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center gap-3"
                >
                  <Iconography.Stroke.Rocket className="w-8 h-8" />
                  <span>회원가입</span>
                </Link>
              )}
            </div>
            <p className="mt-8 text-sm font-slim-normal flex items-center justify-center gap-2 opacity-75">
              <Iconography.Stroke.Sparkles className="w-4 h-4" /> 신용카드 등록 불필요 · 언제든
              무료로 시작
            </p>
          </div>
        </article>
      </main>

      <footer className="w-full px-6 py-12 bg-bg-subtle border-t border-border-default text-text-primary">
        <div className="max-w-6xl mx-auto flex flex-col desktop:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-brand-primary w-10 h-10 rounded-slim-xl flex justify-center items-center text-text-inverse font-slim-bold text-lg">
              C
            </div>
            <span className="text-xl font-slim-bold tracking-tight">CRATE</span>
          </div>
          <div className="text-center desktop:text-right">
            <p className="text-text-secondary text-sm">
              © 2025 indigo-net. CRATE by indigo-net. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
});

PageLanding.displayName = 'PageLanding';

export default PageLanding;
