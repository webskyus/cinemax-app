export const API_KEY = '59604b9bbff1fba514480c0d82b6ca71';
export const API_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTYwNGI5YmJmZjFmYmE1MTQ0ODBjMGQ4MmI2Y2E3MSIsInN1YiI6IjVmYjQ5ZjJjYWZhMWIwMDA0MGJiOGJkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.baeLdvPfm6F4P-Yiw3FY0Ifp9lA7ijo3ZwSjYcqbS80';
export const API_ROOT_URL = 'https://api.themoviedb.org';
export const API_V = '3';
export const API_URL = `${API_ROOT_URL}/${API_V}`;
export const IMAGES_API_URL = 'https://image.tmdb.org/t/p/w500';
export const OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`
    }
};
export enum MOVIE_LIST_CHART_API_URL {
    NOW_PLAYING = 'now_playing',
    POPULAR = 'popular',
    TOP_RATED = 'top_rated',
    UP_COMING = 'up_coming',
}
