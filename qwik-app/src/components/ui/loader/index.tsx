import {component$} from "@builder.io/qwik";
import {Loading} from "~/components/icons/loading";

export const Loader = component$((props: { isVisible: boolean }) => {
    const {isVisible} = props;

    return <>
        {
            isVisible
                ? <article class={`absolute z-10 w-[100%] h-[100%] flex justify-center`}>
                    <Loading class={`mr-[96px] mt-[96px]`} width={200} height={200}/>
                </article>
                : ''
        }
    </>
})
