import {component$, Slot, useSignal, useStyles$} from "@builder.io/qwik";
import type {RequestHandler} from "@builder.io/qwik-city";

import Header from "../components/starter/header/header";
import {Sidebar} from "~/components/starter/sidebar";
import {Widgets} from "~/components/starter/widgets";

import styles from "./styles.css?inline";


export const onGet: RequestHandler = async ({cacheControl}) => {
    // Control caching for this request for best performance and to reduce hosting costs:
    // https://qwik.builder.io/docs/caching/
    cacheControl({
        // Always serve a cached response by default, up to a week stale
        staleWhileRevalidate: 60 * 60 * 24 * 7,
        // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
        maxAge: 5,
    });
};

export default component$(() => {
    useStyles$(styles);

    return (
        <>
            <Header/>
            <main class={`
                h-[100%] pl-[15px] xl:pl-[272px] pr-[15] 2xl:pr-[272px] 
                pt-[15px] pb-[15px] max-w-[2200px]
                overflow-auto scrollbar-hide
                [@media(min-width:2720px)]:pl-[15px]
                [@media(min-width:2720px)]:pr-[15px]
                [@media(min-width:2720px)]:mx-[auto]
            `}>
                <Sidebar/>
                <Slot/>
                <Widgets/>
            </main>
        </>
    );
});
