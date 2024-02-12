import {
  component$,
  Resource,
  useResource$,
} from "@builder.io/qwik";
import { Loader } from "~/components/ui/loader";
import type { API_MEDIA_TYPE } from "~/api";
import { API, API_REQUEST_URLS } from "~/api";
import type { Movie, TV } from "~/api/models";
import { apiMediaType } from "~/api/models";
import { ContentCardXL } from "~/components/contend-card-xl";
import { ErrorMessage } from "~/components/ui/error-message";
import { useLocation } from "@builder.io/qwik-city";
import { CATEGORY } from "~/components/ui/label";

export const CombinedContentList = component$(() => {
  const { params } = useLocation();

  const contentList = useResource$(async ({ track }) => {
    track(() => params.id);

    const res = await fetch(
      `${API.URL}/${API_REQUEST_URLS.PERSON_DETAILS}/${params.id}/${API_REQUEST_URLS.COMBINED_CREDITS}`,
      API.OPTIONS,
    );
    const json = await res.json();

    return json.cast as Movie[] | TV[];
  });

  return (
    <section class={`pb-[24px] pt-[24px]`}>
      <nav
        class={`
            mb-[12px] flex items-center  
            justify-between 
        `}
      >
        <h2
          class={`
                    bg-gradient-to-br 
                    from-primary to-grayscale-70 bg-clip-text
                    pb-[12px] text-h3-sm font-bold text-transparent sm:text-h3-lg
                `}
        >
          {CATEGORY.CREDITS_COMBINED}
        </h2>
      </nav>

      <section class={`relative min-h-[500px]`}>
        <Resource
          value={contentList}
          onResolved={(contents) => {
            return (
              <section
                class={`
                                grid grid-cols-2 grid-rows-4 gap-2 sm:grid-cols-4
                                
                                [@media(min-width:1600px)]:grid-cols-5
                                [@media(min-width:1919px)]:grid-cols-6
                                [@media(min-width:2419px)]:grid-cols-8
                                [@media(min-width:2619px)]:grid-cols-9
                                [@media(min-width:3000px)]:grid-cols-10
                          `}
              >
                {contents.map((content) => {
                  return (
                    <ContentCardXL
                      key={content.id}
                      type={apiMediaType[content.media_type as API_MEDIA_TYPE]}
                      data={content}
                    />
                  );
                })}
              </section>
            );
          }}
          onPending={() => <Loader isVisible={true} />}
          onRejected={() => <ErrorMessage isVisible={true} />}
        />
      </section>
    </section>
  );
});
