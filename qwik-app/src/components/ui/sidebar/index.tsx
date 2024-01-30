import {component$, QwikJSX, useStore} from "@builder.io/qwik";
import {Discovery} from "~/components/starter/icons/discovery";
import {TopRated} from "~/components/starter/icons/top-rated";
import {NowPlaying} from "~/components/starter/icons/now-playing";
import {Popular} from "~/components/starter/icons/popular";
import {ComingSoon} from "~/components/starter/icons/coming-soon";
import {Trending} from "~/components/starter/icons/trending";
import {OnTV} from "~/components/starter/icons/on-tv";
import {AiringToday} from "~/components/starter/icons/airing-today";
import {URLS} from "~/utils/urls";
import {Link} from "@builder.io/qwik-city";

interface Menu {
    id: number,
    name: string,
    icon: QwikJSX.Element,
    link: string
}

export const Sidebar = component$(() => {
    const menu: Menu[] = useStore([
        {
            id: 0,
            name: 'Discovery',
            icon: <Discovery class={`mr-[12px]`}/>,
            link: URLS.DISCOVERY
        },
        {
            id: 1,
            name: 'Top Rated',
            icon: <TopRated class={`mr-[12px]`}/>,
            link: URLS.TOP_RATED
        },
        {
            id: 2,
            name: 'Popular',
            icon: <Popular class={`mr-[12px]`}/>,
            link: URLS.POPULAR
        },
        {
            id: 3,
            name: 'Now playing',
            icon: <NowPlaying class={`mr-[12px]`}/>,
            link: URLS.NOW_PLAYING
        },
        {
            id: 4,
            name: 'Coming Soon',
            icon: <ComingSoon class={`mr-[12px]`}/>,
            link: URLS.COMING_SOON
        },
        {
            id: 5,
            name: 'Trending',
            icon: <Trending class={`mr-[12px]`}/>,
            link: URLS.TRENDING
        },
        {
            id: 6,
            name: 'On TV',
            icon: <OnTV class={`mr-[12px]`}/>,
            link: URLS.ON_TV
        },
        {
            id: 7,
            name: 'Airing Today',
            icon: <AiringToday class={`mr-[12px]`}/>,
            link: URLS.AIRING_TODAY
        }
    ])

    return (
        <aside class={`
            fixed top-[87px] left-0 bottom-0
            hidden xl:block
            w-[257px] h-[100%] pt-[22px]
            border-t-[2px] border-solid border-grayscale-20 dark:border-background-dark
            bg-grayscale-10 dark:bg-additional-dark-smooth
       `}>
            <ul class={`font-semibold text-grayscale-70 dark:text-grayscale-10`}>
                {
                    menu.map((menuItem) => {
                        return <li key={menuItem.id} class={`
                            relative
                            p-[12px] pl-[24px] pr-[24px]
                            transition-all
                            hover:text-primary
                            hover:after:opacity-100
                            
                            after:absolute after:left-[0] after:bottom-[0] 
                            after:w-[4px] after:h-full 
                            after:bg-primary after:opacity-0
                            after:transition-all
                        `}>
                            <Link href={menuItem.link} class={`
                                 flex items-center 
                            `}>
                                {menuItem.icon}
                                {menuItem.name}
                            </Link>
                        </li>
                    })
                }
            </ul>
        </aside>
    )
});
