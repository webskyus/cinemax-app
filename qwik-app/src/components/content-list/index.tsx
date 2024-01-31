import {component$, Resource, useResource$} from "@builder.io/qwik";
import {Movie, ContentCardXL, People} from "../contend-card-xl";
import {Button, BUTTON_TYPE} from "~/components/ui/button";
import {Next} from "~/components/starter/icons/next";
import {EmptyMessage} from "../ui/empty-message";
import {Loader} from "~/components/ui/loader";
import {API_URL, API_URL_TYPES, OPTIONS} from '~/api';
import {CATEGORY} from "../ui/label";
import {Link} from "@builder.io/qwik-city";
import {URLS} from "~/utils/urls";

interface ContentListProps {
    type: keyof typeof CONTENT_TYPE
}

type CONTENT_TYPE_ITEMS = {
    API_TYPE: string
    TITLE: string
    URL: URLS
}

export const CONTENT_TYPE: Record<CATEGORY, CONTENT_TYPE_ITEMS> = {
    [CATEGORY.MOVIES]: {
        API_TYPE: API_URL_TYPES.MOVIE,
        TITLE: CATEGORY.MOVIES,
        URL: URLS.MOVIES
    },
    [CATEGORY.PEOPLE]: {
        API_TYPE: API_URL_TYPES.PEOPLE,
        TITLE: CATEGORY.PEOPLE,
        URL: URLS.PEOPLE
    },
    [CATEGORY.TV_SHOWS]: {
        API_TYPE: API_URL_TYPES.TV_SHOWS,
        TITLE: CATEGORY.TV_SHOWS,
        URL: URLS.TV_SHOWS
    },
}

export const ContentList = component$((props: ContentListProps) => {
    const {type} = props;
    const contentList = useResource$(async () => {
        const getContentApiType = CONTENT_TYPE[type].API_TYPE;
        const res = await fetch(`${API_URL}/${getContentApiType}`, OPTIONS);
        const json = await res.json();

        return json.results as Movie[] | People[];
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

           <Link href={`${CONTENT_TYPE[type].URL}`}>
               <Button customClass={`uppercase`} type={BUTTON_TYPE.PRIMARY_SMALL}>
                   <Next class={`mr-[12px]`}/>
                   discovery
               </Button>
           </Link>
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
