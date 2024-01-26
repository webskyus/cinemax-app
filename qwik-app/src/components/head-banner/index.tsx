import {component$} from "@builder.io/qwik";
import {CATEGORY, Label} from "../ui/label";
import {Play} from "~/components/starter/icons/play";
import {Watchlist} from "~/components/starter/icons/watchlist";
import {EyeOff} from "~/components/starter/icons/eye-off";
import {Button, BUTTON_TYPE} from "~/components/ui/button";

export const HeadBanner = component$(() => {
    return <section class={`
        relative flex flex-col
        w-[100%] min-h-[400px] p-[24px]
        bg-pink-300 bg-head-banner bg-no-repeat bg-center bg-cover
        rounded-[6px]
        
        after:absolute after:top-[0] after:bottom-[0] after:right-[0] after:left-[0] after:bg-grayscale-100 after:opacity-50 -z-1
        
        [@media(min-width:1900px)]:h-[500px]
        [@media(min-width:2100px)]:h-[600px]
        [@media(min-width:2200px)]:h-[800px]
        [@media(min-width:2400px)]:h-[1000px]
    `}>
        <article class={`
            relative z-10 mt-auto mb-[32px]
            pr-[12px]
        `}>
            <Label type={CATEGORY.TV_SHOWS}/>
            <h1 class={'mt-auto mb-[12px] font-bold text-h2-sm sm:text-h2-lg'}>Avengers: Endgame</h1>

            <ul class={`
                flex flex-wrap sm:flex-nowrap items-center mb-[12px]
                text-grayscale-50 font-semibold
            `}>
                <li class={`m-[4px] sm:mr-[12px]`}>1 Season</li>
                <li class={`m-[4px] sm:mr-[12px]`}>6 Episodes</li>
                <li class={`m-[4px] sm:mr-[12px]`}>Superhero</li>
                <li class={`m-[4px] sm:mr-[12px]`}>Marvel</li>
            </ul>
        </article>


     <nav class={`relative z-10 flex items-center`}>
         <Button>
             <Play width={20} height={20} class={`mr-[12px]`}/>
             Watch
         </Button>

         <Button customClass={`ml-[12px] mr-[12px]`} type={BUTTON_TYPE.TEXT}>
            <Watchlist class={`hover:animate-pulse`} width={20} height={20}/>
        </Button>

         <Button type={BUTTON_TYPE.TEXT}>
            <EyeOff class={`hover:animate-pulse`} width={20} height={20}/>
        </Button>
     </nav>
    </section>
})
