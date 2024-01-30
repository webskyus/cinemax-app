import {component$, Resource, useResource$} from "@builder.io/qwik";
import {API_URL, OPTIONS} from "~/api";
import {ContentCardXL, Movie} from "../contend-card-xl";
import {CONTENT_TYPE} from "~/components/content-list";
import {Link} from "@builder.io/qwik-city";
import {Button, BUTTON_TYPE} from "~/components/ui/button";
import {Next} from "~/components/starter/icons/next";
import {Loader} from "~/components/ui/loader";
import {EmptyMessage} from "~/components/ui/empty-message";
import {URLS} from "~/utils/urls";
import { CATEGORY } from "../ui/label";
import {PeopleCardXL} from "~/components/people-list/components/people-card-xl";

interface PeopleKnownFor {
    adult: boolean
    backdrop_path: string
    id: number
    title: string
    original_language: string
    original_title: string
    overview: string
    poster_path: string
    media_type: string
    genre_ids: number[]
    popularity: number
    release_date: string
    video: boolean | string
    vote_average: number
    vote_count: number
}

export interface People {
    adult: boolean
    id: number
    name: string
    original_name: string
    known_for_department: string
    profile_path: string
    media_type: number
    popularity: number
    gender: number
    known_for: PeopleKnownFor[]
}


export const PeopleList = component$(() => {
    const peopleList = useResource$(async () => {
        const res = await fetch(`${API_URL}/trending/person/week`, OPTIONS);
        const json = await res.json();

        return json.results as People[];
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
                People
            </h2>

            <Link href={`/${URLS.PEOPLE}`}>
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
            <Resource value={peopleList}
                      onResolved={(people) => {
                          return <>
                              {
                                  people.map((person) => {
                                      return <PeopleCardXL key={person.id} data={person}/>
                                  })
                              }
                          </>
                      }}
                      onPending={() => <Loader/>}
                      onRejected={() => <EmptyMessage/>}
            />
        </section>
    </section>
})
