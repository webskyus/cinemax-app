import {component$} from "@builder.io/qwik";
import {CATEGORY, Label} from "~/components/label";

export const HeadBanner = component$(() => {
    return <section class={`
        relative 
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
            relative z-10 
            flex-col h-[100%] pr-[12px]
        `}>
            <Label type={CATEGORY.TV_SHOWS}/>
            <h1 class={'mt-auto mb-[12px] font-bold text-h1-lg'}>Avengers: Endgame</h1>

            <ul class={`
                flex items-center mb-[12px]
                text-grayscale-50 font-semibold
            `}>
                <li class={`mr-[10px]`}>Popular</li>
                <li class={`mr-[10px]`}>6.8</li>
                <li class={`mr-[10px]`}>2022</li>
                <li class={`mr-[10px]`}>приключения боевик Испания</li>
                <li class={`mr-[10px]`}>1ч 56мин</li>
                <li class={`mr-[10px]`}>12+</li>
            </ul>

            <p class={`w-[55%] text-h6-md line`}>
                Отчаянные авантюристы ищут золото Магеллана. Том Холланд и Марк Уолберг в блокбастере по культовой
                видеоигре
            </p>

            <button>Watch</button>
            <button>Add to favorites</button>
            <button>Watched</button>
        </article>

        <nav class={`hidden`}>
            <ul>
                <li>
                    <button>About</button>
                </li>
                <li>
                    <button>Details</button>
                </li>
            </ul>
        </nav>
    </section>
})
