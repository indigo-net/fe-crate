import type { SVGProps } from 'react';

const StreetLamp = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'streetlamp',
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
      <path d="M12 22v-8" />
      <path d="M9 22h6" />
      <path d="M12 14V6" />
      <path d="M7 6h10l-2 8H9L7 6z" />
      <path d="M10 3h4v3h-4z" />
    </svg>
  );
};

export default StreetLamp;
