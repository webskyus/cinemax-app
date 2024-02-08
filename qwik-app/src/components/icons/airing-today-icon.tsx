import {component$} from "@builder.io/qwik";

interface Props {
    width?: number
    height?: number
    class?: string
}

export const AiringTodayIcon = component$(({
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
            <path xmlns="http://www.w3.org/2000/svg"
                  d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
        </svg>
    )
});
