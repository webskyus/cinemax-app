import {component$, QwikJSX, useStore} from "@builder.io/qwik";
import {DiscoveryIcon} from "~/components/icons/discovery-icon";
import {TopRatedIcon} from "~/components/icons/top-rated-icon";
import {NowPlayingIcon} from "~/components/icons/now-playing-icon";
import {PopularIcon} from "~/components/icons/popular-icon";
import {ComingSoonIcon} from "~/components/icons/coming-soon-icon";
import {TrendingIcon} from "~/components/icons/trending-icon";
import {OnTvIcon} from "~/components/icons/on-tv-icon";
import {AiringTodayIcon} from "~/components/icons/airing-today-icon";
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
            icon: <TopRatedIcon width={28} height={28}/>,
            link: URLS.TOP_RATED
        },
        {
            id: 2,
            name: CATEGORY.POPULAR,
            icon: <PopularIcon width={28} height={28}/>,
            link: URLS.POPULAR
        },
        {
            id: 3,
            name: CATEGORY.NOW_PLAYING,
            icon: <NowPlayingIcon width={28} height={28}/>,
            link: URLS.NOW_PLAYING
        },
        {
            id: 4,
            name: CATEGORY.COMING_SOON,
            icon: <ComingSoonIcon width={28} height={28}/>,
            link: URLS.COMING_SOON
        },
        {
            id: 5,
            name: CATEGORY.TRENDING,
            icon: <TrendingIcon width={28} height={28}/>,
            link: URLS.TRENDING
        },
        {
            id: 6,
            name: CATEGORY.ON_THE_AIR,
            icon: <OnTvIcon width={28} height={28}/>,
            link: URLS.ON_THE_AIR
        },
        {
            id: 7,
            name: CATEGORY.AIRING_TODAY,
            icon: <AiringTodayIcon width={28} height={28}/>,
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
