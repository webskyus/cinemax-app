import { component$ } from "@builder.io/qwik";
import { ContentList } from "~/components/content-list";
import { CATEGORY } from "~/components/ui/label";
import { HeadBanner } from "~/components/head-banner";

export default component$(() => {
  return (
    <section class={"pb-[96px] text-white"}>
      {/*POPULAR TV BANNER*/}
      <HeadBanner type={CATEGORY.TV_SHOW} />

      {/*MOVIE*/}
      <ContentList type={CATEGORY.POPULAR_MOVIE} page={1} />

      {/*TV SHOW*/}
      <ContentList type={CATEGORY.POPULAR_TV_SHOW} page={1} />

      {/*PEOPLE*/}
      <ContentList type={CATEGORY.POPULAR_PEOPLE} />
    </section>
  );
});
