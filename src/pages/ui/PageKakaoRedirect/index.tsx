import { memo } from 'react';

import usePageKakaoRedirectController from './hook';

const PageKakaoRedirect = memo(() => {
  usePageKakaoRedirectController();

  return (
    <div className="bg-bg-default w-full h-[100dvh] flex justify-center items-center">
      <span className="text-text-primary text-base font-medium">...</span>
    </div>
  );
});

PageKakaoRedirect.displayName = 'PageKakaoRedirect';

export default PageKakaoRedirect;
