import type { SVGProps } from 'react';

const Duck = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'duck',
    'aria-hidden': ariaHidden = false,
  } = props;

  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
    >
      {!ariaHidden && <title>{ariaLabel}</title>}
      {/* 머리 */}
      <circle cx="7" cy="8" r="3" />
      {/* 눈 */}
      <circle cx="6" cy="7.5" r="0.5" fill="currentColor" stroke="none" />
      {/* 부리 */}
      <path d="M4 9.5l-2 0.5 2 1" />
      {/* 몸통 */}
      <ellipse cx="14" cy="13" rx="6" ry="4" />
      {/* 목 연결 */}
      <path d="M9 10c1 1 2 2 4 3" />
      {/* 꼬리 */}
      <path d="M19 11l2-2" />
      {/* 물결 */}
      <path d="M3 19c2-1 4 1 6 0s4 1 6 0 4 1 6 0" />
    </svg>
  );
};

export default Duck;
