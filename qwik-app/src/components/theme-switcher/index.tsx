import {$, component$, Signal, useSignal, useStylesScoped$, useTask$, useVisibleTask$} from "@builder.io/qwik";
import styles from "./style.css?inline";
import {Moon} from "~/components/starter/icons/moon";
import {Sun} from "~/components/starter/icons/sun";

const enum ThemeIndex {
    LIGHT = 0,
    DARK = 1
}

const enum ThemeName {
    LIGHT = "light",
    DARK = "dark"
}

export const ThemeSwitch = component$(() => {
    const activeThemeIndex = useSignal<ThemeIndex>(ThemeIndex.LIGHT);
    useStylesScoped$(styles);

    useVisibleTask$(async () => {
        const theme = document.documentElement.className;

        if (theme === ThemeName.DARK) {
            activeThemeIndex.value = ThemeIndex.DARK;
        }
    }, {strategy: "document-ready"})

    const handleSwitchTheme = $((themeIndex: ThemeIndex) => {
        const theme = document.documentElement.className;

        if (theme === ThemeName.LIGHT && themeIndex === ThemeIndex.DARK) {
            document.documentElement.className = ThemeName.DARK;

            localStorage.setItem("theme", ThemeName.DARK);
            activeThemeIndex.value = ThemeIndex.DARK;
        } else if (themeIndex === ThemeIndex.LIGHT) {
            document.documentElement.className = ThemeName.LIGHT;
            localStorage.setItem("theme", ThemeName.LIGHT);
            activeThemeIndex.value = ThemeIndex.LIGHT;
        }
    })

    const getStylesForCurrentTheme = (
        activeThemeIndex: Signal<ThemeIndex>,
        themeIndex: ThemeIndex,
        stylesForLeftArgument: string,
        stylesForRightArgument: string
    ): string => {
        return activeThemeIndex.value === themeIndex ? stylesForLeftArgument : stylesForRightArgument;
    }

    return (
        <ul class={`relative flex items-stretch p-[5px] bg-grayscale-30 dark:bg-primary rounded-[6px] transition-all`}>
            <li class={`
                    absolute z-0 top-[5px] bottom-[5px] ${getStylesForCurrentTheme(activeThemeIndex, ThemeIndex.DARK, 'left-[calc(50%-5px)]', 'left-[5px]')}
                    flex items-center w-[50%] 
                    mr-[5px] p-[20px] pt-[5px] pb-[5px]
                    font-medium 
                    bg-primary dark:bg-grayscale-100 rounded-[6px] transition-all
                `}/>
            <li class={'flex'} onClick$={() => handleSwitchTheme(ThemeIndex.LIGHT)}>
                <button class={`
                    relative
                    flex items-center w-[100%] 
                    p-[20px] pt-[5px] pb-[5px]
                    font-medium 
                    rounded-[6px] ${getStylesForCurrentTheme(activeThemeIndex, ThemeIndex.LIGHT, 'text-white', '')}
                `}>
                    <Sun
                        class={`mr-[5px] ${getStylesForCurrentTheme(activeThemeIndex, ThemeIndex.LIGHT, 'animate-spin', '')}`}/>
                    Light
                </button>
            </li>
            <li class={'flex'} onClick$={() => handleSwitchTheme(ThemeIndex.DARK)}>
                <button class={`
                    relative
                    flex items-center w-[100%] 
                    mr-[2px] p-[20px] pt-[5px] pb-[5px]
                    font-medium
                    rounded-[6px] ${getStylesForCurrentTheme(activeThemeIndex, ThemeIndex.DARK, 'text-white', '')}
                `}>
                    <Moon
                        class={`mr-[5px] ${getStylesForCurrentTheme(activeThemeIndex, ThemeIndex.DARK, 'animate-pulse', '')}`}/>
                    Dark
                </button>
            </li>
        </ul>
    );
});
