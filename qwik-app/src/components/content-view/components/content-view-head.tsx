import {$, component$, Resource, useResource$, useSignal} from "@builder.io/qwik";
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
    const isModalVisibility = useSignal(false);
    const {contentId, type} = props;
    const apiRequestUrl = CONTENT_VIEW_TYPE[type];
    const content = useResource$(async () => {
        const res = await fetch(`${API_URL}/${apiRequestUrl}/${contentId}`, OPTIONS);
        const json = await res.json();

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

    return <section class={`relative min-h-[500px]`}>
        <Resource value={content}
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
                                                    relative z-10 min-w-[280px] h-[400px] mb-[12px] 
                                                    sm:mb-[0px] sm:min-w-[320px] sm:h-[446px]
                                                    rounded-[6px] overflow-hidden
                                  `}>
                              <Image src={content.poster_path}
                                     layout="constrained"
                                     width={320}
                                     height={446}
                                     class={`
                                                !min-w-[280px] !min-h-[400px] !sm:min-w-[320px] !sm:min-h-[446px]
                                         `}
                                     placeholder={"var(--grayscale-10)"}
                                     title={"Content title"}
                                     alt={"Content poster"}
                              />
                          </aside>

                          <article class={`relative z-10 sm:pl-[24px]`}>
                              <h1 class={`font-bold text-h3-sm md:text-h3-sm lg:sm:text-h3-lg mb-[8px]`}>{content.title}</h1>

                              <ul class={`flex flex-wrap lg:flex-nowrap font-semibold text-h6-xs sm:text-h6-sm`}>
                                  <li class={`
                                            relative mb-[4px] pr-[16px] whitespace-nowrap
                                            after:content-[''] after:absolute after:right-[5px] 
                                            after:top-[0] after:w-[5px] after:h-[5px] after:mt-[5px] 
                                            after:rounded-[50%] after:bg-primary
                                     `}>
                                      {content.original_language.toUpperCase()}
                                  </li>
                                  <li class={`
                                            relative mb-[4px] pr-[16px] whitespace-nowrap
                                            after:content-[''] after:absolute after:right-[5px] 
                                            after:top-[0] after:w-[5px] after:h-[5px] after:mt-[5px] 
                                            after:rounded-[50%] after:bg-primary
                                     `}>
                                      {content.status}
                                  </li>
                                  <li class={`
                                            relative mb-[4px] pr-[16px] whitespace-nowrap
                                            after:content-[''] after:absolute after:right-[5px] 
                                            after:top-[0] after:w-[5px] after:h-[5px] after:mt-[5px] 
                                            after:rounded-[50%] after:bg-primary
                                     `}>
                                      {content.release_date}
                                      {content.production_companies[0].origin_country}
                                  </li>
                                  <li class={`
                                            relative mb-[4px] pr-[16px] whitespace-nowrap
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
                                  <li class={`
                                            relative mb-[4px] pr-[16px] whitespace-nowrap
                                            after:content-[''] after:absolute after:right-[5px] 
                                            after:top-[0] after:w-[5px] after:h-[5px] after:mt-[5px] 
                                            after:rounded-[50%] after:bg-primary
                                     `}>
                                      {convertMinutes(content.runtime)}
                                  </li>
                                  <li class={`relative mb-[4px] whitespace-nowrap`}>
                                      Budget:  {content.budget ? `${'$' + content.budget}` : '-'}
                                  </li>
                              </ul>


                              <ul class={`flex items-center mb-[12px]`}>
                                  <li>
                                      <Button customClass={`!pl-[0px] !pr-[0px]`} type={BUTTON_TYPE.TEXT}>
                                          <StarIcon class={`mr-[4px] translate-y-[-1px]`}/>
                                          {content.vote_average.toFixed(1)}
                                      </Button>
                                  </li>
                                  <li>
                                      <Button customClass={`!pl-[0px]`} type={BUTTON_TYPE.TEXT}>
                                          <VoteCountIcon width={42} height={42} class={`translate-y-[-1px] translate-x-[3px]`}/>
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

                              <h5 class={`font-semibold text-h5-sm sm:text-h5-md mb-[8px]`}>Tagline</h5>
                              <p class={`text-h6-sm leading-[24px] line-he sm:text-h6-md mb-[24px]`}>
                                  {content.tagline}
                              </p>

                              <h5 class={`font-semibold text-h5-sm sm:text-h5-md mb-[8px]`}>Overview</h5>
                              <p class={`text-h6-sm leading-[24px] line-he sm:text-h6-md mb-[24px]`}>
                                  {content.overview}
                              </p>
                          </article>
                      </section>
                  }}
                  onPending={() => <Loader isVisible={true}/>}
                  onRejected={() => <EmptyList isVisible={true}/>}/>
    </section>
})
