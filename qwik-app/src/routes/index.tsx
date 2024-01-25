import {component$} from "@builder.io/qwik";
import type {DocumentHead} from "@builder.io/qwik-city";
import {HeadBanner} from "~/components/head-banner";

export default component$(() => {
    return (
        <section class={"text-white"}>
            <HeadBanner/>
        </section>
    );
});

export const head: DocumentHead = {
    title: "CineMax - your online cinema",
    meta: [
        {
            name: "description",
            content: "CineMax movie streaming web app. You can watch all your favorite movie and tv shows, also check new trending video content.",
        },
    ],
};
