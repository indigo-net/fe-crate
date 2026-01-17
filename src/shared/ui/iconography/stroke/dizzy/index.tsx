import type { SVGProps } from 'react';

const Dizzy = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'dizzy',
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
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {!ariaHidden && <title>{ariaLabel}</title>}
      <circle cx="12" cy="12" r="10" />
      <path d="M8 9h.01" />
      <path d="M16 9h.01" />
      <path d="M10 15c.5-1 1-1.5 2-1.5s1.5.5 2 1.5" />
      <path d="M8 9.01V9" />
      <path d="M16 9.01V9" />
      <path d="M12 12c-2 0-3.5 1-4 2.5" />
      <path d="M12 12c2 0 3.5 1 4 2.5" />
    </svg>
  );
};

export default Dizzy;
