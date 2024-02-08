import {component$} from "@builder.io/qwik";

interface Props {
    width?: number
    height?: number
    class?: string
}

export const PlaySolidIcon = component$(({
                                    width = 24,
                                    height = 24,
                                    class: className = ''
                                }: Props) => {
    return (
        <svg width={width}
             height={height}
             class={className}
             viewBox="0 0 500 500"
             style="color:#B43FEB"
             xmlns="http://www.w3.org/2000/svg">
            <rect width="512" height="512" x="0" y="0" rx="41" fill="transparent" stroke="#c81919" stroke-width="0" stroke-opacity="100%" paint-order="stroke"></rect><svg width="512px" height="512px" viewBox="0 0 24 24" fill="#E4AB00" x="0" y="0" role="img" style="display:inline-block;vertical-align:middle" xmlns="http://www.w3.org/2000/svg"><g fill="#E4AB00"><path fill="currentColor" d="M19.266 13.516a1.917 1.917 0 0 0 0-3.032A35.762 35.762 0 0 0 9.35 5.068l-.653-.232c-1.248-.443-2.567.401-2.736 1.69a42.49 42.49 0 0 0 0 10.948c.17 1.289 1.488 2.133 2.736 1.69l.653-.232a35.762 35.762 0 0 0 9.916-5.416Z"/></g></svg>
        </svg>
    )
});

