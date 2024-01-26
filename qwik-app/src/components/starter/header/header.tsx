import {component$, useStore} from "@builder.io/qwik";
import {Link} from "@builder.io/qwik-city";

import {Logo} from "../icons/logo";
import {URLS} from "~/utils/urls";
import {Search} from "~/components/starter/icons/search";
import {ThemeSwitch} from "~/components/theme-switcher";
import {CATEGORY} from "../../ui/label";

export default component$(() => {
    const navigation = useStore([
        {
            id: 1,
            name: CATEGORY.MOVIES,
            link: URLS.MOVIES
        },
        {
            id: 2,
            name: CATEGORY.TV_SHOWS,
            link: URLS.TV_SHOWS
        },
        {
            id: 3,
            name: CATEGORY.ANIME,
            link: URLS.ANIME
        },
        {
            id: 4,
            name: CATEGORY.PEOPLE,
            link: URLS.PEOPLE
        },
        {
            id: 5,
            name: CATEGORY.CARTOONS,
            link: URLS.CARTOONS
        }
    ]);

    return (
        <header class={` 
        flex items-center
        pl-[24px] pr-[24px] pt-[22px] pb-[22px]
        bg-grayscale-10 dark:bg-additional-dark-smooth
    `}>
            <Link href={URLS.MAIN} title="CineMax Logo">
                <Logo width={86}
                      height={28}
                      class={`fill-grayscale-100 dark:fill-grayscale-10`}
                />
            </Link>

            <nav class={'flex w-[100%]'}>
                <ul class={`
                    hidden lg:flex flex-row items-center
                    ml-[146px] lg:ml-[100px]
                `}>
                    {
                        navigation.map((menuItem) => {
                            return <li key={menuItem.id} class={`
                            p-[5px] pl-[10px] pr-[10px] 
                            font-medium
                            text-grayscale-100 dark:text-grayscale-10
                            transition-all 
                            hover:text-primary dark:hover:text-primary
                        `}>
                                <Link href={menuItem.link}>
                                    {menuItem.name}
                                </Link>
                            </li>
                        })
                    }
                </ul>

                <ul class={`flex flex-row items-center ml-auto`}>
                    <li class={`sm:mr-[20px]`}>
                        <Link href={URLS.SEARCH} title={"Search..."}>
                            <Search class={`fill-background dark:fill-white`}/>
                        </Link>
                    </li>
                    <li class={`hidden sm:flex`}>
                        <ThemeSwitch/>
                    </li>
                </ul>
            </nav>


        </header>
    );
});
