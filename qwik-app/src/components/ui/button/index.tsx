import {component$, Slot, useStore} from "@builder.io/qwik";

export enum BUTTON_TYPE {
    PRIMARY = "PRIMARY",
    TEXT = "TEXT",
}

interface ButtonProps {
    type?: keyof typeof BUTTON_TYPE
    customClass?: string
}

export const Button = component$((props: ButtonProps) => {
    const {type = BUTTON_TYPE.PRIMARY, customClass = ''} = props;
    const defaultStyles = useStore({
        [BUTTON_TYPE.PRIMARY]: `p-[10px] pl-[48px] pr-[48px] bg-label-gradient`,
        [BUTTON_TYPE.TEXT]: `p-[10px]`,
    })

    return <button class={`
            ${customClass}
            
            flex items-center 
            font-semibold ${defaultStyles[type]}
            
            rounded-[6px]
            text-grayscale-10
            transition-all
            
            hover:opacity-70
        `}>
        <Slot/>
    </button>
});
