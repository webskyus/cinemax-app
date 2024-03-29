import { component$, Resource, useResource$ } from "@builder.io/qwik";
import type { CONTENT_TYPE_ITEMS } from "~/components/content-list";
import { Loader } from "~/components/ui/loader";
import { ErrorMessage } from "~/components/ui/error-message";
import { Link } from "@builder.io/qwik-city";
import { URLS } from "~/utils/urls";
import { Button } from "~/components/ui/button";
import { CATEGORY } from "~/components/ui/header";
import { API, API_REQUEST_URLS } from "~/api";

export interface Genres {
  id: number;
  name: string;
}

type GenresType = CATEGORY.GENRES_MOVIE | CATEGORY.GENRES_TV_SHOW;

interface ContentGenresProps {
  type: GenresType;
}

type GENRES_TYPE_ITEMS = Record<
  Extract<CATEGORY, GenresType>,
  CONTENT_TYPE_ITEMS
>;

const GENRES_TYPE: GENRES_TYPE_ITEMS = {
  [CATEGORY.GENRES_MOVIE]: {
    API_URL: API_REQUEST_URLS.GENRES_MOVIE,
    TITLE: CATEGORY.GENRES_MOVIE,
    PAGE_URL: URLS.MOVIE,
  },
  [CATEGORY.GENRES_TV_SHOW]: {
    API_URL: API_REQUEST_URLS.GENRES_TV_SHOW,
    TITLE: CATEGORY.GENRES_TV_SHOW,
    PAGE_URL: URLS.TV_SHOW,
  },
};

export const ContentGenres = component$((props: ContentGenresProps) => {
  const { type } = props;
  const apiRequestUrl = GENRES_TYPE[type].API_URL;
  const pageTitle = GENRES_TYPE[type].TITLE;
  const pageUrl = GENRES_TYPE[type].PAGE_URL;
  const genresList = useResource$(async () => {
    const res = await fetch(`${API.URL}/${apiRequestUrl}`, API.OPTIONS);
    const json = await res.json();

    return json.genres as Genres[];
  });

  return (
    <section>
      <section class={`relative min-h-[200px] pb-[24px] pt-[24px]`}>
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

        <Resource
          value={genresList}
          onResolved={(contentList) => {
            return (
              <ul class={`relative flex flex-wrap`}>
                {contentList.map((genre) => {
                  return (
                    <li key={genre.id}>
                      <Link href={`${pageUrl}?genre_id=${genre.id}`}>
                        <Button
                          customClass={`!mr-[12px] !mb-[12px] text-sm font-bold bg-green-300 leading-6 capitalize duration-100 transform rounded-[6px] shadow cursor-pointer focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10  hover:shadow-lg hover:-translate-y-1`}
                        >
                          {genre.name}
                        </Button>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            );
          }}
          onPending={() => <Loader isVisible={true} />}
          onRejected={() => <ErrorMessage isVisible={true} />}
        />
      </section>
    </section>
  );
});
