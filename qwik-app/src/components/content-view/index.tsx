import {component$} from "@builder.io/qwik";
import {useLocation} from "@builder.io/qwik-city";
import {ContentViewHead} from "~/components/content-view/components/content-view-head";
import {CATEGORY} from "~/components/ui/label";

export const ContentView = component$(() => {
    const {params: {id}} = useLocation();

    return <section class={`container mx-auto`}>
       <ContentViewHead contentId={id} type={CATEGORY.MOVIE}/>
    </section>
})
