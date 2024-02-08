import {component$} from "@builder.io/qwik";

interface Props {
    width?: number
    height?: number
    class?: string
}

export const OnTvIcon = component$(({
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
            <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
            <polyline points="17 2 12 7 7 2"/>
        </svg>
    )
});
