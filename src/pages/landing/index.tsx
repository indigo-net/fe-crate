const LandingPage = () => {
  return (
    <div className="w-full h-[100dvh] overflow-y-auto flex flex-col">
      <header className="w-full p-[24px] h-fit bg-default flex justify-between items-center border-b border-b-divider-default">
        <div className="flex items-center gap-[12px]">
          {/** 👇 TODO: Icon 컴포넌트로 대체 (서비스 로고) */}
          <div className="bg-brand-primary w-10 h-10 color-white rounded-[12px] flex justify-center items-center overflow-hidden">
            i
          </div>
          <strong className="color-text-primary cursor-default">CRATE</strong>
        </div>
        {/** 👇 TODO: Button 컴포넌트로 대체 */}
        <button className="py-[8px] px-[16px] text-brand-primary rounded-[8px] hover:bg-brand-primary/10">
          대시보드
        </button>
      </header>

      <main className="m-0 p-0 w-full flex flex-col bg-transparent">
        <div className="w-full h-fit bg-bg-sub flex flex-col gap-[32px] justify-center items-center py-[80px]">
          <h1 className="text-text-primary text-[24px] font-bold text-center">
            지원서 평가, 이제 한 곳에서!
          </h1>
          <h2 className="text-text-secondary text-[20px] whitespace-pre-line text-center">
            {'양식 제작부터 지원 접수, 평가, 선발까지\n모집 과정의 모든 것을 효율적으로 관리하세요'}
          </h2>
          <div className="w-full flex justify-center items-center gap-[24px]">
            {/** 👇 TODO: Button 컴포넌트로 대체 */}
            <button className="border-none rounded-[8px] w-fit min-w-[180px] flex items-center justify-center gap-[8px] py-[12px] px-[32px] bg-brand-primary color-white hover:bg-brand-primary/90">
              {/** 👇 TODO: Icon 컴포넌트로 대체 */}
              <span>I</span>
              <span>양식 만들기</span>
            </button>
            {/** 👇 TODO: Button 컴포넌트로 대체 */}
            <button className="border-[0.5px] border-border-sub rounded-[8px] w-fit min-w-[180px] flex items-center justify-center gap-[8px] py-[12px] px-[32px] bg-transparent color-text-tertiary hover:bg-gray-100/90">
              {/** 👇 TODO: Icon 컴포넌트로 대체 */}
              <span>I</span>
              <span>대시보드 만들기</span>
            </button>
          </div>
        </div>

        <div className="py-[80px] w-full h-fit flex items-center justify-center">
          <div className="px-[24px] grid w-full max-w-[1200px] grid-cols-1 desktop:grid-cols-3 justify-center items-center gap-[20px]">
            <a
              href="/"
              className="rounded-[16px] border border-border-sub py-[16px] px-[12px] w-full flex flex-col gap-[16px] hover:border-brand-primary transition-border-colors duration-[200ms]"
            >
              <div className="flex items-center gap-[8px]">
                <span className="w-[48px] min-w-[48px] aspect-square flex items-center justify-center rounded-[18px] bg-indigo-300/90 text-indigo-600">
                  I
                </span>
                <strong className="text-text-primary text-[18px] font-bold whitespace-nowrap">
                  간편한 양식 제작
                </strong>
              </div>
              <p className="desktop:h-[80px] h-fit text-left text-text-tertiary text-[16px] break-keep">
                드래그 앤 드롭으로 원하는 질문을 자유롭게 구성하고 맞춤형 지원서를 만드세요.
              </p>
            </a>

            <a
              href="/"
              className="rounded-[16px] border border-border-sub py-[16px] px-[12px] w-full flex flex-col gap-[16px] hover:border-brand-primary transition-border-colors duration-[200ms]"
            >
              <div className="flex items-center gap-[8px]">
                <span className="w-[48px] min-w-[48px] aspect-square flex items-center justify-center rounded-[18px] bg-purple-300/90 text-purple-600">
                  I
                </span>
                <strong className="text-text-primary text-[18px] font-bold whitespace-nowrap">
                  실시간 평가 시스템
                </strong>
              </div>
              <p className="desktop:h-[80px] h-fit text-left text-text-tertiary text-[16px] break-keep">
                여러 평가자가 동시에 지원서를 검토하고 점수를 부여할 수 있습니다.
              </p>
            </a>

            <a
              href="/"
              className="rounded-[16px] border border-border-sub py-[16px] px-[12px] w-full flex flex-col gap-[16px] hover:border-brand-primary transition-border-colors duration-[200ms]"
            >
              <div className="flex items-center gap-[8px]">
                <span className="w-[48px] min-w-[48px] aspect-square flex items-center justify-center rounded-[18px] bg-green-300/90 text-green-600">
                  I
                </span>
                <strong className="text-text-primary text-[18px] font-bold whitespace-nowrap">
                  효율적인 선발 과정
                </strong>
              </div>
              <p className="desktop:h-[80px] h-fit text-left text-text-tertiary text-[16px] break-keep">
                평가 결과를 한눈에 확인하고 합격자를 빠르게 선정하세요.
              </p>
            </a>
          </div>
        </div>
      </main>

      <footer className="w-full h-fit p-[48px] mt-auto flex justify-center items-center bg-bg-default border-t border-t-divider-default">
        <small className="text-text-secondary">
          © 2025 indigo-net. CRATE by indigo-net. All rights reserved.
        </small>
      </footer>
    </div>
  );
};

export default LandingPage;
