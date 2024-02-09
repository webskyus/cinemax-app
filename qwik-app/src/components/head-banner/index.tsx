import {component$, Resource, useResource$} from "@builder.io/qwik";
import {CATEGORY, Label} from "../ui/label";
import {PlayIcon} from "~/components/icons/play-icon";
import {Button} from "~/components/ui/button";
import {Loader} from "~/components/ui/loader";
import {EmptyList} from "~/components/ui/empty-list";
import {Link} from "@builder.io/qwik-city";
import {CONTENT_TYPE} from "~/components/content-list";
import {Movie, TV} from "~/api/models";
import {API} from "~/api";

interface HeadBannerProps {
    type: CATEGORY.MOVIE | CATEGORY.TV_SHOW
}

export const HeadBanner = component$((props: HeadBannerProps) => {
    const {type} = props;
    const apiRequestUrl = CONTENT_TYPE[type].API_URL;
    const pageUrl = CONTENT_TYPE[type].PAGE_URL;
    const random = Math.floor(Math.random()*(10-1))+1;

    const singleContentItem = useResource$(async () => {
        const res = await fetch(`${API.URL}/${apiRequestUrl}`, API.OPTIONS);
        const json = await res.json();

        if (type === CATEGORY.TV_SHOW) return json.results[random] as TV;

        return json.results[random] as Movie;
    });

    return <section class={`relative min-h-[500px]`}>
        <Resource value={singleContentItem}
                  onResolved={(content) => {
                      const title = type === CATEGORY.TV_SHOW ? (content as TV).name : content.title;

                      return <section
                          style={{background: `var(--color-alerts-error) url(${API.CONFIGURATE_IMAGES_URL('original')}/${content.backdrop_path}) no-repeat top/cover`}}
                          class={`
                                                relative flex flex-col
                                                w-[100%] min-h-[500px] p-[24px] bg
                                                bg-label-gradient bg-no-repeat bg-center bg-cover
                                                rounded-[6px]
                                                
                                                after:absolute after:top-[0] after:bottom-[0] after:right-[0] after:left-[0] after:bg-grayscale-100 after:opacity-70 -z-1
                                                
                                              
                                                [@media(min-width:2100px)]:h-[600px]
                                                [@media(min-width:2200px)]:h-[800px]
                                `}>
                          <article class={`
                                            z-10 mt-auto mb-[12px]
                                            pr-[12px]
                             `}>
                              <Label type={CONTENT_TYPE[type].TITLE}/>
                              <h1 class={'mt-auto mb-[12px] font-bold text-h2-xs sm:text-h2-lg'}>{title}</h1>
                              <p class={'mt-auto mb-[4px] text-h6-xs sm:text-h6-md'}>{content.overview}</p>
                          </article>

                          <nav class={`relative z-10 flex items-center`}>
                              <Link href={`${pageUrl}/${content.id}`}>
                                  <Button>
                                      <PlayIcon width={20} height={20} class={`mr-[12px]`}/>
                                      Watch
                                  </Button>
                              </Link>
                          </nav>
                      </section>
                  }}
                  onPending={() => <Loader isVisible={true}/>}
                  onRejected={() => <EmptyList isVisible={true}/>}/>
    </section>
})
