import {component$} from "@builder.io/qwik";
import {useLocation} from "@builder.io/qwik-city";
import {ContentViewHead} from "~/components/content-view/components/content-view-head";
import {CATEGORY} from "~/components/ui/label";
import {RecommendedContentList} from "~/components/content-view/components/recommended-content-list";

interface ContentViewProps {
    type: CATEGORY.MOVIE | CATEGORY.TV_SHOW,
}

export const ContentView = component$((props: ContentViewProps) => {
    const {type} = props;
    const {params: {id}} = useLocation();

    return <section class={`container mx-auto`}>
       {/*MOVIE INFO BANNER*/}
       <ContentViewHead type={type}/>

        {/*RECOMMENDATIONS*/}
        <RecommendedContentList type={type} />
    </section>
})
