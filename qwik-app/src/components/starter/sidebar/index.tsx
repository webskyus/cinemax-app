import {component$} from "@builder.io/qwik";

// Discovery
// Top Rated
// Popular
// Now playing (movies)
// Coming Soon
// Trending
// On TV (tv shows)
// Airing Today (tv shows)

export const Sidebar = component$(() => {
   return (
       <aside class={`
            fixed top-[87px] left-0 bottom-0
            hidden xl:block
            w-[257px] h-[100%]
            border-t-[2px] border-solid border-grayscale-20 dark:border-background-dark
            bg-grayscale-10 dark:bg-additional-dark-smooth
       `}>
            test
       </aside>
   )
});
