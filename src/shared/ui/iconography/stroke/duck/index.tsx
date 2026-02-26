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
      <path d="M8 8a4 4 0 118 0c0 2-1.5 3-3 4v2" />
      <circle cx="10" cy="7" r="0.5" fill="currentColor" stroke="none" />
      <path d="M5 12c-1 0-2 1-2 2s1 2 3 2h12c2 0 3-1 3-2s-1-2-2-2" />
      <path d="M6 16c0 2 2 4 6 4s6-2 6-4" />
      <path d="M5 10l-2 1" />
    </svg>
  );
};

export default Duck;
