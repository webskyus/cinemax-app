import { component$ } from "@builder.io/qwik";
import { HeadBanner } from "~/components/head-banner";
import { ContentList } from "~/components/content-list";
import { CATEGORY } from "~/components/ui/header";
import { ContentGenres } from "~/components/content-genres";

export default component$(() => {
  return (
    <section class={"pb-[96px] text-white"}>
      {/*POPULAR TV BANNER*/}
      <HeadBanner type={CATEGORY.TV_SHOW} />

      {/*GENRES*/}
      <ContentGenres type={CATEGORY.GENRES_MOVIE} />

      {/*MOVIE*/}
      <ContentList type={CATEGORY.MOVIE} page={2} />

      {/*GENRES*/}
      <ContentGenres type={CATEGORY.GENRES_TV_SHOW} />

      {/*TV SHOW*/}
      <ContentList type={CATEGORY.TV_SHOW} />

      {/*PEOPLE*/}
      <ContentList type={CATEGORY.PEOPLE} />
    </section>
  );
});
