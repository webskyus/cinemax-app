import {component$, Slot, useStore} from "@builder.io/qwik";

export enum BUTTON_TYPE {
    PRIMARY = "PRIMARY",
    PRIMARY_SMALL = "PRIMARY_SMALL",
    TEXT = "TEXT",
}

interface ButtonProps {
    type?: keyof typeof BUTTON_TYPE
    customClass?: string
    onClick?: () => void
}

export const Button = component$((props: ButtonProps) => {
    const {type = BUTTON_TYPE.PRIMARY, customClass = '', onClick} = props;
    const defaultStyles = useStore({
        [BUTTON_TYPE.PRIMARY]: `p-[12px] pl-[24px] sm:pl-[48px] pr-[24px] sm:pr-[48px] bg-label-gradient`,
        [BUTTON_TYPE.PRIMARY_SMALL]: `p-[6px] pl-[12px] sm:pl-[24px] pr-[12px] sm:pr-[24px] bg-label-gradient`,
        [BUTTON_TYPE.TEXT]: `p-[12px]`,
    })

    return <button onClick$={onClick}
                   class={`
                        ${defaultStyles[type]}
                        
                        flex items-center 
                        font-semibold 
                        
                        rounded-[6px]
                        text-grayscale-10
                        transition-all
                        
                        hover:opacity-70
                        
                        ${customClass}
        `}>
        <Slot/>
    </button>
});
