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
      {/* 선체 */}
      <path d="M3 17l2 3h14l2-3H3z" />
      {/* 돛대 */}
      <path d="M12 17V4" />
      {/* 왼쪽 돛 */}
      <path d="M12 5L6 14h6" />
      {/* 오른쪽 돛 */}
      <path d="M12 7l5 7h-5" />
      {/* 깃발 */}
      <path d="M12 4l3 1.5L12 7" />
      {/* 물결 */}
      <path d="M2 21c2-1 4 1 6 0s4 1 6 0 4 1 6 0" />
    </svg>
  );
};

export default Ship;
