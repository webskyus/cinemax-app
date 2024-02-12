import {component$} from "@builder.io/qwik";

export const ErrorMessage = component$((props: {isVisible: boolean}) => {
    const {isVisible} = props;

    return <>
        {
            isVisible
                ? <p class={`font-bold text-h6-sm sm:text-h6-lg text-alerts-error`}>
                    Something went wrong...
                </p>
                : ''
        }
    </>
})
