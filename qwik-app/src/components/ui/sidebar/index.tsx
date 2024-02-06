import {component$, QwikJSX, useStore} from "@builder.io/qwik";
import {Discovery} from "~/components/icons/discovery";
import {TopRated} from "~/components/icons/top-rated";
import {NowPlaying} from "~/components/icons/now-playing";
import {Popular} from "~/components/icons/popular";
import {ComingSoon} from "~/components/icons/coming-soon";
import {Trending} from "~/components/icons/trending";
import {OnTV} from "~/components/icons/on-tv";
import {AiringToday} from "~/components/icons/airing-today";
import {URLS} from "~/utils/urls";
import {Link, useLocation} from "@builder.io/qwik-city";
import {CATEGORY} from "~/components/ui/label";

interface Menu {
    id: number,
    name: string,
    icon: QwikJSX.Element,
    link: string
}

export const Sidebar = component$(() => {
    const {url: {pathname}} = useLocation();
    const menu: Menu[] = useStore([
        {
            id: 1,
            name: CATEGORY.TOP_RATED,
            icon: <TopRated width={28} height={28}/>,
            link: URLS.TOP_RATED
        },
        {
            id: 2,
            name: CATEGORY.POPULAR,
            icon: <Popular width={28} height={28}/>,
            link: URLS.POPULAR
        },
        {
            id: 3,
            name: CATEGORY.NOW_PLAYING,
            icon: <NowPlaying width={28} height={28}/>,
            link: URLS.NOW_PLAYING
        },
        {
            id: 4,
            name: CATEGORY.COMING_SOON,
            icon: <ComingSoon width={28} height={28}/>,
            link: URLS.COMING_SOON
        },
        {
            id: 5,
            name: CATEGORY.TRENDING,
            icon: <Trending width={28} height={28}/>,
            link: URLS.TRENDING
        },
        {
            id: 6,
            name: CATEGORY.ON_THE_AIR,
            icon: <OnTV width={28} height={28}/>,
            link: URLS.ON_THE_AIR
        },
        {
            id: 7,
            name: CATEGORY.AIRING_TODAY,
            icon: <AiringToday width={28} height={28}/>,
            link: URLS.AIRING_TODAY
        }
    ])

    return (
        <aside class={`
            fixed top-[93px] left-0 bottom-0
            hidden xl:block
            w-[80px] h-[100%]
            border-t-[2px] border-solid border-grayscale-20 dark:border-background-dark
            bg-grayscale-10 dark:bg-additional-dark-smooth
       `}>
            <ul class={`mt-[58px] font-semibold text-grayscale-70 dark:text-grayscale-10`}>
                {
                    menu.map((menuItem) => {
                        return <li key={menuItem.id} class={`
                            relative flex justify-center
                            transition-all
                            hover:text-primary
                            hover:after:opacity-100
                            
                            after:absolute after:left-[0] after:bottom-[0] 
                            after:w-[4px] after:h-full 
                            after:bg-primary after:opacity-0
                            after:transition-all
                       
                            ${pathname.includes(menuItem.link) ? 'after:opacity-100' : ''}
                        `}>
                            <Link href={menuItem.link} title={menuItem.name} class={`
                                 flex items-center
                                 p-[12px] pl-[24px] pr-[24px]
                            `}>
                                {menuItem.icon}
                            </Link>
                        </li>
                    })
                }
            </ul>
        </aside>
    )
});
