import { component$ } from "@builder.io/qwik";

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
  TRENDING_PEOPLE = "Trending People",

  ON_THE_AIR = "On The Air",
  AIRING_TODAY = "Airing Today",
}

interface Props {
  type: string;
}

export const Label = component$((props: Props) => {
  const { type } = props;

  return (
    <article
      class={`
        mb-[12px] inline-block
        font-semibold
    `}
    >
      {type}
    </article>
  );
});
