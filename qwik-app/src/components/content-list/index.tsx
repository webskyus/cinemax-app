import {component$, Resource, useResource$} from "@builder.io/qwik";
import {Movie, ContentCardXL, People} from "../contend-card-xl";
import {EmptyList} from "../ui/empty-list";
import {Loader} from "~/components/ui/loader";
import {API_URL, API_REQUEST_URLS, OPTIONS} from '~/api';
import {CATEGORY} from "../ui/label";
import {URLS} from "~/utils/urls";

interface ContentListProps {
    type: keyof typeof CONTENT_TYPE,
    page?: number
}

type CONTENT_TYPE_ITEMS = {
    API_TYPE: string
    TITLE: string
    URL: URLS
}

type CONTENT_TYPES = Record<Exclude<CATEGORY, CATEGORY.POPULAR | CATEGORY.TOP_RATED | CATEGORY.TRENDING>, CONTENT_TYPE_ITEMS>;

export const CONTENT_TYPE: CONTENT_TYPES  = {
    [CATEGORY.MOVIE]: {
        API_TYPE: API_REQUEST_URLS.MOVIE,
        TITLE: CATEGORY.MOVIE,
        URL: URLS.MOVIE
    },
    [CATEGORY.PEOPLE]: {
        API_TYPE: API_REQUEST_URLS.PEOPLE,
        TITLE: CATEGORY.PEOPLE,
        URL: URLS.PEOPLE
    },
    [CATEGORY.TV_SHOW]: {
        API_TYPE: API_REQUEST_URLS.TV_SHOWS,
        TITLE: CATEGORY.TV_SHOW,
        URL: URLS.TV_SHOW
    },
    [CATEGORY.TOP_RATED_MOVIE]: {
        API_TYPE: API_REQUEST_URLS.TOP_RATED_MOVIE,
        TITLE: CATEGORY.TOP_RATED_MOVIE,
        URL: URLS.TOP_RATED
    },
    [CATEGORY.TOP_RATED_TV_SHOW]: {
        API_TYPE: API_REQUEST_URLS.TOP_RATED_TV_SHOW,
        TITLE: CATEGORY.TOP_RATED_TV_SHOW,
        URL: URLS.TOP_RATED
    },
    [CATEGORY.POPULAR_MOVIE]: {
        API_TYPE: API_REQUEST_URLS.POPULAR_MOVIE,
        TITLE: CATEGORY.POPULAR_MOVIE,
        URL: URLS.POPULAR
    },
    [CATEGORY.POPULAR_TV_SHOW]: {
        API_TYPE: API_REQUEST_URLS.POPULAR_TV_SHOW,
        TITLE: CATEGORY.POPULAR_TV_SHOW,
        URL: URLS.POPULAR
    },
    [CATEGORY.POPULAR_PEOPLE]: {
        API_TYPE: API_REQUEST_URLS.PEOPLE,
        TITLE: CATEGORY.POPULAR_PEOPLE,
        URL: URLS.POPULAR
    },
    [CATEGORY.NOW_PLAYING]: {
        API_TYPE: API_REQUEST_URLS.NOW_PLAYING,
        TITLE: CATEGORY.NOW_PLAYING,
        URL: URLS.NOW_PLAYING
    },
    [CATEGORY.COMING_SOON]: {
        API_TYPE: API_REQUEST_URLS.COMING_SOON,
        TITLE: CATEGORY.COMING_SOON,
        URL: URLS.COMING_SOON
    },
    [CATEGORY.TRENDING_MOVIE]: {
        API_TYPE: API_REQUEST_URLS.TRENDING_MOVIE,
        TITLE: CATEGORY.TRENDING_MOVIE,
        URL: URLS.TRENDING
    },
    [CATEGORY.TRENDING_TV_SHOW]: {
        API_TYPE: API_REQUEST_URLS.TRENDING_TV_SHOW,
        TITLE: CATEGORY.TRENDING_TV_SHOW,
        URL: URLS.TRENDING
    },
    [CATEGORY.TRENDING_PEOPLE]: {
        API_TYPE: API_REQUEST_URLS.TRENDING_PEOPLE,
        TITLE: CATEGORY.TRENDING_PEOPLE,
        URL: URLS.TRENDING
    },
    [CATEGORY.ON_THE_AIR]: {
        API_TYPE: API_REQUEST_URLS.ON_THE_AIR,
        TITLE: CATEGORY.ON_THE_AIR,
        URL: URLS.ON_THE_AIR
    },
    [CATEGORY.AIRING_TODAY]: {
        API_TYPE: API_REQUEST_URLS.AIRING_TODAY,
        TITLE: CATEGORY.AIRING_TODAY,
        URL: URLS.AIRING_TODAY
    },
}

export const ContentList = component$((props: ContentListProps) => {
    const {type, page = 1} = props;
    const contentList = useResource$(async () => {
        const getContentApiType = CONTENT_TYPE[type].API_TYPE;
        const res = await fetch(`${API_URL}/${getContentApiType}?page=${page}`, OPTIONS);
        const json = await res.json();

        return json.results as Movie[] | People[];
    });

    return <section class={`pt-[24px] pb-[24px]`}>
        <nav class={`
            flex items-center justify-between  
            mb-[12px] 
        `}>
            <h2 class={`
                    pb-[12px] 
                    font-bold text-h3-sm sm:text-h3-lg
                    text-transparent bg-clip-text bg-gradient-to-br from-primary to-grayscale-70
                `}>
                {CONTENT_TYPE[type].TITLE}
            </h2>
        </nav>

        <section class={`
               grid grid-cols-2 sm:grid-cols-4 grid-rows-4 gap-2
               
               [@media(min-width:1600px)]:grid-cols-5
               [@media(min-width:1919px)]:grid-cols-6
               [@media(min-width:2419px)]:grid-cols-8
               [@media(min-width:2619px)]:grid-cols-9
               [@media(min-width:3000px)]:grid-cols-10
        `}>
            <Resource value={contentList}
                      onResolved={(contents) => {
                          return <>
                              {
                                  contents.map((content) => {
                                      return <ContentCardXL key={content.id} type={type} data={content}/>
                                  })
                              }
                          </>
                      }}
                      onPending={() => <Loader isVisible={true}/>}
                      onRejected={() => <EmptyList isVisible={true}/>}
            />
        </section>
    </section>
})
