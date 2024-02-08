import {component$} from "@builder.io/qwik";

interface Props {
    width?: number
    height?: number
    class?: string
}

export const DiscoveryIcon = component$(({
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
                <circle cx="12" cy="12" r="10"/>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        </svg>
    )
});
