import {component$, useStore, useVisibleTask$} from "@builder.io/qwik";
import {Link, useLocation} from "@builder.io/qwik-city";

import {Logo} from "~/components/icons/logo";
import {URLS} from "~/utils/urls";
import {Search} from "~/components/icons/search";
import {ThemeSwitch} from "../../ui/theme-switcher";
import {CATEGORY} from "../../ui/label";

export default component$(() => {
    const {url: {pathname}} = useLocation();
    const navigation = useStore([
        {
            id: 1,
            name: CATEGORY.MOVIE,
            link: URLS.MOVIE
        },
        {
            id: 2,
            name: CATEGORY.TV_SHOW,
            link: URLS.TV_SHOW
        },
        {
            id: 3,
            name: CATEGORY.PEOPLE,
            link: URLS.PEOPLE
        },
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
                            p-[6px] pl-[12px] pr-[12px] 
                            font-medium
                            text-grayscale-100 dark:text-grayscale-10
                            transition-all 
                            hover:text-primary dark:hover:text-primary 
                            
                            ${pathname.includes(menuItem.link) ? '!text-primary' : ''}
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
                            <Search class={`fill-grayscale-100 dark:fill-grayscale-10`}/>
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
