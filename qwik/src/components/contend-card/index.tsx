import { $, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { CONTENT_TYPE } from "~/components/content-list";
import type { ImageTransformerProps } from "qwik-image";
import { Image, useImageProvider } from "qwik-image";
import type { Cast, Movie, Person } from "~/api/models";
import { API } from "~/api";
import errorPlaceholder from "/public/img/error-placeholder.svg?url";

interface ContentCardProps {
  data: Movie | Person | Cast;
  type: keyof typeof CONTENT_TYPE;
}

export const ContentCard = component$((props: ContentCardProps) => {
  const { type, data } = props;
  const getContentUrl = CONTENT_TYPE[type].PAGE_URL;
  const getContentTitle = CONTENT_TYPE[type].TITLE;
  const poster =
    (data as Person | Cast).profile_path || (data as Movie).poster_path;
  const title = (data as Person | Cast).name || (data as Movie).title;

  const imageTransformer$ = $(({ src }: ImageTransformerProps): string => {
    if (src) return `${API.CONFIGURE_IMAGES_URL()}/${src}`;

    return errorPlaceholder;
  });

  useImageProvider({
    resolutions: [960],
    imageTransformer$,
  });

  return (
    <Link
      href={`${getContentUrl}/${data.id}`}
      class={`relative transition-all hover:scale-[105%] hover:z-10`}
    >
      <Image
        src={poster}
        layout="constrained"
        width={400}
        height={600}
        class={` 
                        h-[100%] rounded-[6px] shadow-xl
                        [@media(min-width:2419px)]:!max-h-[1000px]
                        [@media(min-width:2419px)]:!max-w-[800px]
                   `}
        placeholder={"var(--grayscale-10)"}
        title={title}
        alt={`${getContentTitle} poster`}
      />
    </Link>
  );
});
