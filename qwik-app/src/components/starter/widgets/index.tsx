import {component$} from "@builder.io/qwik";

export const Widgets = component$(() => {
    return <aside class={`
            fixed top-[87px] right-0 bottom-0
            hidden 2xl:block
            w-[257px] h-[100%]
            border-t-[2px] border-solid border-grayscale-20 dark:border-background-dark
            bg-grayscale-10 dark:bg-additional-dark-smooth
       `}>
        test
    </aside>
})
