import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { Loader } from "~/components/ui/loader";
import { CATEGORY } from "~/components/ui/label";
import { API, API_REQUEST_URLS } from "~/api";
import type { Cast } from "~/api/models";
import { useLocation } from "@builder.io/qwik-city";
import { ContentCardXL } from "~/components/contend-card-xl";
import { EmptyMessage } from "~/components/ui/empty-message";
import { ErrorMessage } from "~/components/ui/error-message";

type CreditListType = CATEGORY.MOVIE | CATEGORY.TV_SHOW;

type CastListTypeProps = {
  API: API_REQUEST_URLS;
  TITLE: CATEGORY;
};

interface CreditListProps {
  type: CreditListType;
}

const CREDIT_TYPE: Record<CreditListType, CastListTypeProps> = {
  [CATEGORY.MOVIE]: {
    API: API_REQUEST_URLS.MOVIE_DETAILS,
    TITLE: CATEGORY.CREDITS_MOVIE,
  },
  [CATEGORY.TV_SHOW]: {
    API: API_REQUEST_URLS.TV_SHOW_DETAILS,
    TITLE: CATEGORY.CREDITS_TV_SHOW,
  },
};

export const CreditList = component$((props: CreditListProps) => {
  const { params } = useLocation();
  const { type } = props;
  const apiRequestUrl = CREDIT_TYPE[type].API;
  const pageTitle = CREDIT_TYPE[type].TITLE;

  const creditList = useResource$(async ({ track }) => {
    track(() => params.id);

    const res = await fetch(
      `${API.URL}/${apiRequestUrl}/${params.id}/${API_REQUEST_URLS.CREDITS}`,
      API.OPTIONS,
    );
    const json = await res.json();

    return json.cast as Cast[];
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
          {pageTitle}
        </h2>
      </nav>

      <section class={`relative min-h-[350px]`}>
        <Resource
          value={creditList}
          onResolved={(casts) => {
            const rows = Math.round(casts.length) / 4;

            return (
              <section
                class={`
                                       grid grid-cols-2 sm:grid-cols-4 grid-rows-${rows} gap-2
                                      
                                       
                                       [@media(min-width:1600px)]:grid-cols-5
                                       [@media(min-width:1919px)]:grid-cols-6
                                       [@media(min-width:2419px)]:grid-cols-8
                                       [@media(min-width:2619px)]:grid-cols-9
                                       [@media(min-width:3000px)]:grid-cols-10
                                `}
              >
                {casts.length ? (
                  casts.map((cast) => {
                    return (
                      <ContentCardXL
                        data={cast}
                        type={CATEGORY.PEOPLE}
                        key={cast.id}
                      />
                    );
                  })
                ) : (
                  <EmptyMessage />
                )}
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
