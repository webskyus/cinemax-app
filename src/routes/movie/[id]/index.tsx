import { component$ } from "@builder.io/qwik";
import { ContentView } from "~/components/content-view";
import { CATEGORY } from "~/components/ui/header";

export default component$(() => {
  return <ContentView type={CATEGORY.MOVIE} />;
});
