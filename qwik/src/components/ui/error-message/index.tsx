import { component$ } from "@builder.io/qwik";

export const ErrorMessage = component$((props: { isVisible: boolean }) => {
  const { isVisible } = props;

  return (
    <>
      {isVisible ? (
        <p class={`text-h6-sm font-bold text-alerts-error sm:text-h6-lg`}>
          Something went wrong...
        </p>
      ) : (
        ""
      )}
    </>
  );
});
