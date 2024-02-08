import {component$} from "@builder.io/qwik";

interface Props {
    width?: number
    height?: number
    class?: string
}

export const NowPlayingIcon = component$(({
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
            <polygon points="12 2 2 7 12 12 22 7 12 2"/>
            <polyline points="2 17 12 22 22 17"/>
            <polyline points="2 12 12 17 22 12"/>
        </svg>
    )
});
