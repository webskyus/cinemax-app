import {$, component$} from "@builder.io/qwik";
import {Link} from "@builder.io/qwik-city";
import {CONTENT_TYPE} from "~/components/content-list";
import {Image, ImageTransformerProps, useImageProvider} from "qwik-image";
import errorPlaceholder from "/img/error-placeholder.svg";
import {Cast, Movie, People} from "~/api/models";
import {API} from "~/api";

interface ContentCartXLProps {
    data: Movie | People | Cast
    type: keyof typeof CONTENT_TYPE
}

export const ContentCardXL = component$((props: ContentCartXLProps) => {
    const {
        type,
        data
    } = props;
    const getContentUrl = CONTENT_TYPE[type].PAGE_URL;
    const getContentTitle = CONTENT_TYPE[type].TITLE;
    const poster = (data as People | Cast).profile_path || (data as Movie).poster_path;
    const title = (data as People | Cast).name || (data as Movie).title;

    const imageTransformer$ = $(
        ({ src }: ImageTransformerProps): string => {
            if (src) return `${API.CONFIGURE_IMAGES_URL()}/${src}`;

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
                        h-[100%] rounded-[6px] shadow-xl
                        [@media(min-width:2419px)]:!max-w-[800px]
                        [@media(min-width:2419px)]:!max-h-[1000px]
                   `}
                   placeholder={"var(--grayscale-10)"}
                   title={title}
                   alt={`${getContentTitle} poster`}
            />
        </Link>
})
