import type { SVGProps } from 'react';

const Balance = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'balance',
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

      <path d="M12 3V21" stroke="currentColor" strokeWidth={1.125} strokeLinecap="round" />
      <path d="M8 21H16" stroke="currentColor" strokeWidth={1.125} strokeLinecap="round" />
      <path d="M3 6H21" stroke="currentColor" strokeWidth={1.125} strokeLinecap="round" />

      <path d="M6 6L2.5 12" stroke="currentColor" strokeWidth={1.125} strokeLinecap="round" />
      <path d="M6 6L9.5 12" stroke="currentColor" strokeWidth={1.125} strokeLinecap="round" />
      <path d="M18 6L14.5 12" stroke="currentColor" strokeWidth={1.125} strokeLinecap="round" />
      <path d="M18 6L21.5 12" stroke="currentColor" strokeWidth={1.125} strokeLinecap="round" />

      <path d="M3.5 12H8.5" stroke="currentColor" strokeWidth={1.125} strokeLinecap="round" />
      <path d="M15.5 12H20.5" stroke="currentColor" strokeWidth={1.125} strokeLinecap="round" />
    </svg>
  );
};

export default Balance;
