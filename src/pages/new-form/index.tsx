const NewFormPage = () => {
  return (
    <div className="w-full h-[100dvh] overflow-y-auto flex flex-col">
      <header className="fixed top-0 left-0 right-0 px-[32px] py-[16px] flex justify-center items-center bg-default border-b border-b-divider-default">
        <div className="mx-auto w-full max-w-[1200px] flex justify-between items-center">
          {/** 👇 TODO: Button 컴포넌트로 대체 */}
          <button className="rounded-[8px] w-fit flex items-center justify-center gap-[8px] py-[8px] px-[16px] bg-transparent color-text-tertiary hover:bg-gray-100/90 text-text-primary text-[16px]">
            {/** 👇 TODO: Icon 컴포넌트로 대체 */}
            <span>I</span>
            <span>돌아가기</span>
          </button>

          <div className="flex items-center gap-[12px]">
            <button className="border-border-sub rounded-[8px] w-fit flex items-center justify-center gap-[8px] py-[8px] px-[16px] bg-transparent color-text-tertiary hover:bg-gray-100/90">
              초기화
            </button>
            {/** 👇 TODO: Button 컴포넌트로 대체 */}
            <button className="border-none rounded-[8px] w-fit flex items-center justify-center gap-[8px] py-[8px] px-[16px] bg-brand-primary color-white hover:bg-brand-primary/90">
              {/** 👇 TODO: Icon 컴포넌트로 대체 */}
              <span>I</span>
              <span>저장 및 게시</span>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default NewFormPage;
