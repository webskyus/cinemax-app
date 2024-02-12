import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { CATEGORY, Label } from "../ui/label";
import { PlayIcon } from "~/components/icons/play-icon";
import { Button } from "~/components/ui/button";
import { Loader } from "~/components/ui/loader";
import { ErrorMessage } from "~/components/ui/error-message";
import { Link, useLocation } from "@builder.io/qwik-city";
import { CONTENT_TYPE } from "~/components/content-list";
import type { Movie, TV } from "~/api/models";
import { API } from "~/api";
import { getContentWithGenresParam } from "~/utils";

interface HeadBannerProps {
  type: CATEGORY.MOVIE | CATEGORY.TV_SHOW;
}

export const HeadBanner = component$((props: HeadBannerProps) => {
  const { prevUrl } = useLocation();
  const { type } = props;
  const apiRequestUrl = CONTENT_TYPE[type].API_URL;
  const pageUrl = CONTENT_TYPE[type].PAGE_URL;
  const random = Math.floor(Math.random() * (10 - 1)) + 1;

  const singleContentItem = useResource$(async () => {
    const genre = getContentWithGenresParam(prevUrl);
    const res = await fetch(
      `${API.URL}/${apiRequestUrl}?${genre}`,
      API.OPTIONS,
    );
    const json = await res.json();

    return json.results[random] as TV | Movie;
  });

  return (
    <section class={`relative min-h-[500px]`}>
      <Resource
        value={singleContentItem}
        onResolved={(content) => {
          const title =
            type === CATEGORY.TV_SHOW ? (content as TV).name : content.title;

          return (
            <section
              style={{
                background: `var(--color-alerts-error) url(${API.CONFIGURE_IMAGES_URL("original")}/${content.backdrop_path}) no-repeat top/cover`,
              }}
              class={`
                                                bg -z-1 relative
                                                flex min-h-[500px] w-[100%] flex-col
                                                overflow-hidden rounded-[6px] bg-label-gradient bg-cover
                                                bg-center bg-no-repeat
                                                
                                                p-[24px] after:absolute after:bottom-[0] after:left-[0] after:right-[0] after:top-[0] after:bg-grayscale-100 after:opacity-70
                                                
                                              
                                                [@media(min-width:2100px)]:h-[600px]
                                                [@media(min-width:2200px)]:h-[800px]
                                `}
            >
              <article
                class={`
                                            z-10 mb-[12px] mt-auto
                                            pr-[12px]
                             `}
              >
                <Label type={CONTENT_TYPE[type].TITLE} />
                <h1
                  class={"text-h2-xs mb-[12px] mt-auto font-bold sm:text-h2-lg"}
                >
                  {title}
                </h1>
                <p class={"text-h6-xs mb-[4px] mt-auto sm:text-h6-md"}>
                  {content.overview}
                </p>
              </article>

              <nav class={`relative z-10 flex items-center`}>
                <Link href={`${pageUrl}/${content.id}`}>
                  <Button>
                    <PlayIcon width={20} height={20} class={`mr-[12px]`} />
                    Watch
                  </Button>
                </Link>
              </nav>
            </section>
          );
        }}
        onPending={() => <Loader isVisible={true} />}
        onRejected={() => <ErrorMessage isVisible={true} />}
      />
    </section>
  );
});
