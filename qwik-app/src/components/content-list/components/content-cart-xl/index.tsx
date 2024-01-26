import {component$} from "@builder.io/qwik";
import { Image } from '@unpic/qwik';
import {Link} from "@builder.io/qwik-city";

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

    return <Link href={'/'} class={`relative hover:scale-[105%] transition-all`}>
            <Image src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                   layout="constrained"
                   width={400}
                   height={600}
                   class={`
                        [@media(min-width:2419px)]:!max-w-[800px]
                        [@media(min-width:2419px)]:!max-h-[1000px]
                   `}
                   alt="Movie poster"
            />
        </Link>
})
