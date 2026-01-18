import type { SVGProps } from 'react';

const Rocket = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'rocket',
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
      <g transform="rotate(45 12 12)">
        <path
          d="M12 2C15.5 4 18 7.5 18 11.5V14.5C18 16 16.5 17.5 15 17.5H9C7.5 17.5 6 16 6 14.5V11.5C6 7.5 8.5 4 12 2Z"
          stroke="currentColor"
          strokeWidth={1.125}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle cx="12" cy="9" r="1.75" stroke="currentColor" strokeWidth={1.125} />

        <path
          d="M6 12L3.5 15V11L6 10"
          stroke="currentColor"
          strokeWidth={1.125}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 12L20.5 15V11L18 10"
          stroke="currentColor"
          strokeWidth={1.125}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M12 17.5
             C11.5 18.2 10.8 19.2 10.6 20.3
             C10.4 21.3 11.1 22.1 12 22.6
             C12.9 22.1 13.6 21.3 13.4 20.3
             C13.2 19.2 12.5 18.2 12 17.5Z"
          stroke="currentColor"
          strokeWidth={1.125}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
};

export default Rocket;
