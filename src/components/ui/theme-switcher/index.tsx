import type { Signal } from "@builder.io/qwik";
import {
  $,
  component$,
  useSignal,
  useStylesScoped$,
  useVisibleTask$,
} from "@builder.io/qwik";
import styles from "./style.css?inline";
import { MoonIcon } from "~/components/icons/moon-icon";
import { SunIcon } from "~/components/icons/sun-icon";

const enum ThemeIndex {
  LIGHT = 0,
  DARK = 1,
}

const enum ThemeName {
  LIGHT = "light",
  DARK = "dark",
}

export const ThemeSwitch = component$(() => {
  const activeThemeIndex = useSignal<ThemeIndex>(ThemeIndex.LIGHT);

  useStylesScoped$(styles);

  useVisibleTask$(
    async () => {
      const theme = document.documentElement.className;

      if (theme.includes(ThemeName.DARK)) {
        activeThemeIndex.value = ThemeIndex.DARK;
      }
    },
    { strategy: "document-ready" },
  );

  const handleSwitchTheme = $((themeIndex: ThemeIndex) => {
    const theme = document.documentElement.className;

    if (theme.includes(ThemeName.LIGHT) && themeIndex === ThemeIndex.DARK) {
      document.documentElement.className = ThemeName.DARK;

      localStorage.setItem("theme", ThemeName.DARK);
      activeThemeIndex.value = ThemeIndex.DARK;
    } else if (themeIndex === ThemeIndex.LIGHT) {
      document.documentElement.className = ThemeName.LIGHT;
      localStorage.setItem("theme", ThemeName.LIGHT);
      activeThemeIndex.value = ThemeIndex.LIGHT;
    }
  });

  const getStylesForCurrentTheme = (
    activeThemeIndex: Signal<ThemeIndex>,
    themeIndex: ThemeIndex,
    stylesForLeftArgument: string,
    stylesForRightArgument: string,
  ): string => {
    return activeThemeIndex.value === themeIndex
      ? stylesForLeftArgument
      : stylesForRightArgument;
  };

  return (
    <ul
      class={`relative flex items-stretch rounded-[6px] bg-grayscale-30 p-[6px] transition-all dark:bg-label-gradient`}
    >
      <li
        class={`
                    absolute bottom-[6px] top-[6px] z-0 ${getStylesForCurrentTheme(activeThemeIndex, ThemeIndex.DARK, "left-[calc(50%-5px)]", "left-[5px]")}
                    mr-[6px] flex w-[50%] 
                    items-center rounded-[6px] bg-primary p-[20px]
                    pb-[6px] 
                    pt-[6px] font-medium transition-all dark:bg-grayscale-100
                `}
      />
      <li class={"flex"} onClick$={() => handleSwitchTheme(ThemeIndex.LIGHT)}>
        <button
          class={`
                    relative
                    flex w-[100%] items-center 
                    rounded-[6px] p-[20px] pb-[6px]
                    pt-[6px] 
                    font-medium ${getStylesForCurrentTheme(activeThemeIndex, ThemeIndex.LIGHT, "text-white", "")}
                `}
        >
          <SunIcon
            class={`mr-[6px] ${getStylesForCurrentTheme(activeThemeIndex, ThemeIndex.LIGHT, "animate-spin", "")}`}
          />
          Light
        </button>
      </li>
      <li class={"flex"} onClick$={() => handleSwitchTheme(ThemeIndex.DARK)}>
        <button
          class={`
                    relative
                    mr-[2px] flex w-[100%] 
                    items-center rounded-[6px] p-[20px] pb-[6px]
                    pt-[6px]
                    font-medium ${getStylesForCurrentTheme(activeThemeIndex, ThemeIndex.DARK, "text-white", "")}
                `}
        >
          <MoonIcon
            class={`mr-[6px] ${getStylesForCurrentTheme(activeThemeIndex, ThemeIndex.DARK, "animate-pulse", "")}`}
          />
          Dark
        </button>
      </li>
    </ul>
  );
});
