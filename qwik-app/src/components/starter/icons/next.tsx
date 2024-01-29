import {component$} from "@builder.io/qwik";

interface Props {
    width?: number
    height?: number
    class?: string
}

export const Next = component$(({
                                         width = 24,
                                         height = 24,
                                         class: className = ''
                                     }: Props) => {
    return (
        <svg width={width}
             height={height}
             viewBox="0 0 24 24"
             fill="none"
             class={className}
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             xmlns="http://www.w3.org/2000/svg">
            <polyline points="15 14 20 9 15 4"/>
            <path d="M4 20v-7a4 4 0 0 1 4-4h12"/>
        </svg>
    )
});
