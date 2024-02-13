import { component$ } from "@builder.io/qwik";
import { ContentViewHead } from "~/components/content-view/components/content-view-head";
import type { CATEGORY } from "~/components/ui/label";
import { RecommendedContentList } from "~/components/content-view/components/recommended-content-list";
import { CreditList } from "~/components/content-view/components/credit-list";
import { SimilarContentList } from "~/components/content-view/components/similar-content-list";

interface ContentViewProps {
  type: CATEGORY.MOVIE | CATEGORY.TV_SHOW;
}

export const ContentView = component$((props: ContentViewProps) => {
  const { type } = props;

  return (
    <section class={`container mx-auto pb-[96px]`}>
      {/*MOVIE INFO BANNER*/}
      <ContentViewHead type={type} />

      {/*CAST LIST*/}
      <CreditList type={type} />

      {/*RECOMMENDATIONS*/}
      <RecommendedContentList type={type} />

      {/*Similar*/}
      <SimilarContentList type={type} />
    </section>
  );
});
