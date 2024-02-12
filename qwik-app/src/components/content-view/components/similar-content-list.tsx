import {component$, Resource, useResource$} from "@builder.io/qwik";
import {Loader} from "~/components/ui/loader";
import {API, API_REQUEST_URLS} from '~/api';
import {Movie, Person} from "~/api/models";
import {CATEGORY} from "~/components/ui/label";
import {ContentCardXL} from "~/components/contend-card-xl";
import {ErrorMessage} from "~/components/ui/error-message";
import {useLocation} from "@builder.io/qwik-city";
import {EmptyMessage} from "~/components/ui/empty-message";

type SimilarContentType = CATEGORY.MOVIE | CATEGORY.TV_SHOW;

type SimilarContentProps = {
    API: API_REQUEST_URLS,
    TITLE: CATEGORY
}

interface SimilarContentListProps {
    type: SimilarContentType
}

const SIMILAR_CONTENT_TYPE: Record<SimilarContentType, SimilarContentProps> = {
    [CATEGORY.MOVIE]: {
        API: API_REQUEST_URLS.MOVIE_DETAILS,
        TITLE: CATEGORY.SIMILAR_MOVIE
    },
    [CATEGORY.TV_SHOW]: {
        API: API_REQUEST_URLS.TV_SHOP_DETAILS,
        TITLE: CATEGORY.SIMILAR_TV_SHOW
    }
}

export const SimilarContentList = component$((props: SimilarContentListProps) => {
    const {params} = useLocation();
    const {type} = props;
    const apiRequestUrl = SIMILAR_CONTENT_TYPE[type].API;
    const pageTitle = SIMILAR_CONTENT_TYPE[type].TITLE;

    const contentList = useResource$(async ({track}) => {
        track(() => params.id);

        const res = await fetch(`${API.URL}/${apiRequestUrl}/${params.id}/${API_REQUEST_URLS.SIMILAR}`, API.OPTIONS);
        const json = await res.json();

        return json.results as Movie[] | Person[];
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
                {pageTitle}
            </h2>
        </nav>

        <section class={`relative min-h-[500px]`}>
            <Resource value={contentList}
                      onResolved={(contents) => {
                          return <section class={`
                                grid grid-cols-2 sm:grid-cols-4 grid-rows-4 gap-2
                                
                                [@media(min-width:1600px)]:grid-cols-5
                                [@media(min-width:1919px)]:grid-cols-6
                                [@media(min-width:2419px)]:grid-cols-8
                                [@media(min-width:2619px)]:grid-cols-9
                                [@media(min-width:3000px)]:grid-cols-10
                          `}>
                              {
                                  contents.length
                                      ? contents.map((content) => {
                                          return <ContentCardXL key={content.id} type={type} data={content}/>
                                      })
                                      : <EmptyMessage/>
                              }
                          </section>
                      }}
                      onPending={() => <Loader isVisible={true}/>}
                      onRejected={() => <ErrorMessage isVisible={true}/>}
            />
        </section>
    </section>
})
