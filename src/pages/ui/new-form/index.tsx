import { Link } from 'react-router-dom';

import {
  QuestionList,
  QuestionAddSection,
  FormSignatureEditSection,
} from '@/features/edit-form/ui';
import { DarkModeButton } from '@/features/toggle-theme/ui';
import { Iconography } from '@/shared/ui';

import useNewFormPageController from './hook';

const NewFormPage = () => {
  const { listRef } = useNewFormPageController();

  return (
    <div className="w-full h-[100dvh] flex flex-col bg-bg-base text-text-primary">
      <header className="w-full px-6 py-4 flex justify-between items-center bg-bg-base border-b border-border-default sticky top-0 z-50">
        <div className="mx-auto w-full max-w-6xl flex justify-between items-center">
          <Link
            to="/dashboard"
            className="group px-4 py-2 flex items-center gap-2 text-text-secondary hover:text-text-primary rounded-slim-lg hover:bg-bg-subtle transition-all font-slim-semibold"
          >
            <Iconography.Stroke.Monitor className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>대시보드로 돌아가기</span>
          </Link>

          <div className="flex items-center gap-4">
            <DarkModeButton />
            <div className="h-4 w-px bg-border-default mx-1" />
            <button className="px-5 py-2.5 text-sm font-slim-semibold text-text-secondary hover:text-text-primary rounded-slim-lg hover:bg-bg-subtle border border-transparent hover:border-border-default transition-all flex items-center gap-2">
              <Iconography.Stroke.Trash className="w-4 h-4" />
              <span>초기화</span>
            </button>
            <button className="px-6 py-2.5 bg-brand-primary text-text-inverse font-slim-bold text-sm rounded-slim-lg shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
              <Iconography.Stroke.Rocket className="w-5 h-5" />
              <span>저장 및 게시하기</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-bg-subtle/50">
        <div className="max-w-4xl mx-auto py-12 px-6 flex flex-col gap-8">
          <div
            ref={listRef}
            className="flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            <FormSignatureEditSection />
            <QuestionList />
            <QuestionAddSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewFormPage;
