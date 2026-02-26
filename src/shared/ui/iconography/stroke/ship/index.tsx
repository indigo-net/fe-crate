import type { SVGProps } from 'react';

const Ship = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'ship',
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
      <path d="M2 20l2-2h16l2 2" />
      <path d="M4 18l-1-6h18l-1 6" />
      <path d="M12 12V4" />
      <path d="M8 8l4-4 4 4" />
      <path d="M7 12h10" />
    </svg>
  );
};

export default Ship;
