import { component$ } from "@builder.io/qwik";

interface Props {
  width?: number;
  height?: number;
  class?: string;
}

export const StarIcon = component$(
  ({ width = 24, height = 24, class: className = "" }: Props) => {
    return (
      <svg
        width={width}
        height={height}
        class={className}
        viewBox="0 0 500 500"
        style="color:#B43FEB"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="512"
          height="512"
          x="0"
          y="0"
          rx="41"
          fill="transparent"
          stroke="#B43FEB"
          stroke-width="0"
          stroke-opacity="100%"
          paint-order="stroke"
        ></rect>
        <svg
          width="512px"
          height="512px"
          viewBox="0 0 48 48"
          fill="#E4AB00"
          x="0"
          y="0"
          role="img"
          style="display:inline-block;vertical-align:middle"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="#B43FEB">
            <path
              fill="currentColor"
              d="M21.803 6.085c.899-1.82 3.495-1.82 4.394 0l4.852 9.832l10.85 1.577c2.01.292 2.813 2.762 1.358 4.179l-7.85 7.653l1.853 10.806c.343 2.002-1.758 3.528-3.555 2.583L24 37.613l-9.705 5.102c-1.797.945-3.898-.581-3.555-2.583l1.854-10.806l-7.851-7.653c-1.455-1.417-.652-3.887 1.357-4.179l10.85-1.577l4.853-9.832Z"
            />
          </g>
        </svg>
      </svg>
    );
  },
);
