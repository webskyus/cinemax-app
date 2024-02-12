import { component$ } from "@builder.io/qwik";

export const EmptyMessage = component$(() => {
  return (
    <p
      class={`text-h6-sm font-bold text-grayscale-100 dark:text-grayscale-10 sm:text-h6-lg`}
    >
      Not found...
    </p>
  );
});
