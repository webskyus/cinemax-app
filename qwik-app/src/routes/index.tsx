import {component$} from "@builder.io/qwik";
import type {DocumentHead} from "@builder.io/qwik-city";
import {HeadBanner} from "~/components/head-banner";
import {ContentList} from "~/components/content-list";

// Genres
// content-list
// Popular Films Box With 10 Genres
// TV Shows
// Popular Films Box With 10 Genres
// Cartoons
// Popular Cartoons Box With 10 Genres

export default component$(() => {
    return (
        <section class={"text-white"}>
            <HeadBanner/>

            <ContentList />
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
