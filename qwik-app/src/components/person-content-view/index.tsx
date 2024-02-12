import { component$ } from "@builder.io/qwik";
import { PersonContentViewHead } from "~/components/person-content-view/components/content-view-head";
import { CombinedContentList } from "~/components/person-content-view/components/combined-content-list";

export const PersonContentView = component$(() => {
  return (
    <section class={`container mx-auto pb-[96px]`}>
      {/*PERSON INFO BANNER*/}
      <PersonContentViewHead />

      {/*COMBINED CREDITS LIST*/}
      <CombinedContentList />
    </section>
  );
});
