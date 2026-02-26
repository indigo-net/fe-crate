import type { SVGProps } from 'react';

const Clock = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'clock',
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
};

export default Clock;
