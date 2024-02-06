import {component$} from "@builder.io/qwik";
import {ContentList} from "~/components/content-list";
import {CATEGORY} from "~/components/ui/label";
import {HeadBanner} from "~/components/head-banner";

export default component$(() => {
    return <section class={"text-white pb-[96px]"}>
        {/*POPULAR TV BANNER*/}
        <HeadBanner type={CATEGORY.TV_SHOW}/>

        {/*TV SHOW*/}
        <ContentList type={CATEGORY.ON_THE_AIR} />
    </section>
})
