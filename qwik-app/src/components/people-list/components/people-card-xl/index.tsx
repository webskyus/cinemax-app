import {$, component$} from "@builder.io/qwik";
import {Link} from "@builder.io/qwik-city";
import {IMAGES_API_URL} from "~/api";
import {URLS} from "~/utils/urls";
import {People} from "~/components/people-list";
import {Image, ImageTransformerProps, useImageProvider} from "qwik-image";
import errorPlaceholder from "/img/error-placeholder.svg";

export interface PeopleCartXLProps {
    data: People
}

export const PeopleCardXL = component$((props: PeopleCartXLProps) => {
    const {
        data: {
            id,
            profile_path,
            original_name
        }
    } = props;

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

    return <Link href={`${URLS.PEOPLE}/${id}`} class={`relative hover:scale-[105%] transition-all`}>
            <Image src={profile_path}
                   layout="constrained"
                   objectFit="fill"
                   width={400}
                   height={600}
                   loading={"lazy"}
                   class={`
                        [@media(min-width:2419px)]:!max-w-[800px]
                        [@media(min-width:2419px)]:!max-h-[1000px]
                   `}
                   placeholder={"var(--grayscale-10)"}
                   title={original_name}
                   alt={original_name}
            />
        </Link>
})
