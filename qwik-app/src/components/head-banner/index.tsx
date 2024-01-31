import {$, component$, Resource, useResource$, useSignal} from "@builder.io/qwik";
import {CATEGORY, Label} from "../ui/label";
import {Play} from "~/components/starter/icons/play";
import {Watchlist} from "~/components/starter/icons/watchlist";
import {Button, BUTTON_TYPE} from "~/components/ui/button";
import {API_URL, API_URL_TYPES, CONFIGURATE_IMAGES_API_URL, OPTIONS} from "~/api";
import {Movie, TV} from "~/components/contend-card-xl";
import {Loader} from "~/components/ui/loader";
import {EmptyMessage} from "~/components/ui/empty-message";
import {Link} from "@builder.io/qwik-city";
import {CONTENT_TYPE} from "~/components/content-list";

export const HeadBanner = component$(() => {
    const id = useSignal<null | number>(null);
    const singleContentItem = useResource$(async () => {
        const res = await fetch(`${API_URL}/${API_URL_TYPES.TV_SHOWS}`, OPTIONS);
        const json = await res.json();

        id.value = json.results[0].id;

        return json.results[0] as TV;
    });

    const handleAddToWishlist = $(() => {
            localStorage.setItem('wishlist', String(id.value));
    })

    return <Resource value={singleContentItem}
                     onResolved={(TV) => {
                         return <section
                             style={{background: `url(${CONFIGURATE_IMAGES_API_URL('original')}/${TV.backdrop_path}) no-repeat center/cover`}}
                             class={`
                                                relative flex flex-col
                                                w-[100%] min-h-[400px] p-[24px]
                                                bg-pink-300 bg-no-repeat bg-center bg-cover
                                                rounded-[6px]
                                                
                                                after:absolute after:top-[0] after:bottom-[0] after:right-[0] after:left-[0] after:bg-grayscale-100 after:opacity-70 -z-1
                                                
                                                [@media(min-width:1900px)]:h-[500px]
                                                [@media(min-width:2100px)]:h-[600px]
                                                [@media(min-width:2200px)]:h-[800px]
                                                [@media(min-width:2400px)]:h-[1000px]
                                `}>
                             <article class={`
                                            z-10 mt-auto mb-[32px]
                                            pr-[12px]
                             `}>
                                 <Label type={CATEGORY.TV_SHOWS}/>
                                 <h1 class={'mt-auto mb-[12px] font-bold text-h2-sm sm:text-h2-lg'}>{TV.name}</h1>
                                 <p class={'mt-auto mb-[12px] text-h6-sm sm:text-h6-md'}>{TV.overview}</p>

                             </article>

                             <nav class={`relative z-10 flex items-center`}>
                                 <Link href={`${CONTENT_TYPE[CATEGORY.TV_SHOWS].API_TYPE}/${TV.id}`}>
                                     <Button>
                                         <Play width={20} height={20} class={`mr-[12px]`}/>
                                         Watch
                                     </Button>
                                 </Link>

                                 <Button onClick={handleAddToWishlist}
                                         customClass={`ml-[12px] mr-[12px]`}
                                         type={BUTTON_TYPE.TEXT}>
                                     <Watchlist class={`hover:animate-pulse ${'fill-grayscale-10' || 'fill-primary'}`}
                                                width={20}
                                                height={20}
                                     />
                                 </Button>
                             </nav>
                         </section>
                     }}
                     onPending={() => <Loader/>}
                     onRejected={() => <EmptyMessage/>}/>


})
