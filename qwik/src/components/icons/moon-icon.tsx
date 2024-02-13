import { component$ } from "@builder.io/qwik";

interface Props {
  width?: number;
  height?: number;
  class?: string;
}

export const MoonIcon = component$(
  ({ width = 24, height = 24, class: className = "" }: Props) => {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        class={className}
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    );
  },
);