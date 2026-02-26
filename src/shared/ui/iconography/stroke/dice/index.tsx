import type { SVGProps } from 'react';

const Dice = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'dice',
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
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="8.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="15.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="15.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
};

export default Dice;
