import {component$, useResource$} from "@builder.io/qwik";
import {Movie} from "../contend-card-xl";
import {Button, BUTTON_TYPE} from "~/components/ui/button";
import {Next} from "~/components/starter/icons/next";
import {API_URL, OPTIONS} from '~/api';
import {Link} from "@builder.io/qwik-city";
import {CONTENT_TYPE} from "~/components/content-list";

interface ContentRatedListProps {
    type: keyof typeof CONTENT_TYPE
}

const genres = {
    "genres": [
        {
            "id": 28,
            "name": "Action"
        },
        {
            "id": 12,
            "name": "Adventure"
        },
        {
            "id": 16,
            "name": "Animation"
        },
        {
            "id": 35,
            "name": "Comedy"
        },
        {
            "id": 80,
            "name": "Crime"
        },
        {
            "id": 99,
            "name": "Documentary"
        },
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 10751,
            "name": "Family"
        },
        {
            "id": 14,
            "name": "Fantasy"
        },
        {
            "id": 36,
            "name": "History"
        },
        {
            "id": 27,
            "name": "Horror"
        },
        {
            "id": 10402,
            "name": "Music"
        },
        {
            "id": 9648,
            "name": "Mystery"
        },
        {
            "id": 10749,
            "name": "Romance"
        },
        {
            "id": 878,
            "name": "Science Fiction"
        },
        {
            "id": 10770,
            "name": "TV Movie"
        },
        {
            "id": 53,
            "name": "Thriller"
        },
        {
            "id": 10752,
            "name": "War"
        },
        {
            "id": 37,
            "name": "Western"
        }
    ]
}


export const ContentRatedList = component$((props: ContentRatedListProps) => {
    const {type} = props;
    const contentList = useResource$(async () => {
        const getContentApiType = CONTENT_TYPE[type].API_TYPE;
        const res = await fetch(`${API_URL}/discover/${getContentApiType}/top_rated`, OPTIONS);
        const json = await res.json();

        return json.results as Movie[];
    });

    return <section class={`pt-[24px] pb-[24px]`}>
        <nav class={`
            flex items-center justify-between  
            mb-[24px] 
        `}>
            <h2 class={`
                    font-bold text-h3-sm sm:text-h3-lg
                    text-transparent bg-clip-text bg-gradient-to-br from-primary to-grayscale-70
                `}>
                Top Rated {CONTENT_TYPE[type].TITLE}
            </h2>

            <Link href={`/${CONTENT_TYPE[type].API_TYPE}`}>
                <Button customClass={`uppercase`} type={BUTTON_TYPE.PRIMARY_SMALL}>
                    <Next class={`mr-[12px]`}/>
                    discovery
                </Button>
            </Link>
        </nav>

        <section class={`
               grid grid-cols-2 sm:grid-cols-4 grid-rows-4 gap-2
               
               [@media(min-width:1600px)]:grid-cols-5
               [@media(min-width:1919px)]:grid-cols-6
               [@media(min-width:2419px)]:grid-cols-8
        `}>
            <nav>
                <ul>
                    {
                        genres.genres.map((genre) => {
                            return <li key={genre.id}>{genre.name}</li>
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
