import type { SVGProps } from 'react';

const KakaoTalk = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'kakaotalk',
    'aria-hidden': ariaHidden = false,
  } = props;

  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
    >
      {!ariaHidden && <title>{ariaLabel}</title>}
      <path d="M4 11.2C4 7.78 7.58 5 12 5C16.42 5 20 7.78 20 11.2C20 14.62 16.42 17.4 12 17.4C11.19 17.4 10.4 17.31 9.66 17.15L6 19L6.78 15.93C5.05 14.95 4 13.18 4 11.2Z" />
    </svg>
  );
};

export default KakaoTalk;
