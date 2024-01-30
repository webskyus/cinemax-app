import {$, component$, useResource$, useSignal, useStore} from "@builder.io/qwik";
import {Movie} from "../contend-card-xl";
import {Button, BUTTON_TYPE} from "~/components/ui/button";
import {Next} from "~/components/starter/icons/next";
import {API_URL, MOVIE_LIST_CHART_API_URL, OPTIONS} from '~/api';
import {Link} from "@builder.io/qwik-city";
import {CONTENT_TYPE} from "~/components/content-list";

interface ContentChartListProps {
    type: keyof typeof CONTENT_TYPE
}

export const ContentChartList = component$((props: ContentChartListProps) => {
    const {type} = props;
    const navList = useStore([
        {
            id: 0,
            api_url: MOVIE_LIST_CHART_API_URL.NOW_PLAYING,
            title: 'Now playing'
        },
        {
            id: 1,
            api_url: MOVIE_LIST_CHART_API_URL.POPULAR,
            title: 'Popular'
        },
        {
            id: 2,
            api_url: MOVIE_LIST_CHART_API_URL.TOP_RATED,
            title: 'Top rated'
        },
        {
            id: 3,
            api_url: MOVIE_LIST_CHART_API_URL.UP_COMING,
            title: 'Up coming'
        }
    ]);
    const activeMenuItem = useSignal(0);

    // const contentList = useResource$(async () => {
    //     const getContentApiType = CONTENT_TYPE[type].API_TYPE;
    //     const res = await fetch(`${API_URL}/discover/${getContentApiType}/${MOVIE_LIST_CHART_API_URL.NOW_PLAYING}`, OPTIONS);
    //     const json = await res.json();
    //
    //     return json.results as Movie[];
    // });

    const handleSetActiveMenu = $((id: number) => {
        activeMenuItem.value = id;
    })

    return <section class={`pt-[24px] pb-[24px]`}>
        <nav class={`
            flex items-center justify-between  
            mb-[24px] 
        `}>
            <h2 class={`
                    font-bold text-h3-sm sm:text-h3-lg
                    text-transparent bg-clip-text bg-gradient-to-br from-primary to-grayscale-70
                `}>
                {CONTENT_TYPE[type].TITLE} Chart
            </h2>

            <Link href={`/${CONTENT_TYPE[type].API_TYPE}`}>
                <Button customClass={`uppercase`} type={BUTTON_TYPE.PRIMARY_SMALL}>
                    <Next class={`mr-[12px]`}/>
                    discovery
                </Button>
            </Link>
        </nav>

        <section>
            <nav class={`mb-[24px]`}>
                <ul class={`flex items-center w-[100%]`}>
                    {
                        navList.map((navItem) => {
                            return <li key={navItem.id}
                                       onClick$={() => handleSetActiveMenu(navItem.id)}>
                                <Button type={BUTTON_TYPE.PRIMARY_SMALL} customClass={activeMenuItem.value !== navItem.id ? 'bg-none text-grayscale-100 dark:text-grayscale-10' : ''}>
                                    {navItem.title}
                                </Button>
                            </li>
                        })
                    }
                </ul>
            </nav>

            <article>
                <ul>
                    {

                    }
                </ul>
            </article>
        </section>
    </section>
})
