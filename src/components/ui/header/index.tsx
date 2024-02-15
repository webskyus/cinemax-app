import { component$, useStore } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";

import { LogoIcon } from "~/components/icons/logo-icon";
import { URLS } from "~/utils/urls";
import { SearchIcon } from "~/components/icons/search-icon";
import { ThemeSwitch } from "../theme-switcher";

export enum CATEGORY {
  TV_SHOW = "TV Show",
  MOVIE = "Movies",
  PEOPLE = "People",

  GENRES_MOVIE = "Movie Genres",
  GENRES_TV_SHOW = "TV Show Genres",

  RECOMMENDED_MOVIE = "Recommended Movies",
  RECOMMENDED_TV_SHOW = "Recommended TV Show",

  SIMILAR_MOVIE = "Similar Movies",
  SIMILAR_TV_SHOW = "Similar TV Show",

  CREDITS_MOVIE = "Movie Credits",
  CREDITS_TV_SHOW = "TV Show Credits",
  CREDITS_COMBINED = "Combined Movie and TV Credits",

  TOP_RATED = "Top Rated",
  TOP_RATED_MOVIE = "Top Rated Movie",
  TOP_RATED_TV_SHOW = "Top Rated TV Show",

  POPULAR = "Popular",
  POPULAR_MOVIE = "Popular Movie",
  POPULAR_TV_SHOW = "Popular TV Show",
  POPULAR_PEOPLE = "Popular People",

  NOW_PLAYING = "Now Playing",
  COMING_SOON = "Coming Soon",

  TRENDING = "Trending",
  TRENDING_MOVIE = "Trending Movie",
  TRENDING_TV_SHOW = "Trending TV Show",
  TRENDING_PERSON = "Trending People",

  ON_THE_AIR = "On The Air",
  AIRING_TODAY = "Airing Today",
}

export default component$(() => {
  const {
    url: { pathname },
  } = useLocation();
  const navigation = useStore([
    {
      id: 1,
      name: CATEGORY.MOVIE,
      link: URLS.MOVIE,
    },
    {
      id: 2,
      name: CATEGORY.TV_SHOW,
      link: URLS.TV_SHOW,
    },
    {
      id: 3,
      name: CATEGORY.PEOPLE,
      link: URLS.PERSON,
    },
  ]);

  return (
    <header
      class={` 
        flex items-center
        bg-grayscale-10 pb-[22px] pl-[24px] pr-[24px]
        pt-[22px] dark:bg-additional-dark-smooth
    `}
    >
      <Link href={URLS.MAIN} title="CineMax Logo">
        <LogoIcon
          width={86}
          height={28}
          class={`fill-grayscale-100 dark:fill-grayscale-10`}
        />
      </Link>

      <nav class={"flex w-[100%]"}>
        <ul
          class={`
                    ml-[146px] hidden flex-row items-center
                    lg:ml-[100px] lg:flex
                `}
        >
          {navigation.map((menuItem) => {
            return (
              <li
                key={menuItem.id}
                class={`
                            p-[6px] pl-[12px] pr-[12px] 
                            font-medium
                            text-grayscale-100 transition-all
                            hover:text-primary 
                            dark:text-grayscale-10 dark:hover:text-primary 
                            
                            ${pathname.includes(menuItem.link) ? "!text-primary" : ""}
                        `}
              >
                <Link href={menuItem.link}>{menuItem.name}</Link>
              </li>
            );
          })}
        </ul>

        <ul class={`ml-auto flex flex-row items-center`}>
          <li class={`sm:mr-[20px]`}>
            <Link href={URLS.SEARCH} title={"Search..."}>
              <SearchIcon
                class={`fill-grayscale-100 dark:fill-grayscale-10 ${pathname.includes(URLS.SEARCH) ? "!fill-primary" : ""}`}
              />
            </Link>
          </li>
          <li class={`hidden sm:flex`}>
            <ThemeSwitch />
          </li>
        </ul>
      </nav>
    </header>
  );
});
