import {component$, useStore, useTask$} from "@builder.io/qwik";
import {ContentCardXL} from "~/components/contend-card-xl";
import {debounce, generateRandomLetter} from "~/utils";
import {apiMediaType} from "~/api/models";
import {API, API_MEDIA_TYPE, API_REQUEST_URLS} from "~/api";
import {EmptyMessage} from "~/components/ui/empty-message";

interface AutoCompleteStoreProps {
    searchInput: string,
    searchResults: any[],
    selectedValue: string,
    emptyList: boolean
}

export const AutoComplete = component$(() => {
    const state = useStore<AutoCompleteStoreProps>({
        searchInput: generateRandomLetter(),
        searchResults: [],
        selectedValue: '',
        emptyList: false
    });

    useTask$(async ({track}) => {
        const searchInput = track(() => state.searchInput);

        if (!searchInput) {
            state.searchResults = [];
            state.emptyList = true;
            return;
        }

        const controller = new AbortController();
        state.searchResults = await debouncedGetContent(state, controller);
        state.emptyList = false;

        if (!state.searchResults?.length) state.emptyList = true;

        return () => {
            controller.abort();
        };
    });

    return <>
        <article class={'mb-[24px]'}>
            <input class={`
                        w-[100%] h-[48px] mb-[10px] pr-[12px] pl-[12px] 
                        border-b-[2px] border-solid border-primary opacity-50 transition-all
                        focus:outline-0 active:outline-0
                        focus:opacity-100 active::opacity-100
                        dark:bg-grayscale-100 dark:text-grayscale-10
                    `}
                   placeholder={"I wanna find my favorite movie, tv or person..."}
                   type="text"
                   onInput$={(ev, el) => {
                       state.searchInput = el.value;
                   }}/>
        </article>
        <section class={` 
               relative
               grid grid-cols-2 sm:grid-cols-4 grid-rows-4 gap-2
               mb-[96px]
               
               [@media(min-width:1600px)]:grid-cols-5
               [@media(min-width:1919px)]:grid-cols-6
               [@media(min-width:2419px)]:grid-cols-8
               [@media(min-width:2619px)]:grid-cols-9
               [@media(min-width:3000px)]:grid-cols-10
        `}>
            <EmptyMessage isVisible={state.emptyList}/>
            <SearchResultList state={state}/>
        </section>
    </>
});

export const SearchResultList = component$((props: {state: AutoCompleteStoreProps}) => {
    const {state} = props;

    return <>
        {
            state.searchResults?.length
                ? state.searchResults.map((content) => {
                    return <ContentCardXL key={content.id} data={content}
                                          type={apiMediaType[content.media_type as API_MEDIA_TYPE]}/>
                })
                : ''
        }
    </>
})

const getContent = async (state: AutoCompleteStoreProps, controller?: AbortController): Promise<[]> => {
    const res = await fetch(`${API.URL}/${API_REQUEST_URLS.SEARCH}?query=${state.searchInput}`, {
        ...API.OPTIONS,
        signal: controller?.signal,
    });
    const json = await res.json();

    return json.results;
}


export const debouncedGetContent = debounce(getContent, 1000);
