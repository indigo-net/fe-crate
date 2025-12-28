import { memo } from 'react';

const Kakao = () => {
  return (
    <a
      role="button"
      href={`https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`}
      aria-label="카카오 로그인"
      className="flex items-center justify-center gap-[12px] bg-[#FEE500] text-[rgba(0,0,0,0.85)] text-base p-[12px] rounded-[12px] hover:bg-[#FDD835] active:bg-[#FBC02D] transition-colors duration-200 w-fit"
    >
      <span>카카오 로그인</span>
    </a>
  );
};

export default memo(Kakao);
