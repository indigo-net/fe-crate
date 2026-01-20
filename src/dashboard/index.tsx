import React from 'react';
import Iconography from '../shared/ui/iconography';

/**
 * CRATE-68: Admin Dashboard Publishing
 * 중앙 관제탑(Command Tower) 컨셉의 마스터 관리자 대시보드
 */
const DashboardPage: React.FC = () => {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[var(--color-bg-default)] font-sans text-[var(--color-text-primary)]">
      {/* Top Navigation - Neon Header */}
      <header className="flex h-16 items-center justify-between border-b border-[var(--color-divider-default)] bg-[var(--color-bg-default)] px-6 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-[var(--color-brand-primary)] p-1.5 shadow-[0_0_10px_var(--color-brand-primary)]">
            <Iconography.Stroke.Monitor className="h-6 w-6 text-[var(--color-text-inverse)]" />
          </div>
          <h1 className="text-xl font-black tracking-tighter uppercase italic">
            Command Center <span className="text-[var(--color-brand-primary)]">.Admin</span>
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 rounded-full border border-[var(--color-divider-default)] bg-[var(--color-bg-sub)] px-4 py-1.5">
            <div className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-success)] shadow-[0_0_5px_var(--color-success)]" />
            <span className="text-xs font-medium uppercase tracking-widest text-[var(--color-text-secondary)]">
              System: Operational
            </span>
          </div>
          <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-[var(--color-brand-primary)] bg-[var(--color-gray-200)] p-0.5">
            <div className="h-full w-full rounded-full bg-[var(--color-brand-primary)] mix-blend-multiply opacity-20" />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto overflow-x-hidden p-8 space-y-8 max-w-[1440px] mx-auto w-full">
        {/* Real-time Status Overview */}
        <section>
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-[var(--color-text-tertiary)] text-xs font-bold uppercase tracking-[0.2em] mb-1">
                Status Overview
              </p>
              <h2 className="text-3xl font-black italic">GLOBAL STATS</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Stat Card 1: Total Applicants */}
            <div className="group relative overflow-hidden rounded-2xl border border-[var(--color-divider-default)] bg-[var(--color-bg-sub)] p-6 transition-all hover:border-[var(--color-brand-primary)] hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]">
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="rounded-xl bg-[var(--color-indigo-500)]/10 p-2.5 text-[var(--color-indigo-500)]">
                    <Iconography.Stroke.Users className="h-6 w-6" />
                  </div>
                  <span className="flex items-center text-xs font-bold text-[var(--color-success)]">
                    +12.5% <Iconography.Stroke.Rocket className="ml-1 h-3 w-3" />
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--color-text-secondary)] tracking-tight">
                    전체 지원서 접수
                  </h3>
                  <p className="mt-1 text-4xl font-black tracking-tight tracking-tighter">2,840</p>
                </div>
              </div>
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[var(--color-indigo-500)] opacity-[0.03] blur-3xl transition-all group-hover:opacity-[0.08]" />
            </div>

            {/* Stat Card 2: Evaluation Progress */}
            <div className="group relative overflow-hidden rounded-2xl border border-[var(--color-divider-default)] bg-[var(--color-bg-sub)] p-6 transition-all hover:border-[var(--color-purple-500)] hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]">
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="rounded-xl bg-[var(--color-purple-500)]/10 p-2.5 text-[var(--color-purple-500)]">
                    <Iconography.Stroke.Target className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold text-[var(--color-text-tertiary)]">
                    85% Complete
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--color-text-secondary)] tracking-tight">
                    평가 진행률
                  </h3>
                  <p className="mt-1 text-4xl font-black tracking-tight tracking-tighter">74.2%</p>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-gray-100)]">
                    <div className="h-full w-[74.2%] rounded-full bg-gradient-to-r from-[var(--color-indigo-500)] to-[var(--color-purple-500)] shadow-[0_0_10px_var(--color-purple-500)]" />
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[var(--color-purple-500)] opacity-[0.03] blur-3xl transition-all group-hover:opacity-[0.08]" />
            </div>

            {/* Stat Card 3: Pending Reviews */}
            <div className="group relative overflow-hidden rounded-2xl border border-[var(--color-divider-default)] bg-[var(--color-bg-sub)] p-6 transition-all hover:border-[var(--color-warning)] hover:shadow-[0_0_20px_rgba(234,179,8,0.15)]">
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="rounded-xl bg-[var(--color-warning)]/10 p-2.5 text-[var(--color-warning)]">
                    <Iconography.Stroke.Document className="h-6 w-6" />
                  </div>
                  <div className="flex h-5 w-5 animate-bounce items-center justify-center rounded-full bg-[var(--color-warning)] text-[8px] font-black text-[var(--color-palette-black)]">
                    !
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--color-text-secondary)] tracking-tight">
                    미검토 지원서
                  </h3>
                  <p className="mt-1 text-4xl font-black tracking-tight tracking-tighter">124</p>
                </div>
              </div>
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[var(--color-warning)] opacity-[0.03] blur-3xl transition-all group-hover:opacity-[0.08]" />
            </div>

            {/* Stat Card 4: Final Candidates */}
            <div className="group relative overflow-hidden rounded-2xl border border-[var(--color-divider-default)] bg-[var(--color-bg-sub)] p-6 transition-all hover:border-[var(--color-success)] hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]">
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="rounded-xl bg-[var(--color-success)]/10 p-2.5 text-[var(--color-success)]">
                    <Iconography.Stroke.Graduation className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-[var(--color-success)]/10 px-2 py-0.5 text-[10px] font-bold text-[var(--color-success)]">
                    PASSED
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--color-text-secondary)] tracking-tight">
                    최종 선발 인원
                  </h3>
                  <p className="mt-1 text-4xl font-black tracking-tight tracking-tighter">48/150</p>
                </div>
              </div>
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[var(--color-success)] opacity-[0.03] blur-3xl transition-all group-hover:opacity-[0.08]" />
            </div>
          </div>
        </section>

        {/* Monitoring & Activities Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart - Real-time Traffic (2/3 width) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black italic tracking-tight uppercase">
                Real-time Application Traffic
              </h2>
              <div className="flex gap-2">
                <div className="h-3 w-1 bg-[var(--color-brand-primary)]" />
                <div className="h-3 w-1 bg-[var(--color-brand-primary)] opacity-50" />
                <div className="h-3 w-1 bg-[var(--color-brand-primary)] opacity-20" />
              </div>
            </div>

            <div className="relative h-[400px] w-full overflow-hidden rounded-2xl border border-[var(--color-divider-default)] bg-[var(--color-bg-sub)] p-6">
              {/* Mock Chart Area */}
              <div className="absolute inset-x-0 bottom-0 top-12 px-8 flex items-end justify-between gap-1 opacity-60">
                {[
                  40, 25, 35, 60, 45, 80, 55, 30, 70, 95, 65, 40, 50, 75, 45, 90, 100, 85, 60, 40,
                ].map((h, i) => (
                  <div
                    key={i}
                    className="w-full bg-gradient-to-t from-[var(--color-brand-primary)] to-[var(--color-purple-500)] rounded-t-sm transition-all hover:opacity-100 opacity-40"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              {/* Grid Lines Dekor */}
              <div className="absolute inset-0 z-0 p-6 pointer-events-none opacity-[0.03]">
                <div className="h-full w-full border border-dashed border-[var(--color-text-primary)] grid grid-cols-6 grid-rows-4" />
              </div>

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                  <p className="text-[10px] font-black tracking-widest text-[var(--color-text-tertiary)] uppercase italic">
                    SYSTEM LOG / TRAFFIC_ANALYSE_v1.0.4
                  </p>
                  <div className="text-right">
                    <p className="text-2xl font-black tabular-nums">1.2k</p>
                    <p className="text-[8px] font-bold text-[var(--color-text-tertiary)] uppercase tracking-tighter">
                      Avg. Hourly submissions
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tighter text-[var(--color-text-tertiary)]">
                  <span>00:00</span>
                  <span>04:00</span>
                  <span>08:00</span>
                  <span>12:00</span>
                  <span>16:00</span>
                  <span>20:00</span>
                  <span>23:59</span>
                </div>
              </div>
            </div>
          </div>

          {/* Side Info - Active Recruitment (1/3 width) */}
          <div className="space-y-4">
            <h2 className="text-xl font-black italic tracking-tight uppercase">Active Slots</h2>
            <div className="space-y-3">
              {[
                {
                  title: '2026 동계 개발 인턴십',
                  status: '모집 중',
                  color: 'var(--color-success)',
                  count: '1,240',
                },
                {
                  title: '브랜드 디자인 주니어 공채',
                  status: '모집 종료 D-2',
                  color: 'var(--color-warning)',
                  count: '450',
                },
                {
                  title: '데이터 엔지니어 수시 채용',
                  status: '모집 대기',
                  color: 'var(--color-text-tertiary)',
                  count: '0',
                },
                {
                  title: 'UX 리서처 경력직 채용',
                  status: '평가 진행 중',
                  color: 'var(--color-info)',
                  count: '122',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group cursor-pointer rounded-xl border border-[var(--color-divider-default)] bg-[var(--color-bg-sub)] p-4 transition-all hover:bg-[var(--color-bg-default)] hover:translate-x-1"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-black italic tracking-tight">{item.title}</h4>
                      <div className="mt-1 flex items-center gap-2">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span
                          className="text-[10px] font-bold tracking-tighter uppercase"
                          style={{ color: item.color }}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black italic tabular-nums">{item.count}</p>
                      <p className="text-[8px] font-bold uppercase text-[var(--color-text-tertiary)]">
                        Applicants
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <button className="w-full rounded-xl border-2 border-dashed border-[var(--color-divider-default)] py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-tertiary)] transition-all hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)]">
                + Add New Recruitment Slot
              </button>
            </div>
          </div>
        </div>

        {/* Global Activity Feed */}
        <div className="rounded-2xl border border-[var(--color-divider-default)] bg-[var(--color-gray-900)] p-6 text-[var(--color-gray-100)]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Iconography.Stroke.Flash className="h-5 w-5 text-[var(--color-brand-primary)]" />
              <h3 className="text-lg font-black italic tracking-tight uppercase">
                Live Activity Feed
              </h3>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-tighter text-[var(--color-gray-400)]">
              Real-time sync enabled
            </span>
          </div>

          <div className="space-y-4 font-mono text-[11px]">
            {[
              {
                time: '22:45:12',
                user: 'Admin_A',
                action: 'PASS',
                target: '지_원_자_094번',
                detail: '동계 인턴 지원서 검토 완료',
              },
              {
                time: '22:42:05',
                user: 'System',
                action: 'RECV',
                target: '지_원_자_122번',
                detail: '신규 지원서 접수 감지',
              },
              {
                time: '22:38:59',
                user: 'Evaluator_K',
                action: 'NOTE',
                target: '지_원_자_015번',
                detail: '1차 인터뷰 코멘트 추가',
              },
              {
                time: '22:30:11',
                user: 'System',
                action: 'STAT',
                target: 'System_Report',
                detail: '데이터 엔지니어 공고 상태 "모집 대기"로 전환',
              },
            ].map((log, i) => (
              <div
                key={i}
                className="flex gap-4 opacity-80 border-b border-[var(--color-gray-800)] pb-3 last:border-0 last:pb-0"
              >
                <span className="text-[var(--color-brand-primary)] whitespace-nowrap">
                  [{log.time}]
                </span>
                <span className="text-[var(--color-purple-400)] font-bold whitespace-nowrap italic">
                  {log.user}
                </span>
                <span className="text-[var(--color-text-inverse)] bg-[var(--color-brand-primary)] px-1 font-black leading-none flex items-center">
                  {log.action}
                </span>
                <span className="font-bold flex-1">
                  <span className="text-[var(--color-success)]">{log.target}</span> : {log.detail}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <div className="flex h-1 gap-1">
              <div className="w-16 h-full bg-[var(--color-brand-primary)] rounded-full animate-pulse" />
              <div className="w-4 h-full bg-[var(--color-indigo-500)] rounded-full" />
              <div className="w-4 h-full bg-[var(--color-indigo-500)] rounded-full" />
            </div>
          </div>
        </div>
      </main>

      {/* Decorative Bottom Bar */}
      <footer className="h-2 bg-gradient-to-r from-[var(--color-brand-primary)] via-[var(--color-purple-500)] to-[var(--color-success)] shadow-[0_-5px_15px_rgba(99,102,241,0.3)]" />
    </div>
  );
};

export default DashboardPage;
