import {$, component$, Resource, useResource$, useSignal} from "@builder.io/qwik";
import {Image, ImageTransformerProps, useImageProvider} from "qwik-image";
import {Button, BUTTON_TYPE} from "~/components/ui/button";
import {StarIcon} from "~/components/icons/star-icon";
import {Loader} from "~/components/ui/loader";
import {ErrorMessage} from "~/components/ui/error-message";
import errorPlaceholder from "/img/error-placeholder.svg";
import {API, API_REQUEST_URLS, EXTERNAL_LINK} from "~/api";
import {PersonDetails, PersonExternalIDS} from "~/api/models";
import {Link, useLocation} from "@builder.io/qwik-city";
import {IMBDIcon} from "~/components/icons/imbd-icon";
import {TwitterIcon} from "~/components/icons/twitter-icon";
import {InstagramIcon} from "~/components/icons/instagram-icon";
import {FacebookIcon} from "~/components/icons/facebook-icon";
import {SocialNetwork} from "~/components/person-content-view/components/social-network";

export const PersonContentViewHead = component$(() => {
    const {params} = useLocation();
    const externalIDS = useSignal<PersonExternalIDS>();

    const content = useResource$(async ({track}) => {
        track(() => params.id);

        // GET PERSON DETAILS
        const res = await fetch(`${API.URL}/${API_REQUEST_URLS.PERSON_DETAILS}/${params.id}`, API.OPTIONS);
        const json = await res.json();

        // GET PERSON EXTERNAL IDS
        const resExtIds = await fetch(`${API.URL}/${API_REQUEST_URLS.PERSON_DETAILS}/${params.id}/${API_REQUEST_URLS.PERSON_EXTERNAL_IDS}`, API.OPTIONS);
        externalIDS.value = await resExtIds.json();

        return json as PersonDetails;
    });

    const imageTransformer$ = $(
        ({src}: ImageTransformerProps): string => {
            if (src) return `${API.CONFIGURE_IMAGES_URL()}/${src}`;

            return errorPlaceholder;
        }
    );

    useImageProvider({
        resolutions: [960],
        imageTransformer$,
    });


    return <section class={`relative min-h-[500px]`}>
        <Resource value={content}
                  onResolved={(content) => {
                      return <section
                          class={`
                                                        relative flex flex-col sm:flex-row
                                                        w-[100%] min-h-[500px] p-[24px] 
                                                        text-grayscale-100 dark:text-grayscale-10
                                                        bg bg-label-gradient bg-no-repeat bg-center bg-cover
                                                        rounded-[6px] overflow-hidden
                                                        
                                                        after:absolute after:top-[0] after:bottom-[0] after:right-[0] after:left-[0] 
                                                        after:bg-grayscale-100 after:opacity-70 -z-1
                                `}>
                          <aside class={`
                                                    relative z-10 min-w-[280px] h-[400px] mb-[12px] 
                                                    sm:mb-[0px] sm:min-w-[320px] sm:h-[446px]
                                                    rounded-[6px] overflow-hidden
                                  `}>
                              <Image src={content.profile_path}
                                     layout="constrained"
                                     width={320}
                                     height={446}
                                     class={`
                                                !min-w-[280px] !min-h-[400px] !sm:min-w-[320px] !sm:min-h-[446px]
                                         `}
                                     placeholder={"var(--grayscale-10)"}
                                     title={"Content title"}
                                     alt={"Content poster"}
                              />
                          </aside>

                          <article class={`relative z-10 sm:pl-[24px] text-grayscale-10`}>
                              <h1 class={`font-bold text-h3-sm md:text-h3-sm lg:sm:text-h3-lg mb-[8px]`}>
                                  {content.name}
                              </h1>

                              <ul class={`flex flex-wrap font-semibold text-h6-xs sm:text-h6-sm`}>
                                  <li class={`
                                            relative mb-[4px] pr-[16px] whitespace-nowrap
                                            after:content-[''] after:absolute after:right-[5px] 
                                            after:top-[0] after:w-[5px] after:h-[5px] after:mt-[5px] 
                                            after:rounded-[50%] after:bg-primary
                                     `}>
                                      {content.known_for_department}
                                  </li>

                                  <li class={`
                                            relative mb-[4px] pr-[16px] whitespace-nowrap
                                            after:content-[''] after:absolute after:right-[5px] 
                                            after:top-[0] after:w-[5px] after:h-[5px] after:mt-[5px] 
                                            after:rounded-[50%] after:bg-primary
                                     `}>
                                      {content.birthday}
                                  </li>

                                  <li class={`
                                            relative mb-[4px] pr-[16px] whitespace-nowrap
                                     `}>
                                      {content.place_of_birth}
                                  </li>
                              </ul>


                              <ul class={`flex items-center mb-[12px]`}>
                                  <li>
                                      <Button customClass={`!pl-[0px] !pr-[0px]`} type={BUTTON_TYPE.TEXT}>
                                          <StarIcon class={`mr-[4px] translate-y-[-1px]`}/>
                                          {content.popularity.toFixed(1)}
                                      </Button>
                                  </li>
                              </ul>

                              {
                                  content.biography
                                      ? <>
                                          <h5 class={`font-semibold text-h5-sm sm:text-h5-md mb-[8px]`}>Biography</h5>
                                          <p class={`text-h6-sm leading-[24px] sm:text-h6-md mb-[24px] whitespace-break-spaces`}>
                                              {content.biography}
                                          </p>
                                      </>
                                      : ''
                              }

                              <SocialNetwork externalIDS={externalIDS.value} />

                          </article>
                      </section>
                  }}
                  onPending={() => <Loader isVisible={true}/>}
                  onRejected={() => <ErrorMessage isVisible={true}/>}/>
    </section>
})
