import type { SVGProps } from 'react';

const Flag = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'flag',
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
      aria-hidden={ariaHidden}
    >
      {!ariaHidden && <title>{ariaLabel}</title>}
      <path
        d="M5 3v18M5 4l15 5-15 5V4z"
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Flag;
