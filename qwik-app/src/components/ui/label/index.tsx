import {component$} from "@builder.io/qwik";

export enum CATEGORY {
    TV_SHOW = 'TV Show',
    MOVIE = 'Movie',
    PEOPLE = 'People',

    TOP_RATED = 'Top Rated',
    TOP_RATED_MOVIE = 'Top Rated Movie',
    TOP_RATED_TV_SHOW = 'Top Rated TV Show',

    POPULAR = 'Popular',
    POPULAR_MOVIE = 'Popular Movie',
    POPULAR_TV_SHOW = 'Popular TV Show',
    POPULAR_PEOPLE = 'Popular People',

    NOW_PLAYING = 'Now Playing',
    COMING_SOON = 'Coming Soon',

    TRENDING = 'Trending',
    TRENDING_MOVIE = 'Trending Movie',
    TRENDING_TV_SHOW = 'Trending TV Show',
    TRENDING_PEOPLE = 'Trending People',

    ON_THE_AIR = 'On The Air',
    AIRING_TODAY = 'Airing Today',
}

interface Props {
    type: string
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
