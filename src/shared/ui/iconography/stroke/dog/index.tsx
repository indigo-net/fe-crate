import type { SVGProps } from 'react';

const Dog = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'dog',
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
      <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1.724 1.623.002 3.844-.408 3.844-2.724V5.172z" />
      <path d="M14 5.172C14 3.782 15.577 2.679 17.5 3c2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1.724-1.623.002-3.844-.408-3.844-2.724V5.172z" />
      <circle cx="9" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="1" fill="currentColor" stroke="none" />
      <path d="M8 16c0 1 1 2 4 2s4-1 4-2" />
      <path d="M9 10a5 5 0 016 0" />
      <path d="M12 10v3" />
      <ellipse cx="12" cy="14" rx="2" ry="1.5" />
      <path d="M7 18c-1 1-2 3-2 4h14c0-1-1-3-2-4" />
    </svg>
  );
};

export default Dog;
