import {component$, Resource, useResource$} from "@builder.io/qwik";
import {Movie, ContentCardXL} from "~/components/content-list/components/contend-card-xl";
import {Button, BUTTON_TYPE} from "~/components/ui/button";
import {Next} from "~/components/starter/icons/next";
import {EmptyMessage} from "../ui/empty-message";
import {Loader} from "~/components/ui/loader";
import {API_URL, OPTIONS} from '~/api';
import {CATEGORY} from "../ui/label";

interface ContentListProps {
    type: keyof typeof CONTENT_TYPE
}

type CONTENT_TYPE_ITEMS = {
    API_TYPE: string
    TITLE: string
}

export const CONTENT_TYPE: Record<Exclude<CATEGORY, CATEGORY.PEOPLE>, CONTENT_TYPE_ITEMS> = {
    [CATEGORY.MOVIES]: {
        API_TYPE: 'movie',
        TITLE: CATEGORY.MOVIES,
    },
    [CATEGORY.TV_SHOWS]: {
        API_TYPE: 'tv',
        TITLE: CATEGORY.TV_SHOWS,
    },
}

export const ContentList = component$((props: ContentListProps) => {
    const {type} = props;
    const contentList = useResource$(async () => {
        const getContentApiType = CONTENT_TYPE[type].API_TYPE;
        const res = await fetch(`${API_URL}/discover/${getContentApiType}?sort_by=popularity.desc`, OPTIONS);
        const json = await res.json();

        return json.results as Movie[];
    });

    return <section class={`pt-[24px] pb-[24px]`}>
        <nav class={`
            flex items-center justify-between  
            mb-[24px] 
        `}>
            <h2 class={`
                    font-bold text-h3-sm sm:text-h3-lg
                    text-transparent bg-clip-text bg-gradient-to-br from-primary to-grayscale-70
                `}>
                {CONTENT_TYPE[type].TITLE}
            </h2>

            <Button customClass={`uppercase`} type={BUTTON_TYPE.PRIMARY_SMALL}>
                <Next class={`mr-[12px]`}/>
                See all
            </Button>
        </nav>

        <section class={`
               grid grid-cols-2 sm:grid-cols-4 grid-rows-4 gap-2
               
               [@media(min-width:1600px)]:grid-cols-5
               [@media(min-width:1919px)]:grid-cols-6
               [@media(min-width:2419px)]:grid-cols-8
        `}>
            <Resource value={contentList}
                      onResolved={(movies) => {
                          return <>
                              {
                                  movies.map((movie) => {
                                      return <ContentCardXL key={movie.id} type={type} data={movie}/>
                                  })
                              }
                          </>
                      }}
                      onPending={() => <Loader/>}
                      onRejected={() => <EmptyMessage/>}
            />
        </section>
    </section>
})
