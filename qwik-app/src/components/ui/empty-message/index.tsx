import {component$} from "@builder.io/qwik";

export const EmptyMessage = component$(() => {
    return <p class={`font-bold text-h6-sm sm:text-h6-lg text-grayscale-100 dark:text-grayscale-10`}>
        Not found...
    </p>
})
