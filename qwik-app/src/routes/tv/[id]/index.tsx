import {component$} from "@builder.io/qwik";
import {CATEGORY} from "~/components/ui/label";
import {ContentView} from "~/components/content-view";

export default component$(() => {
    return <ContentView type={CATEGORY.TV_SHOW}/>
})
