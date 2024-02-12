import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";

import Header from "~/components/ui/header/header";
import { Sidebar } from "../components/ui/sidebar";

import styles from "./styles.css?inline";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  useStyles$(styles);

  return (
    <>
      <Header />
      <main
        class={`
                h-[100%] overflow-auto pb-[33px] pl-[24px]
                pr-[24px] pt-[33px] 
                scrollbar-hide xl:pl-[104px]
            `}
      >
        <Sidebar />
        <Slot />
      </main>
    </>
  );
});

export const head: DocumentHead = {
  title: "CineMax - your online cinema",
  meta: [
    {
      name: "description",
      content:
        "CineMax movie streaming web app. You can watch all your favorite movie and tv show, also check new trending video content-list.",
    },
  ],
};
