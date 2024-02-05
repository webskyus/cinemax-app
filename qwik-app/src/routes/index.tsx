import {component$} from "@builder.io/qwik";
import {HeadBanner} from "~/components/head-banner";
import {ContentList} from "~/components/content-list";
import {CATEGORY} from "~/components/ui/label";

export default component$(() => {
    return (
        <section class={"text-white pb-[96px]"}>
            {/*POPULAR TV BANNER*/}
            <HeadBanner type={CATEGORY.TV_SHOW}/>

            {/*GENRES*/}

            {/*MOVIE*/}
            <ContentList type={CATEGORY.MOVIE} page={2} />

            {/*POPULAR TV SHOW GENRES*/}

            {/*TV SHOW*/}
            <ContentList type={CATEGORY.TV_SHOW} />

            {/*PEOPLE*/}
            <ContentList type={CATEGORY.PEOPLE} />
        </section>
    );
});

