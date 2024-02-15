import { component$, useStore, useTask$ } from "@builder.io/qwik";
import { ContentCard } from "~/components/contend-card";
import { debounce, generateRandomLetter } from "~/utils";
import { apiMediaType } from "~/api/models";
import type { API_MEDIA_TYPE } from "~/api";
import { API, API_REQUEST_URLS } from "~/api";
import { EmptyMessage } from "~/components/ui/empty-message";

interface AutoCompleteStoreProps {
  searchInput: string;
  searchResults: any[];
  selectedValue: string;
  emptyList: boolean;
}

export const AutoComplete = component$(() => {
  const state = useStore<AutoCompleteStoreProps>({
    searchInput: generateRandomLetter(),
    searchResults: [],
    selectedValue: "",
    emptyList: false,
  });

  useTask$(async ({ track }) => {
    const searchInput = track(() => state.searchInput);
    console.log('dd.emptyList.1', state.emptyList)
    if (!searchInput) {
      state.searchResults = [];
      state.emptyList = true;
      return;
    }
    console.log('dd.emptyList.1', state.emptyList)
    const controller = new AbortController();
    state.searchResults = await debouncedGetContent(state, controller);
    state.emptyList = false;
    console.log('dd.emptyList.1', state.emptyList)
    if (!state.searchResults.length) state.emptyList = true;
    console.log('dd.emptyList.1', state.emptyList)
    return () => {
      controller.abort();
    };
  });

  return (
    <>
      <article class={"mb-[24px]"}>
        <input
          class={`
                        active::opacity-100 mb-[10px] h-[48px] w-[100%] border-b-[2px] 
                        border-solid border-primary pl-[12px] pr-[12px] opacity-50
                        transition-all focus:opacity-100
                        focus:outline-0 active:outline-0
                        dark:bg-grayscale-100 dark:text-grayscale-10
                    `}
          placeholder={"I wanna find my favorite movie, tv or person..."}
          type="text"
          onInput$={(ev, el) => {
            state.searchInput = el.value;
          }}
        />
      </article>
      <section
        class={` 
               relative
               mb-[96px] grid grid-cols-2 grid-rows-4 gap-2
               sm:grid-cols-4
               
               [@media(min-width:1600px)]:grid-cols-5
               [@media(min-width:1919px)]:grid-cols-6
               [@media(min-width:2419px)]:grid-cols-8
               [@media(min-width:2619px)]:grid-cols-9
               [@media(min-width:3000px)]:grid-cols-10
        `}
      >
        {
          state.emptyList && 
        }
        <EmptyMessage />
        <SearchResultList state={state} />
      </section>
    </>
  );
});

export const SearchResultList = component$(
  (props: { state: AutoCompleteStoreProps }) => {
    const { state } = props;

    return (
      <>
        {state.searchResults.length
          ? state.searchResults.map((content) => {
              return (
                <ContentCard
                  key={content.id}
                  data={content}
                  type={apiMediaType[content.media_type as API_MEDIA_TYPE]}
                />
              );
            })
          : ""}
      </>
    );
  },
);

const getContent = async (
  state: AutoCompleteStoreProps,
  controller?: AbortController,
): Promise<[]> => {
  const res = await fetch(
    `${API.URL}/${API_REQUEST_URLS.SEARCH}?query=${state.searchInput}`,
    {
      ...API.OPTIONS,
      signal: controller?.signal,
    },
  );
  const json = await res.json();

  return json.results;
};

export const debouncedGetContent = debounce(getContent, 1000);
