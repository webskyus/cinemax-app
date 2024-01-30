import {component$} from "@builder.io/qwik";
import type {DocumentHead} from "@builder.io/qwik-city";
import {HeadBanner} from "~/components/head-banner";
import {ContentList} from "~/components/content-list";
import {CATEGORY} from "~/components/ui/label";
import {PeopleList} from "~/components/people-list";
import {ContentRatedList} from "~/components/content-rated-list";

export default component$(() => {
    return (
        <section class={"text-white pb-[96px]"}>
            <HeadBanner/>

            {/*POPULAR MOVIES GENRES*/}
            <ContentRatedList type={CATEGORY.MOVIES}/>

            {/*MOVIES*/}
            <ContentList type={CATEGORY.MOVIES} />

            {/*POPULAR TV SHOWS GENRES*/}

            {/*TV SHOWS*/}
            <ContentList type={CATEGORY.TV_SHOWS} />

            {/*PEOPLE*/}
            <PeopleList/>
        </section>
    );
});

export const head: DocumentHead = {
    title: "CineMax - your online cinema",
    meta: [
        {
            name: "description",
            content: "CineMax movie streaming web app. You can watch all your favorite movie and tv shows, also check new trending video content-list.",
        },
    ],
};
