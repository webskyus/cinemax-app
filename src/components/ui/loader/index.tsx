import { component$ } from "@builder.io/qwik";
import { LoadingIcon } from "~/components/icons/loading-icon";

export const Loader = component$((props: { isVisible: boolean }) => {
  const { isVisible } = props;

  return (
    <>
      {isVisible ? (
        <article class={`absolute z-10 flex h-[100%] w-[100%] justify-center`}>
          <LoadingIcon class={`mr-[96px] mt-[96px]`} width={200} height={200} />
        </article>
      ) : (
        ""
      )}
    </>
  );
});
