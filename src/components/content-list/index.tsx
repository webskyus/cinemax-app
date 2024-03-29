import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { ContentCard } from "../contend-card";
import { ErrorMessage } from "../ui/error-message";
import { Loader } from "~/components/ui/loader";
import { API_REQUEST_URLS, API } from "~/api";
import { CATEGORY } from "~/components/ui/header";
import { URLS } from "~/utils/urls";
import type { Movie, Person } from "~/api/models";
import { useLocation } from "@builder.io/qwik-city";
import { getContentWithGenresParam } from "~/utils";

interface ContentListProps {
  type: keyof typeof CONTENT_TYPE;
  page?: number;
}

export type CONTENT_TYPE_ITEMS = {
  TITLE: string;
  API_URL: API_REQUEST_URLS;
  PAGE_URL: URLS;
};

type CategoryTypes =
  | CATEGORY.MOVIE
  | CATEGORY.TV_SHOW
  | CATEGORY.PEOPLE
  | CATEGORY.RECOMMENDED_MOVIE
  | CATEGORY.RECOMMENDED_TV_SHOW
  | CATEGORY.TOP_RATED_MOVIE
  | CATEGORY.TOP_RATED_TV_SHOW
  | CATEGORY.POPULAR_MOVIE
  | CATEGORY.POPULAR_TV_SHOW
  | CATEGORY.POPULAR_PEOPLE
  | CATEGORY.NOW_PLAYING
  | CATEGORY.COMING_SOON
  | CATEGORY.TRENDING_MOVIE
  | CATEGORY.TRENDING_TV_SHOW
  | CATEGORY.TRENDING_PERSON
  | CATEGORY.ON_THE_AIR
  | CATEGORY.AIRING_TODAY;

type CONTENT_TYPES = Record<CategoryTypes, CONTENT_TYPE_ITEMS>;

export const CONTENT_TYPE: CONTENT_TYPES = {
  [CATEGORY.MOVIE]: {
    API_URL: API_REQUEST_URLS.MOVIE,
    TITLE: CATEGORY.MOVIE,
    PAGE_URL: URLS.MOVIE,
  },
  [CATEGORY.TV_SHOW]: {
    API_URL: API_REQUEST_URLS.TV_SHOWS,
    TITLE: CATEGORY.TV_SHOW,
    PAGE_URL: URLS.TV_SHOW,
  },
  [CATEGORY.PEOPLE]: {
    API_URL: API_REQUEST_URLS.PERSON,
    TITLE: CATEGORY.PEOPLE,
    PAGE_URL: URLS.PERSON,
  },
  [CATEGORY.RECOMMENDED_MOVIE]: {
    API_URL: API_REQUEST_URLS.MOVIE,
    TITLE: CATEGORY.RECOMMENDED_MOVIE,
    PAGE_URL: URLS.MOVIE,
  },
  [CATEGORY.RECOMMENDED_TV_SHOW]: {
    API_URL: API_REQUEST_URLS.TV_SHOWS,
    TITLE: CATEGORY.RECOMMENDED_TV_SHOW,
    PAGE_URL: URLS.TV_SHOW,
  },
  [CATEGORY.TOP_RATED_MOVIE]: {
    API_URL: API_REQUEST_URLS.MOVIE_TOP_RATED,
    TITLE: CATEGORY.TOP_RATED_MOVIE,
    PAGE_URL: URLS.MOVIE,
  },
  [CATEGORY.TOP_RATED_TV_SHOW]: {
    API_URL: API_REQUEST_URLS.TV_SHOW_TOP_RATED,
    TITLE: CATEGORY.TOP_RATED_TV_SHOW,
    PAGE_URL: URLS.TV_SHOW,
  },
  [CATEGORY.POPULAR_MOVIE]: {
    API_URL: API_REQUEST_URLS.MOVIE_POPULAR,
    TITLE: CATEGORY.POPULAR_MOVIE,
    PAGE_URL: URLS.MOVIE,
  },
  [CATEGORY.POPULAR_TV_SHOW]: {
    API_URL: API_REQUEST_URLS.TV_SHOW_POPULAR,
    TITLE: CATEGORY.POPULAR_TV_SHOW,
    PAGE_URL: URLS.TV_SHOW,
  },
  [CATEGORY.POPULAR_PEOPLE]: {
    API_URL: API_REQUEST_URLS.PERSON,
    TITLE: CATEGORY.POPULAR_PEOPLE,
    PAGE_URL: URLS.PERSON,
  },
  [CATEGORY.NOW_PLAYING]: {
    API_URL: API_REQUEST_URLS.MOVIE_NOW_PLAYING,
    TITLE: CATEGORY.NOW_PLAYING,
    PAGE_URL: URLS.MOVIE,
  },
  [CATEGORY.COMING_SOON]: {
    API_URL: API_REQUEST_URLS.MOVIE_COMING_SOON,
    TITLE: CATEGORY.COMING_SOON,
    PAGE_URL: URLS.MOVIE,
  },
  [CATEGORY.TRENDING_MOVIE]: {
    API_URL: API_REQUEST_URLS.TRENDING_MOVIE_TRENDING,
    TITLE: CATEGORY.TRENDING_MOVIE,
    PAGE_URL: URLS.MOVIE,
  },
  [CATEGORY.TRENDING_TV_SHOW]: {
    API_URL: API_REQUEST_URLS.TRENDING_TV_SHOW,
    TITLE: CATEGORY.TRENDING_TV_SHOW,
    PAGE_URL: URLS.TV_SHOW,
  },
  [CATEGORY.TRENDING_PERSON]: {
    API_URL: API_REQUEST_URLS.TRENDING_PEOPLE,
    TITLE: CATEGORY.TRENDING_PERSON,
    PAGE_URL: URLS.PERSON,
  },
  [CATEGORY.ON_THE_AIR]: {
    API_URL: API_REQUEST_URLS.TV_SHOW_ON_THE_AIR,
    TITLE: CATEGORY.ON_THE_AIR,
    PAGE_URL: URLS.TV_SHOW,
  },
  [CATEGORY.AIRING_TODAY]: {
    API_URL: API_REQUEST_URLS.TV_SHOW_AIRING_TODAY,
    TITLE: CATEGORY.AIRING_TODAY,
    PAGE_URL: URLS.TV_SHOW,
  },
};

export const ContentList = component$((props: ContentListProps) => {
  const { url } = useLocation();
  const { type, page = 1 } = props;
  const apiRequestUrl = CONTENT_TYPE[type].API_URL;
  const pageTitle = CONTENT_TYPE[type].TITLE;
  const genre = getContentWithGenresParam(url);

  const contentList = useResource$(async () => {
    const res = await fetch(
      `${API.URL}/${apiRequestUrl}?page=${page}${genre}`,
      API.OPTIONS,
    );
    const json = await res.json();

    return json.results as Movie[] | Person[];
  });

  return (
    <section class={`pb-[24px] pt-[24px]`}>
      <nav
        class={`
            mb-[12px] flex items-center  
            justify-between 
        `}
      >
        <h2
          class={`
                    bg-gradient-to-br 
                    from-primary to-grayscale-70 bg-clip-text
                    pb-[12px] text-h3-sm font-bold text-transparent sm:text-h3-lg
                `}
        >
          {pageTitle}
        </h2>
      </nav>

      <section class={`relative min-h-[500px]`}>
        <Resource
          value={contentList}
          onResolved={(contents) => {
            return (
              <section
                class={`
                                grid grid-cols-2 grid-rows-4 gap-2 sm:grid-cols-4
                                
                                [@media(min-width:1600px)]:grid-cols-5
                                [@media(min-width:1919px)]:grid-cols-6
                                [@media(min-width:2419px)]:grid-cols-8
                                [@media(min-width:2619px)]:grid-cols-9
                                [@media(min-width:3000px)]:grid-cols-10
                          `}
              >
                {contents.map((content) => {
                  return (
                    <ContentCard key={content.id} type={type} data={content} />
                  );
                })}
              </section>
            );
          }}
          onPending={() => <Loader isVisible={true} />}
          onRejected={() => <ErrorMessage isVisible={true} />}
        />
      </section>
    </section>
  );
});
