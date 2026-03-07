import { memo } from 'react';

import DateStandard from '@/shared/lib/date-standard';

import { Iconography } from '@/shared/ui';

import useActivityFeedSectionController from './hook';

import type { ActivityType } from '@/entities/activity/types';


const formatTime = (createdAt: string): string => {
  const date = DateStandard.fromISO(createdAt);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

const LogIcon = ({ type }: { type: ActivityType }) => {
  if (type === 'PASS') {
    return <Iconography.Stroke.Graduation className="w-4 h-4 text-neon-green-500" />;
  }
  if (type === 'RECV') {
    return <Iconography.Stroke.Flash className="w-4 h-4 text-brand-primary" />;
  }
  if (type === 'NOTE') {
    return <Iconography.Stroke.Document className="w-4 h-4 text-neon-violet-500" />;
  }
  return <Iconography.Stroke.Target className="w-4 h-4 text-neon-pink-500" />;
};

const ActivityFeedSection = memo(() => {
  const { activities } = useActivityFeedSectionController();

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-xl font-slim-bold flex items-center gap-2">
        <Iconography.Stroke.Flash className="w-5 h-5 text-brand-primary" />
        최근 활동
      </h2>
      <div className="flex-1 bg-bg-base border border-border-default rounded-slim-2xl shadow-sm overflow-hidden flex flex-col">
        <header className="p-4 bg-bg-subtle border-b border-border-default flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-green-500 animate-pulse" />
          <span className="text-xs font-slim-bold text-text-secondary">
            최근 업데이트: 오늘 23:45
          </span>
        </header>
        <div className="divide-y divide-border-subtle overflow-y-auto max-h-[480px]">
          {activities.map(activity => (
            <article
              key={activity.id}
              className="p-4 hover:bg-bg-subtle transition-colors flex gap-3"
            >
              <div className="w-8 h-8 rounded-slim-lg bg-bg-subtle flex items-center justify-center shrink-0">
                <LogIcon type={activity.type} />
              </div>
              <div className="space-y-1">
                <p className="text-[13px] leading-snug">
                  <span className="font-slim-bold text-text-primary">{activity.user}</span>
                  <span className="text-text-secondary mx-1">{activity.action}:</span>
                  <span className="font-slim-semibold text-brand-primary">{activity.target}</span>
                </p>
                <time className="block text-[11px] text-text-tertiary">
                  {formatTime(activity.createdAt)}
                </time>
              </div>
            </article>
          ))}
        </div>
        <button className="w-full p-4 text-xs font-slim-bold text-text-secondary hover:text-brand-primary border-t border-border-default bg-bg-subtle/30 transition-colors">
          전체 로그 보기
        </button>
      </div>
    </section>
  );
});

ActivityFeedSection.displayName = 'ActivityFeedSection';

export default ActivityFeedSection;
