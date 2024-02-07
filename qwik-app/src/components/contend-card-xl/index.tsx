import {$, component$} from "@builder.io/qwik";
import {Link} from "@builder.io/qwik-city";
import {CONTENT_TYPE} from "~/components/content-list";
import {API_MEDIA_TYPE, CONFIGURATE_IMAGES_API_URL} from "~/api";
import {Image, ImageTransformerProps, useImageProvider} from "qwik-image";
import errorPlaceholder from "/img/error-placeholder.svg";
import {Genres} from "~/components/content-genres";

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
    media_type: API_MEDIA_TYPE,
    vote_average: number,
    vote_count: number,
    genres: Genres[]
}

export interface TV extends Exclude<Movie, "title"> {
    name: string,
    origin_country: string[]
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

interface ContentCartXLProps {
    data: Movie | People
    type: keyof typeof CONTENT_TYPE
}

export const ContentCardXL = component$((props: ContentCartXLProps) => {
    const {
        type,
        data
    } = props;
    const getContentUrl = CONTENT_TYPE[type].PAGE_URL;
    const getContentTitle = CONTENT_TYPE[type].TITLE;
    const poster = (data as People).profile_path || (data as Movie).poster_path;
    const title = (data as People).name || (data as Movie).title;

    const imageTransformer$ = $(
        ({ src }: ImageTransformerProps): string => {
            if (src) return `${CONFIGURATE_IMAGES_API_URL()}/${src}`;

            return errorPlaceholder;
        }
    );

    useImageProvider({
        resolutions: [960],
        imageTransformer$,
    });

    return <Link href={`${getContentUrl}/${data.id}`} class={`relative hover:scale-[105%] transition-all`}>
            <Image src={poster}
                   layout="constrained"
                   width={400}
                   height={600}
                   class={` 
                        h-[100%]
                        [@media(min-width:2419px)]:!max-w-[800px]
                        [@media(min-width:2419px)]:!max-h-[1000px]
                   `}
                   placeholder={"var(--grayscale-10)"}
                   title={title}
                   alt={`${getContentTitle} poster`}
            />
        </Link>
})
