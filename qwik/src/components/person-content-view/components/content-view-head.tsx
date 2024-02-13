import {
  $,
  component$,
  Resource,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import type { ImageTransformerProps } from "qwik-image";
import { Image, useImageProvider } from "qwik-image";
import { Button, BUTTON_TYPE } from "~/components/ui/button";
import { StarIcon } from "~/components/icons/star-icon";
import { Loader } from "~/components/ui/loader";
import { ErrorMessage } from "~/components/ui/error-message";
import errorPlaceholder from "/public/img/error-placeholder.svg?url";
import { API, API_REQUEST_URLS } from "~/api";
import type { PersonDetails, PersonExternalIDS } from "~/api/models";
import { useLocation } from "@builder.io/qwik-city";
import { SocialNetwork } from "~/components/person-content-view/components/social-network";

export const PersonContentViewHead = component$(() => {
  const { params } = useLocation();
  const externalIDS = useSignal<PersonExternalIDS>();

  const content = useResource$(async ({ track }) => {
    track(() => params.id);

    // GET PERSON DETAILS
    const res = await fetch(
      `${API.URL}/${API_REQUEST_URLS.PERSON_DETAILS}/${params.id}`,
      API.OPTIONS,
    );
    const json = await res.json();

    // GET PERSON EXTERNAL IDS
    const resExtIds = await fetch(
      `${API.URL}/${API_REQUEST_URLS.PERSON_DETAILS}/${params.id}/${API_REQUEST_URLS.PERSON_EXTERNAL_IDS}`,
      API.OPTIONS,
    );
    externalIDS.value = await resExtIds.json();

    return json as PersonDetails;
  });

  const imageTransformer$ = $(({ src }: ImageTransformerProps): string => {
    if (src) return `${API.CONFIGURE_IMAGES_URL()}/${src}`;

    return errorPlaceholder;
  });

  useImageProvider({
    resolutions: [960],
    imageTransformer$,
  });

  return (
    <section class={`relative min-h-[500px]`}>
      <Resource
        value={content}
        onResolved={(content) => {
          return (
            <section
              class={`
                                                        bg -z-1 relative flex
                                                        min-h-[500px] w-[100%] flex-col 
                                                        overflow-hidden rounded-[6px]
                                                        bg-label-gradient bg-cover bg-center bg-no-repeat p-[24px]
                                                        text-grayscale-100 after:absolute
                                                        
                                                        after:bottom-[0] after:left-[0] after:right-[0] after:top-[0] after:bg-grayscale-100 
                                                        after:opacity-70 dark:text-grayscale-10 sm:flex-row
                                `}
            >
              <aside
                class={`
                                                    relative z-10 mb-[12px] h-[400px] min-w-[280px] 
                                                    overflow-hidden rounded-[6px] sm:mb-[0px]
                                                    sm:h-[446px] sm:min-w-[320px]
                                  `}
              >
                <Image
                  src={content.profile_path}
                  layout="constrained"
                  width={320}
                  height={446}
                  class={`
                                                !sm:min-w-[320px] !sm:min-h-[446px] !min-h-[400px] !min-w-[280px]
                                         `}
                  placeholder={"var(--grayscale-10)"}
                  title={"Content title"}
                  alt={"Content poster"}
                />
              </aside>

              <article class={`relative z-10 text-grayscale-10 sm:pl-[24px]`}>
                <h1
                  class={`mb-[8px] text-h3-sm font-bold md:text-h3-sm lg:sm:text-h3-lg`}
                >
                  {content.name}
                </h1>

                <ul
                  class={`text-h6-xs flex flex-wrap font-semibold sm:text-h6-sm`}
                >
                  <li
                    class={`
                                            relative mb-[4px] whitespace-nowrap pr-[16px]
                                            after:absolute after:right-[5px] after:top-[0] 
                                            after:mt-[5px] after:h-[5px] after:w-[5px] after:rounded-[50%] 
                                            after:bg-primary after:content-['']
                                     `}
                  >
                    {content.known_for_department}
                  </li>

                  <li
                    class={`
                                            relative mb-[4px] whitespace-nowrap pr-[16px]
                                            after:absolute after:right-[5px] after:top-[0] 
                                            after:mt-[5px] after:h-[5px] after:w-[5px] after:rounded-[50%] 
                                            after:bg-primary after:content-['']
                                     `}
                  >
                    {content.birthday}
                  </li>

                  <li
                    class={`
                                            relative mb-[4px] whitespace-nowrap pr-[16px]
                                     `}
                  >
                    {content.place_of_birth}
                  </li>
                </ul>

                <ul class={`mb-[12px] flex items-center`}>
                  <li>
                    <Button
                      customClass={`!pl-[0px] !pr-[0px]`}
                      type={BUTTON_TYPE.TEXT}
                    >
                      <StarIcon class={`mr-[4px] translate-y-[-1px]`} />
                      {content.popularity.toFixed(1)}
                    </Button>
                  </li>
                </ul>

                {content.biography ? (
                  <>
                    <h5
                      class={`mb-[8px] text-h5-sm font-semibold sm:text-h5-md`}
                    >
                      Biography
                    </h5>
                    <p
                      class={`mb-[24px] whitespace-break-spaces text-h6-sm leading-[24px] sm:text-h6-md`}
                    >
                      {content.biography}
                    </p>
                  </>
                ) : (
                  ""
                )}

                <SocialNetwork externalIDS={externalIDS.value} />
              </article>
            </section>
          );
        }}
        onPending={() => <Loader isVisible={true} />}
        onRejected={() => <ErrorMessage isVisible={true} />}
      />
    </section>
  );
});
