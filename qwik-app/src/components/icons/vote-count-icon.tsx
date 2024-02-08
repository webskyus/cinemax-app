import {component$} from "@builder.io/qwik";

interface Props {
    width?: number
    height?: number
    class?: string
}

export const VoteCountIcon = component$(({
                                             width = 24,
                                             height = 24,
                                             class: className = ''
                                         }: Props) => {
    return (
        <svg width={width}
             height={height}
             class={className}
             viewBox="0 0 512 512"
             style="color:#B43FEB"
             xmlns="http://www.w3.org/2000/svg">
                <rect width="512" height="512" x="0" y="0" rx="30" fill="transparent" stroke="transparent"
                      stroke-width="0" stroke-opacity="100%" paint-order="stroke"></rect>
                <svg width="256px" height="256px" viewBox="0 0 20 20" fill="currentColor" x="128" y="128" role="img"
                     style="display:inline-block;vertical-align:middle" xmlns="http://www.w3.org/2000/svg">
                    <g fill="currentColor">
                        <path fill="currentColor"
                              d="M13.5 9h-1.268l1.732-3a1 1 0 0 0-.366-1.366L11 3.134a1 1 0 0 0-1.366.366l-2.5 4.33A1 1 0 0 0 7.257 9H6.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1Zm-3-5l2.598 1.5l-2.02 3.5H9.16L8 8.33L10.5 4Zm4.037 3l-.577 1h.54l2.25 3H3.25L5.5 8h.406a.961.961 0 0 1 .078-.17l.48-.83H5.5a1 1 0 0 0-.8.4l-2.5 3.333a1 1 0 0 0-.2.6V16a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4.667a1 1 0 0 0-.2-.6L15.3 7.4a1 1 0 0 0-.763-.4Z"/>
                    </g>
                </svg>
        </svg>
    )
});
