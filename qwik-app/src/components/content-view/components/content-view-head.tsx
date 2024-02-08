import {$, component$, Resource, useResource$} from "@builder.io/qwik";
import {Image, ImageTransformerProps, useImageProvider} from "qwik-image";
import {Button, BUTTON_TYPE} from "~/components/ui/button";
import {StarIcon} from "~/components/icons/star-icon";
import {PlaySolidIcon} from "~/components/icons/play-solid-icon";
import {API_REQUEST_URLS, API_URL, CONFIGURATE_IMAGES_API_URL, OPTIONS} from "~/api";
import {CATEGORY} from "~/components/ui/label";
import {Loader} from "~/components/ui/loader";
import {EmptyList} from "~/components/ui/empty-list";
import {Movie, TV} from "~/api/models";
import errorPlaceholder from "/img/error-placeholder.svg";
import {convertMinutes} from "~/utils";
import {VoteCountIcon} from "~/components/icons/vote-count-icon";

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
    const apiRequestUrl = CONTENT_VIEW_TYPE[type];
    const content = useResource$(async () => {
        const res = await fetch(`${API_URL}/${apiRequestUrl}/${contentId}`, OPTIONS);
        const json = await res.json();

        // TODO change it check if media type movie set MOVIE
        return json as Movie | TV;
    });

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

    return <Resource value={content}
                     onResolved={(content) => {
                         return <section
                             style={{background: `var(--color-alerts-error) url(${CONFIGURATE_IMAGES_API_URL('original')}/${content.backdrop_path}) no-repeat top/cover`}}
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
                                 <Image src={content.poster_path}
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
                                     <li class={`
                                            relative mb-[4px] pr-[16px] 
                                            after:content-[''] after:absolute after:right-[5px] 
                                            after:top-[0] after:w-[5px] after:h-[5px] after:mt-[5px] 
                                            after:rounded-[50%] after:bg-primary
                                     `}>
                                         {content.release_date}
                                         {content.production_companies[0].origin_country}
                                     </li>
                                     <li class={`
                                            relative mb-[4px] pr-[16px] 
                                            after:content-[''] after:absolute after:right-[5px] 
                                            after:top-[0] after:w-[5px] after:h-[5px] after:mt-[5px] 
                                            after:rounded-[50%] after:bg-primary
                                     `}>
                                         {
                                             content.genres.map((genre, index) => {
                                                 const isNotLastItem = index < content.genres.length - 1;

                                                 return <span key={genre.id}
                                                              class={`${isNotLastItem ? 'mr-[4px]' : ''}`}>
                                                     {genre.name}
                                                     {isNotLastItem ? '-' : ''}
                                                 </span>
                                             })
                                         }
                                     </li>
                                     <li class={`relative mb-[4px]`}>
                                         {convertMinutes(content.runtime)}
                                     </li>
                                 </ul>

                                 <ul class={`flex items-center mb-[24px]`}>
                                     <li>
                                         <Button customClass={`!pl-[0px]`} type={BUTTON_TYPE.TEXT}>
                                            <StarIcon class={`mr-[4px] translate-y-[-1px]`}/>
                                             {content.vote_average}
                                         </Button>
                                     </li>
                                     <li>
                                         <Button customClass={`!pl-[0px]`} type={BUTTON_TYPE.TEXT}>
                                            <VoteCountIcon width={40} height={40} class={`mr-[4px] translate-y-[-1px]`}/>
                                             {content.vote_count}
                                         </Button>
                                     </li>
                                     <li>
                                         <Button customClass={`!pl-[0px]`} type={BUTTON_TYPE.TEXT}>
                                             <PlaySolidIcon class={`mr-[4px] translate-y-[-1px]`}/>
                                             Play
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
