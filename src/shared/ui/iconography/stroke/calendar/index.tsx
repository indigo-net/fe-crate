import type { SVGProps } from 'react';

const Calendar = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'calendar',
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
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </svg>
  );
};

export default Calendar;
