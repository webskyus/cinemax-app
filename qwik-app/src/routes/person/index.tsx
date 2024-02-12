import {component$} from "@builder.io/qwik";
import {HeadBanner} from "~/components/head-banner";
import {CATEGORY} from "~/components/ui/label";
import {ContentList} from "~/components/content-list";

export default component$(() => {
    return <section class={"text-white pb-[96px]"}>

        {/*POPULAR TV BANNER*/}
        <HeadBanner type={CATEGORY.MOVIE}/>

        {/*PEOPLE*/}
        <ContentList type={CATEGORY.PEOPLE} page={2}/>

    </section>
})
