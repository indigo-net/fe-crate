import type { SVGProps } from 'react';

const Trash = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'trash',
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
        d="M3 6H21"
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 6V4H16V6"
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L7 20H17L18 6"
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 10V17M14 10V17"
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Trash;
