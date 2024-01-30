import {$, component$} from "@builder.io/qwik";
import {Link} from "@builder.io/qwik-city";
import {CONTENT_TYPE} from "~/components/content-list";
import {IMAGES_API_URL} from "~/api";
import {Image, ImageTransformerProps, useImageProvider} from "qwik-image";
import errorPlaceholder from "/img/error-placeholder.svg";

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
    type: keyof typeof CONTENT_TYPE
}

export const ContentCardXL = component$((props: ContentCartXLProps) => {
    const {
        type,
        data: {
            id,
            title,
            poster_path
        }
    } = props;
    const getContentApiType = CONTENT_TYPE[type].API_TYPE;
    const getContentTitle = CONTENT_TYPE[type].TITLE;

    const imageTransformer$ = $(
        ({ src }: ImageTransformerProps): string => {
            if (src) return `${IMAGES_API_URL}/${src}`;

            return errorPlaceholder;
        }
    );

    // Global Provider (required)
    useImageProvider({
        // You can set this prop to overwrite default values [3840, 1920, 1280, 960, 640]
        resolutions: [960],
        imageTransformer$,
    });

    return <Link href={`/${getContentApiType}/${id}`} class={`relative hover:scale-[105%] transition-all`}>
            <Image src={poster_path}
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
