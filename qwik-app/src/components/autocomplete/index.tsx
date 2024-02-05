import {component$, useStore, useTask$} from "@builder.io/qwik";
import {ContentCardXL} from "~/components/contend-card-xl";
import {API_MEDIA_TYPE, API_REQUEST_URLS, API_URL, OPTIONS} from "~/api";
import {debounce} from "~/utils";
import {CATEGORY} from "~/components/ui/label";

interface IState {
    searchInput: string;
    searchResults: any[];
    selectedValue: string;
}

export const AutoComplete = component$(() => {
    const state = useStore<IState>({
        searchInput: '',
        searchResults: [],
        selectedValue: '',
    });

    useTask$(async ({track}) => {
        const searchInput = track(() => state.searchInput);

        if (!searchInput) {
            state.searchResults = [];
            return;
        }

        const controller = new AbortController();
        state.searchResults = await debouncedGetContent(state.searchInput, controller);

        return () => {
            controller.abort();
        };
    });

    return (
        <div>
            <input class={`mb-[10px] border-[2px] border-solid border-pink-500`} type="text"
                   onInput$={(ev, el) => (state.searchInput = el.value)}/>
            <SuggestionsListComponent state={state}/>
        </div>
    );
});

export const SuggestionsListComponent = (props: { state: IState }) => {
    const searchResults = props.state.searchResults;

    return searchResults?.length
        ? searchResults.map((content) => {
            const convertedTypes = {
                [API_MEDIA_TYPE.MOVIE]: CATEGORY.MOVIE,
                [API_MEDIA_TYPE.TV]: CATEGORY.TV_SHOW,
                [API_MEDIA_TYPE.PERSON]: CATEGORY.PEOPLE,
            };

            return <ContentCardXL key={content.id} data={content} type={convertedTypes[content.media_type]}/>
        })
        : <p>
            Empty list...
        </p>
};

const getContent = async (searchInput: string, controller?: AbortController): Promise<string[]> => {
    const res = await fetch(`${API_URL}/${API_REQUEST_URLS.SEARCH}?query=${searchInput}`, {
        ...OPTIONS,
        signal: controller?.signal,
    });
    const json = await res.json();

    console.log('json', json)
    return json.results as any[];
}


export const debouncedGetContent = debounce(getContent, 300);
