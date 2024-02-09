import {API_MEDIA_TYPE} from "~/api/index";
import {Genres} from "~/components/content-genres";
import {CATEGORY} from "~/components/ui/label";

export interface Movie {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    tagline: string,
    status: string,
    title: string,
    video: boolean,
    media_type: API_MEDIA_TYPE,
    vote_average: number,
    vote_count: number,
    genres: Genres[],
    production_companies: ProductionCompanies[],
    runtime: number
    budget: number
}

export interface TV extends Exclude<Movie, "title"> {
    name: string,
    origin_country: string[]
    first_air_date: string
    episode_run_time: number[]
}

export interface People {
    adult: boolean
    id: number
    name: string
    original_name: string
    known_for_department: string
    profile_path: string
    media_type: number
    popularity: number
    gender: number
    known_for: PeopleKnownFor[]
}

export interface PeopleKnownFor {
    adult: boolean
    backdrop_path: string
    id: number
    title: string
    original_language: string
    original_title: string
    overview: string
    poster_path: string
    media_type: string
    genre_ids: number[]
    popularity: number
    release_date: string
    video: boolean | string
    vote_average: number
    vote_count: number
}

interface ProductionCompanies {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string,
}

export const apiMediaType: Record<API_MEDIA_TYPE, CATEGORY.MOVIE | CATEGORY.TV_SHOW | CATEGORY.PEOPLE>  = {
    [API_MEDIA_TYPE.MOVIE]: CATEGORY.MOVIE,
    [API_MEDIA_TYPE.TV]: CATEGORY.TV_SHOW,
    [API_MEDIA_TYPE.PERSON]: CATEGORY.PEOPLE,
};
