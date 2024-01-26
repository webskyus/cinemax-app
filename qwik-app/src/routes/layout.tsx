import {component$, Slot, useSignal, useStyles$} from "@builder.io/qwik";
import type {RequestHandler} from "@builder.io/qwik-city";

import Header from "../components/starter/header/header";
import {Sidebar} from "../components/ui/sidebar";

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
                h-[100%] pl-[24px] xl:pl-[293px] pr-[24px]
                pt-[33px] pb-[33px] 
                overflow-auto scrollbar-hide
            `}>
                <Sidebar/>
                <Slot/>
            </main>
        </>
    );
});
