import { component$ } from "@builder.io/qwik";

interface Props {
  width?: number;
  height?: number;
  class?: string;
}

export const ComingSoonIcon = component$(
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
        <polygon points="13 19 22 12 13 5 13 19" />
        <polygon points="2 19 11 12 2 5 2 19" />
      </svg>
    );
  },
);
