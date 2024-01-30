import {component$} from "@builder.io/qwik";

export enum CATEGORY {
    TV_SHOWS = 'TV Shows',
    MOVIES = 'Movies',
    PEOPLE = 'People',
}

interface Props {
    type: CATEGORY
}

export const Label = component$((props: Props) => {
    const {type} = props;

    return <article class={`
        inline-block mb-[12px] 
        font-semibold
    `}>
        {type}
    </article>
})
