export const API_BASE_SETTING = {
    API_KEY: 'aba9bfc5921eae7409af946b7e091881',
    API_ACCESS_TOKEN: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmE5YmZjNTkyMWVhZTc0MDlhZjk0NmI3ZTA5MTg4MSIsInN1YiI6IjVmYjQ5ZjJjYWZhMWIwMDA0MGJiOGJkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D8LpkCuU7-HDU8c4LYbmKCYuaqicz-bVZpRn3UWrfSU',
    API_ROOT_URL: 'https://api.themoviedb.org',
    API_V: '3',
}

export const API = {
    URL: `${API_BASE_SETTING.API_ROOT_URL}/${API_BASE_SETTING.API_V}`,
    CONFIGURATE_IMAGES_URL: (size = 'w780') => `https://image.tmdb.org/t/p/${size}`,
    OPTIONS: {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_BASE_SETTING.API_ACCESS_TOKEN}`
        }
    }
}


export enum API_REQUEST_URLS {
    MOVIE = 'discover/movie',
    TV_SHOWS = 'discover/tv',
    PEOPLE = 'person/popular',

    GENRES_MOVIE = 'genre/movie/list',
    GENRES_TV_SHOW = 'genre/tv/list',

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

    DETAILS_MOVIE = 'movie',
    DETAILS_TV = 'tv',
    DETAILS_PERSON = 'person',
}

export enum API_MEDIA_TYPE {
    MOVIE = 'movie',
    TV = 'tv',
    PERSON = 'person',
}
