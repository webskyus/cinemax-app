export const API_BASE_SETTING = {
  API_KEY: "aba9bfc5921eae7409af946b7e091881",
  API_ACCESS_TOKEN:
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmE5YmZjNTkyMWVhZTc0MDlhZjk0NmI3ZTA5MTg4MSIsInN1YiI6IjVmYjQ5ZjJjYWZhMWIwMDA0MGJiOGJkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D8LpkCuU7-HDU8c4LYbmKCYuaqicz-bVZpRn3UWrfSU",
  API_ROOT_URL: "https://api.themoviedb.org",
  API_V: "3",
};

export const API = {
  URL: `${API_BASE_SETTING.API_ROOT_URL}/${API_BASE_SETTING.API_V}`,
  CONFIGURE_IMAGES_URL: (size = "w780") => `https://image.tmdb.org/t/p/${size}`,
  OPTIONS: {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_BASE_SETTING.API_ACCESS_TOKEN}`,
    },
  },
};

export enum API_REQUEST_URLS {
  MOVIE = "discover/movie",
  TV_SHOWS = "discover/tv",
  PERSON = "person/popular",

  GENRES_MOVIE = "genre/movie/list",
  GENRES_TV_SHOW = "genre/tv/list",

  SEARCH = "search/multi",

  MOVIE_TOP_RATED = "movie/top_rated",
  TV_SHOW_TOP_RATED = "tv/top_rated",

  MOVIE_POPULAR = "movie/popular",
  TV_SHOW_POPULAR = "tv/popular",

  MOVIE_NOW_PLAYING = "movie/now_playing",

  MOVIE_COMING_SOON = "movie/upcoming",

  TRENDING_MOVIE_TRENDING = "trending/movie/week",
  TRENDING_TV_SHOW = "trending/tv/week",
  TRENDING_PEOPLE = "trending/person/week",

  TV_SHOW_ON_THE_AIR = "tv/on_the_air",
  TV_SHOW_AIRING_TODAY = "tv/airing_today",

  MOVIE_DETAILS = "movie",
  TV_SHOW_DETAILS = "tv",
  PERSON_DETAILS = "person",

  CREDITS = "credits",
  COMBINED_CREDITS = "combined_credits",

  SIMILAR = "similar",

  RECOMMENDATIONS = "recommendations",

  PERSON_EXTERNAL_IDS = "external_ids",
}

export const EXTERNAL_LINK = {
  IMDB: "https://www.imdb.com/name",
  TWITTER: "https://twitter.com",
  INSTAGRAM: "https://www.instagram.com",
  FACEBOOK: "https://www.facebook.com",
};

export enum API_MEDIA_TYPE {
  MOVIE = "movie",
  TV = "tv",
  PERSON = "person",
}
