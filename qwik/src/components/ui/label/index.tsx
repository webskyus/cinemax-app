import { component$ } from "@builder.io/qwik";

interface Props {
  type: string;
}

export const Label = component$((props: Props) => {
  const { type } = props;

  return (
    <article
      class={`
        mb-[12px] inline-block
        font-semibold
    `}
    >
      {type}
    </article>
  );
});
