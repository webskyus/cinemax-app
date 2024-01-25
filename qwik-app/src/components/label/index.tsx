import {component$} from "@builder.io/qwik";

export enum CATEGORY {
    TV_SHOWS = 'TV Shows',
    MOVIES = 'Movies',
    ANIME = 'Anime',
    PEOPLE = 'People',
    CARTOONS = 'Cartoons',
}

interface Props {
    type: CATEGORY
}

export const Label = component$((props: Props) => {
    return <article class={`
        inline-block 
        p-[5px] pl-[10px] pr-[10px] mb-[48px]
        bg-label-gradient
    `}>
        {props.type}
    </article>
})
