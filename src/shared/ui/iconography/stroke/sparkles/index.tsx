import type { SVGProps } from 'react';

const Sparkles = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'sparkles',
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
      <path d="m12 3 1.912 5.886L20 10.8l-5.888 1.914L12 18.6l-1.912-5.886L4.2 10.8l5.888-1.914z" />
      <path d="m19 19 1.5-1.5L22 19l-1.5 1.5z" />
      <path d="m5 5 1.5-1.5L8 5 6.5 6.5z" />
    </svg>
  );
};

export default Sparkles;
