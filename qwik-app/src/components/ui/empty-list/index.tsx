import {component$} from "@builder.io/qwik";

export const EmptyList = component$((props: {isVisible: boolean}) => {
    const {isVisible} = props;

    return <>
        {
            isVisible
                ? <p class={`font-bold text-h6-sm sm:text-h6-lg text-grayscale-50`}>
                    Empty list
                </p>
                : ''
        }
    </>
})
