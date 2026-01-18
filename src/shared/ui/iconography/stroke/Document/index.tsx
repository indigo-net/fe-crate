import type { SVGProps } from 'react';

const Document = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'document',
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
        d="M7 3.75H14L18.25 8V20.25H7V3.75Z"
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinejoin="round"
      />
      <path d="M14 3.75V8H18.25" stroke="currentColor" strokeWidth={1.125} strokeLinejoin="round" />
      <path
        d="M9.5 12H15.5M9.5 15.5H15.5"
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Document;
