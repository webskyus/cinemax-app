import {component$, Slot, useSignal, useStyles$} from "@builder.io/qwik";
import type {RequestHandler} from "@builder.io/qwik-city";

import Header from "../components/starter/header/header";
import {Sidebar} from "~/components/starter/sidebar";

import styles from "./styles.css?inline";
import {SIZES} from "~/utils/sizes";


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
    const MAIN_PL = useSignal(String(SIZES.SIDEBAR + SIZES.MAIN_PL));
    const MAIN_PR = useSignal(String(SIZES.WIDGETS + SIZES.MAIN_PR));
    const MAIN_PT = useSignal(String(SIZES.MAIN_PT));
    const MAIN_PB = useSignal(String(SIZES.MAIN_PB));

    useStyles$(styles);

    return (
        <>
            <Header/>
            <main class={`h-[100%] pl-[${MAIN_PL.value}px] pr-[${MAIN_PR.value}px] pt-[${MAIN_PT.value}px] pb-[${MAIN_PB}px]`}>
                {<Sidebar/>}
                <Slot/>
            </main>
        </>
    );
});
