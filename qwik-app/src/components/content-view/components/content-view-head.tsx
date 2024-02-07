import {$, component$, Resource, useResource$} from "@builder.io/qwik";
import {Image, ImageTransformerProps, useImageProvider} from "qwik-image";
import {Button, BUTTON_TYPE} from "~/components/ui/button";
import {Star} from "~/components/icons/star";
import {PlaySolid} from "~/components/icons/play-solid";
import {API_REQUEST_URLS, API_URL, OPTIONS} from "~/api";
import {ContentCardXL, Movie, People, TV} from "~/components/contend-card-xl";
import {CATEGORY} from "~/components/ui/label";
import {URLS} from "~/utils/urls";
import {Loader} from "~/components/ui/loader";
import {EmptyList} from "~/components/ui/empty-list";

interface ContentViewHeadProps {
    contentId: string
    type: CATEGORY.MOVIE | CATEGORY.TV_SHOW
}

const CONTENT_VIEW_TYPE = {
    [CATEGORY.MOVIE]: API_REQUEST_URLS.DETAILS_MOVIE,
    [CATEGORY.TV_SHOW]: API_REQUEST_URLS.DETAILS_TV,
}

export const ContentViewHead = component$((props: ContentViewHeadProps) => {
    const {contentId, type} = props;
    const getContentApiRequestUrl = CONTENT_VIEW_TYPE[type];
    const content = useResource$(async () => {
        const res = await fetch(`${API_URL}/${getContentApiRequestUrl}/${contentId}`, OPTIONS);
        const json = await res.json();

        return json as Movie | TV;
    });

    const imageTransformer$ = $(
        ({src}: ImageTransformerProps): string => {
            return `https://image.tmdb.org/t/p/w780//eSatbygYZp8ooprBHZdb6GFZxGB.jpg`;
        }
    );

    useImageProvider({
        resolutions: [960],
        imageTransformer$,
    });

    return <Resource value={content}
                     onResolved={(content) => {
                         return <section
                             style={{background: `var(--color-alerts-error) url(https://image.tmdb.org/t/p/original//5AkPhazx8F0Ht74CUdJU03vNzBi.jpg) no-repeat top/cover`}}
                             class={`
                                                        relative flex flex-col sm:flex-row
                                                        w-[100%] min-h-[500px] p-[24px] 
                                                        text-grayscale-100 dark:text-grayscale-10
                                                        bg bg-label-gradient bg-no-repeat bg-center bg-cover
                                                        rounded-[6px]
                                                        
                                                after:absolute after:top-[0] after:bottom-[0] after:right-[0] after:left-[0] after:bg-grayscale-100 after:opacity-70 -z-1
                                `}>
                             <aside class={`
                                                    relative z-10 min-w-[280px] h-[346px] mb-[12px] 
                                                    sm:mb-[0px] sm:min-w-[320px] sm:h-[446px]
                                                    rounded-[6px] overflow-hidden
                                  `}>
                                 <Image src={"https://image.tmdb.org/t/p/w780//eSatbygYZp8ooprBHZdb6GFZxGB.jpg"}
                                        layout="constrained"
                                        width={320}
                                        height={446}
                                        class={`
                                                !min-w-[280px] !min-h-[346px] !sm:min-w-[320px] !sm:min-h-[446px]
                                         `}
                                        placeholder={"var(--grayscale-10)"}
                                        title={"Content title"}
                                        alt={"Content poster"}
                                 />
                             </aside>

                             <article class={`relative z-10 pl-[24px]`}>
                                 <h1 class={`font-bold text-h3-sm sm:text-h3-lg mb-[8px]`}>{content.title}</h1>

                                 <ul class={`flex font-semibold text-h6-xs sm:text-h6-sm`}>
                                     <li class={`mr-[4px] mb-[4px]`}>{content.release_date} (US)</li>
                                     <li class={`mr-[4px] mb-[4px]`}>
                                         {
                                             content.genres.map((genre, index) => {
                                                 return <span key={genre.id} class={`mr-[4px]`}>
                                                     {genre.name}
                                                     {index < content.genres.length-1 ? '-' : ''}
                                                 </span>
                                             })
                                         }
                                     </li>
                                     <li class={`mr-[4px] mb-[4px]`}>1h 45m</li>
                                 </ul>

                                 <ul class={`flex items-center mb-[24px]`}>
                                     <li>
                                         <Button customClass={`!pl-[0px]`} type={BUTTON_TYPE.TEXT}>
                                             <Star class={`mr-[4px] translate-y-[-1px]`}/>
                                             75%
                                         </Button>
                                     </li>
                                     <li>
                                         <Button customClass={`!pl-[0px]`} type={BUTTON_TYPE.TEXT}>
                                             <PlaySolid class={`mr-[4px] translate-y-[-1px]`}/>
                                             Play Trailer
                                         </Button>
                                     </li>
                                 </ul>


                                 <h5 class={`font-semibold text-h5-sm sm:text-h5-md mb-[8px]`}>Overview</h5>
                                 <p class={`text-h6-sm sm:text-h6-md mb-[24px]`}>
                                     One man’s campaign for vengeance takes on national stakes after he is revealed to
                                     be a former operative
                                     of a powerful and clandestine organization known as Beekeepers.
                                 </p>

                                 <ul class={`flex items-center`}>
                                     <li class={`mr-[12px] mb-[8px]`}>
                                         <h5 class={`font-semibold text-h6-sm sm:text-h6-md mb-[4px]`}>David
                                             Ayer</h5>
                                         <p>Director</p>
                                     </li>
                                     <li class={`mr-[12px] mb-[8px]`}>
                                         <h5 class={`font-semibold text-h6-sm sm:text-h6-md mb-[4px]`}>Kurt
                                             Wimmer</h5>
                                         <p>Writer</p>
                                     </li>
                                 </ul>
                             </article>
                         </section>
                     }}
                     onPending={() => <Loader isVisible={true}/>}
                     onRejected={() => <EmptyList isVisible={true}/>}/>
})
