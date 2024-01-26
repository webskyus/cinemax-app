import {component$} from "@builder.io/qwik";

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
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

interface ContentCartXLProps {
    data: Movie
}

export const ContentCartXL = component$((props: ContentCartXLProps) => {
    const {
        data: {
            title,
            original_title,
            poster_path
        }
    } = props;

    return <article class={`relative mr-[10px] mb-[10px]`}>
        <img src={`https://image.tmdb.org/t/p/w400/${poster_path}`} width={314} height={472} alt="Movie poster"/>
    </article>
})
