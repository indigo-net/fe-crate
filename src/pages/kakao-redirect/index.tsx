import useKakaoRedirectPageController from './hook';

const KakaoRedirectPage = () => {
  useKakaoRedirectPageController();

  return (
    <div className="bg-bg-default w-full h-[100dvh] flex justify-center items-center">
      <span className="text-text-primary text-base font-medium">...</span>
    </div>
  );
};

export default KakaoRedirectPage;
