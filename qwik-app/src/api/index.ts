export const API_KEY = '59604b9bbff1fba514480c0d82b6ca71';
export const API_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTYwNGI5YmJmZjFmYmE1MTQ0ODBjMGQ4MmI2Y2E3MSIsInN1YiI6IjVmYjQ5ZjJjYWZhMWIwMDA0MGJiOGJkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.baeLdvPfm6F4P-Yiw3FY0Ifp9lA7ijo3ZwSjYcqbS80';
export const API_ROOT_URL = 'https://api.themoviedb.org';
export const API_V = '3';
export const API_URL = `${API_ROOT_URL}/${API_V}`;
export const CONFIGURATE_IMAGES_API_URL = (size = 'w780') => `https://image.tmdb.org/t/p/${size}`;
export const OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`
    }
};

export enum API_REQUEST_URLS {
    MOVIE = 'discover/movie',
    TV_SHOWS = 'discover/tv',
    PEOPLE = 'person/popular',

    SEARCH = 'search/multi',

    TOP_RATED_MOVIE = 'movie/top_rated',
    TOP_RATED_TV_SHOW = 'tv/top_rated',

    POPULAR_MOVIE = 'movie/popular',
    POPULAR_TV_SHOW = 'tv/popular',

    NOW_PLAYING = 'movie/now_playing',

    COMING_SOON = 'movie/upcoming',

    TRENDING_MOVIE = 'trending/movie/week',
    TRENDING_TV_SHOW = 'trending/tv/week',
    TRENDING_PEOPLE = 'trending/person/week',

    ON_THE_AIR = 'tv/on_the_air',
    AIRING_TODAY = 'tv/airing_today',
}

export enum API_MEDIA_TYPE {
    MOVIE = 'movie',
    TV = 'tv',
    PERSON = 'person',
}
