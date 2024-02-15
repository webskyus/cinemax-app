import {
  $,
  component$,
  Resource,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import type { ImageTransformerProps } from "qwik-image";
import { Image, useImageProvider } from "qwik-image";
import { Button, BUTTON_TYPE } from "~/components/ui/button";
import { StarIcon } from "~/components/icons/star-icon";
import { PlaySolidIcon } from "~/components/icons/play-solid-icon";
import { CATEGORY } from "~/components/ui/header";
import { Loader } from "~/components/ui/loader";
import { ErrorMessage } from "~/components/ui/error-message";
import errorPlaceholder from "/public/img/error-placeholder.svg?url";
import { convertMinutes, formatterForBudget } from "~/utils";
import { VoteCountIcon } from "~/components/icons/vote-count-icon";
import { Modal } from "~/components/ui/modal";
import { API, API_REQUEST_URLS } from "~/api";
import type { Movie, TV } from "~/api/models";
import { useLocation } from "@builder.io/qwik-city";

type ContentViewType = CATEGORY.TV_SHOW | CATEGORY.MOVIE;

interface ContentViewHeadProps {
  type: ContentViewType;
}

const CONTENT_VIEW_TYPE: Record<ContentViewType, API_REQUEST_URLS> = {
  [CATEGORY.MOVIE]: API_REQUEST_URLS.MOVIE_DETAILS,
  [CATEGORY.TV_SHOW]: API_REQUEST_URLS.TV_SHOW_DETAILS,
};

export const ContentViewHead = component$((props: ContentViewHeadProps) => {
  const { params } = useLocation();
  const isModalVisibility = useSignal(false);
  const videoTrailerId = useSignal("");
  const { type } = props;
  const apiRequestUrl = CONTENT_VIEW_TYPE[type];

  const content = useResource$(async ({ track }) => {
    track(() => params.id);

    // GET CONTENT DETAILS
    const res = await fetch(
      `${API.URL}/${apiRequestUrl}/${params.id}`,
      API.OPTIONS,
    );
    const json = await res.json();

    // GET CONTENT TRAILER
    const videoRes = await fetch(
      `${API.URL}/${apiRequestUrl}/${params.id}/videos`,
      API.OPTIONS,
    );
    const videoJson = await videoRes.json();

    if (videoJson.results?.length) {
      videoTrailerId.value = videoJson.results[0].key;
    }

    return json as TV | Movie;
  });

  const changeModalVisibility = $(
    () => (isModalVisibility.value = !isModalVisibility.value),
  );

  const imageTransformer$ = $(({ src }: ImageTransformerProps): string => {
    if (src) {
        return `${API.CONFIGURE_IMAGES_URL()}/${src}`;
    }

    return errorPlaceholder;
  });

  useImageProvider({
    resolutions: [960],
    imageTransformer$,
  });

  return (
    <section class={`relative min-h-[500px]`}>
      <Resource
        value={content}
        onResolved={(content) => {
          const contentType = type === CATEGORY.MOVIE;
          const title = contentType ? content.title : (content as TV).name;
          const releaseDate = contentType
            ? content.release_date
            : (content as TV).first_air_date;
          const runTime = contentType
            ? content.runtime
            : (content as TV).last_episode_to_air.runtime;

          return (
            <section
              style={{
                background: `var(--color-alerts-error) url(${API.CONFIGURE_IMAGES_URL("original")}/${content.backdrop_path}) no-repeat top/cover`,
              }}
              class={`
                                                        bg -z-1 relative flex
                                                        min-h-[500px] w-[100%] flex-col 
                                                        overflow-hidden rounded-[6px]
                                                        bg-label-gradient bg-cover bg-center bg-no-repeat p-[24px]
                                                        text-grayscale-100 after:absolute
                                                        
                                                        after:bottom-[0] after:left-[0] after:right-[0] after:top-[0] after:bg-grayscale-100 
                                                        after:opacity-70 dark:text-grayscale-10 sm:flex-row
                                `}
            >
              <aside
                class={`
                                                    relative z-10 mb-[12px] h-[400px] min-w-[280px] 
                                                    overflow-hidden rounded-[6px] sm:mb-[0px]
                                                    sm:h-[446px] sm:min-w-[320px]
                                  `}
              >
                <Image
                  src={content.poster_path}
                  layout="constrained"
                  width={320}
                  height={446}
                  class={`
                                                !sm:min-w-[320px] !sm:min-h-[446px] !min-h-[400px] !min-w-[280px]
                                         `}
                  placeholder={"var(--grayscale-10)"}
                  title={"Content title"}
                  alt={"Content poster"}
                />
              </aside>

              <article class={`relative z-10 text-grayscale-10 sm:pl-[24px]`}>
                <h1
                  class={`mb-[8px] text-h3-sm font-bold md:text-h3-sm lg:sm:text-h3-lg`}
                >
                  {title}
                </h1>

                <ul
                  class={`text-h6-xs flex flex-wrap font-semibold sm:text-h6-sm`}
                >
                  <li
                    class={`
                                            relative mb-[4px] whitespace-nowrap pr-[16px]
                                            after:absolute after:right-[5px] after:top-[0] 
                                            after:mt-[5px] after:h-[5px] after:w-[5px] after:rounded-[50%] 
                                            after:bg-primary after:content-['']
                                     `}
                  >
                    {type}
                  </li>

                  <li
                    class={`
                                            relative mb-[4px] whitespace-nowrap pr-[16px]
                                            after:absolute after:right-[5px] after:top-[0] 
                                            after:mt-[5px] after:h-[5px] after:w-[5px] after:rounded-[50%] 
                                            after:bg-primary after:content-['']
                                     `}
                  >
                    {releaseDate}
                  </li>

                  <li
                    class={`
                                            relative mb-[4px] whitespace-nowrap pr-[16px]
                                            after:absolute after:right-[5px] after:top-[0] 
                                            after:mt-[5px] after:h-[5px] after:w-[5px] after:rounded-[50%] 
                                            after:bg-primary after:content-['']
                                     `}
                  >
                    {content.original_language.toUpperCase()}
                  </li>

                  <li
                    class={`
                                            relative mb-[4px] whitespace-nowrap pr-[16px]
                                            after:absolute after:right-[5px] after:top-[0] 
                                            after:mt-[5px] after:h-[5px] after:w-[5px] after:rounded-[50%] 
                                            after:bg-primary after:content-['']
                                     `}
                  >
                    {content.status}
                  </li>

                  <li
                    class={`
                                            relative mb-[4px] whitespace-nowrap pr-[16px]
                                            after:absolute after:right-[5px] after:top-[0] 
                                            after:mt-[5px] after:h-[5px] after:w-[5px] after:rounded-[50%] 
                                            after:bg-primary after:content-['']
                                     `}
                  >
                    {convertMinutes(runTime)}
                  </li>

                  {content.production_companies[0]?.origin_country ? (
                    <li
                      class={`
                                            relative mb-[4px] whitespace-nowrap pr-[16px]
                                            after:absolute after:right-[5px] after:top-[0] 
                                            after:mt-[5px] after:h-[5px] after:w-[5px] after:rounded-[50%] 
                                            after:bg-primary after:content-['']
                                     `}
                    >
                      {content.production_companies[0]?.origin_country}
                    </li>
                  ) : (
                    ""
                  )}

                  <li
                    class={`
                                            relative mb-[4px] whitespace-nowrap pr-[16px]
                                            after:absolute after:right-[5px] after:content-[''] 
                                            
                                            ${content.budget ? "" : "after:hidden"}
                                            
                                            after:top-[0] after:mt-[5px] after:h-[5px] after:w-[5px] 
                                            after:rounded-[50%] after:bg-primary
                                     `}
                  >
                    {content.genres.map((genre, index) => {
                      const isNotLastItem = index < content.genres.length - 1;

                      return (
                        <span
                          key={genre.id}
                          class={`${isNotLastItem ? "mr-[4px]" : ""}`}
                        >
                          {genre.name}
                          {isNotLastItem ? " - " : ""}
                        </span>
                      );
                    })}
                  </li>

                  {content.budget ? (
                    <li class={`relative mb-[4px] whitespace-nowrap`}>
                      Budget: {formatterForBudget(content.budget)}
                    </li>
                  ) : (
                    ""
                  )}
                </ul>

                <ul class={`mb-[12px] flex items-center`}>
                  <li>
                    <Button
                      customClass={`!pl-[0px] !pr-[0px]`}
                      type={BUTTON_TYPE.TEXT}
                    >
                      <StarIcon class={`mr-[4px] translate-y-[-1px]`} />
                      {content.vote_average.toFixed(1)}
                    </Button>
                  </li>

                  <li>
                    <Button customClass={`!pl-[0px]`} type={BUTTON_TYPE.TEXT}>
                      <VoteCountIcon
                        width={42}
                        height={42}
                        class={`translate-x-[3px] translate-y-[-1px]`}
                      />
                      {content.vote_count}
                    </Button>
                  </li>

                  {videoTrailerId.value ? (
                    <li>
                      <Button
                        onClick={changeModalVisibility}
                        customClass={`!pl-[0px]`}
                        type={BUTTON_TYPE.TEXT}
                      >
                        <PlaySolidIcon class={`mr-[4px] translate-y-[-1px]`} />
                          Trailer
                      </Button>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>

                {content.production_companies.length ? (
                  <>
                    <h5
                      class={`mb-[8px] text-h5-sm font-semibold sm:text-h5-md`}
                    >
                      Production
                    </h5>
                    <p
                      class={`mb-[24px] text-h6-sm leading-[24px] sm:text-h6-md`}
                    >
                      {content.production_companies.map(
                        (productionCompany, index) => {
                          const isNotLastItem =
                            index < content.production_companies.length - 1;

                          return (
                            <span key={productionCompany.id}>
                              {productionCompany.name}
                              {isNotLastItem ? ", " : ""}
                            </span>
                          );
                        },
                      )}
                    </p>
                  </>
                ) : (
                  ""
                )}

                {content.tagline ? (
                  <>
                    <h5
                      class={`mb-[8px] text-h5-sm font-semibold sm:text-h5-md`}
                    >
                      Tagline
                    </h5>
                    <p
                      class={`mb-[24px] text-h6-sm leading-[24px] sm:text-h6-md`}
                    >
                      {content.tagline}
                    </p>
                  </>
                ) : (
                  ""
                )}

                {content.overview ? (
                  <>
                    <h5
                      class={`mb-[8px] text-h5-sm font-semibold sm:text-h5-md`}
                    >
                      Storyline
                    </h5>
                    <p
                      class={`mb-[24px] text-h6-sm leading-[24px] sm:text-h6-md`}
                    >
                      {content.overview}
                    </p>
                  </>
                ) : (
                  ""
                )}
              </article>
            </section>
          );
        }}
        onPending={() => <Loader isVisible={true} />}
        onRejected={() => <ErrorMessage isVisible={true} />}
      />

      <Modal
        isVisible={isModalVisibility.value}
        id={videoTrailerId.value}
        action={changeModalVisibility}
      />
    </section>
  );
});
