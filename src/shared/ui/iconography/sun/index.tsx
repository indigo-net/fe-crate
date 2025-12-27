import type { SVGProps } from 'react';

const Sun = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'sun',
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
      <circle cx={12} cy={12} r={5} stroke="currentColor" strokeWidth={1.125} />
      <line
        x1={12}
        y1={0.5}
        x2={12}
        y2={3.5}
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
      />
      <line
        x1={12}
        y1={20.5}
        x2={12}
        y2={23.5}
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
      />
      <line
        x1={0.5}
        y1={12}
        x2={3.5}
        y2={12}
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
      />
      <line
        x1={20.5}
        y1={12}
        x2={23.5}
        y2={12}
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
      />
      <line
        x1={4.2}
        y1={4.2}
        x2={6.3}
        y2={6.3}
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
      />
      <line
        x1={17.7}
        y1={17.7}
        x2={19.8}
        y2={19.8}
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
      />
      <line
        x1={17.7}
        y1={6.3}
        x2={19.8}
        y2={4.2}
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
      />
      <line
        x1={4.2}
        y1={19.8}
        x2={6.3}
        y2={17.7}
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Sun;
