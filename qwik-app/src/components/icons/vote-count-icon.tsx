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
            <rect width="512" height="512" x="0" y="0" rx="30" fill="transparent" stroke="transparent" stroke-width="0"
                  stroke-opacity="100%" paint-order="stroke"></rect>
            <svg width="256px" height="256px" viewBox="0 0 24 24" fill="currentColor" x="128" y="128" role="img"
                 style="display:inline-block;vertical-align:middle" xmlns="http://www.w3.org/2000/svg">
                <g fill="currentColor">
                    <g fill="currentColor">
                        <path fill-rule="evenodd"
                              d="M10.435.306A.75.75 0 0 1 10.9 1v.978l1.083-.001h.075c2.072 0 3.705 0 4.981.174c1.31.179 2.356.554 3.177 1.387c.82.832 1.187 1.89 1.363 3.214c.171 1.293.171 2.95.171 5.055v.113c0 2.105 0 3.761-.171 5.054c-.176 1.326-.543 2.382-1.363 3.214c-.82.834-1.866 1.209-3.177 1.388c-1.276.174-2.909.174-4.981.174h-.116c-2.072 0-3.705 0-4.981-.174c-1.31-.18-2.356-.554-3.177-1.388c-.82-.832-1.187-1.888-1.363-3.214c-.171-1.293-.171-2.949-.171-5.054v-.113c0-2.106 0-3.762.171-5.055c.176-1.325.543-2.382 1.363-3.214a.75.75 0 1 1 1.068 1.053c-.498.506-.79 1.195-.944 2.358c-.156 1.183-.158 2.74-.158 4.914c0 2.175.002 3.731.158 4.915c.154 1.162.446 1.852.944 2.358c.497.504 1.172.798 2.312.954c1.163.158 2.693.16 4.836.16c2.143 0 3.673-.002 4.836-.16c1.14-.156 1.815-.45 2.312-.954c.498-.506.79-1.196.944-2.358c.157-1.184.158-2.74.158-4.915c0-2.174-.002-3.73-.158-4.914c-.154-1.163-.446-1.852-.944-2.358c-.497-.504-1.171-.798-2.312-.954c-1.163-.159-2.693-.16-4.836-.16h-1.1v1.077a.75.75 0 0 1-1.284.526l-1.75-1.777a.75.75 0 0 1 0-1.052L9.616.474a.75.75 0 0 1 .819-.168Z"
                              clip-rule="evenodd"/>
                        <path
                            d="M16.03 10.03a.75.75 0 0 0-1.06-1.06l-4.47 4.47l-1.47-1.47a.75.75 0 1 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l5-5Z"/>
                    </g>
                </g>
            </svg>
        </svg>
    )
});
