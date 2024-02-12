import type { Signal } from "@builder.io/qwik";
import {
  component$,
  createContextId,
  useContextProvider,
  useSignal,
} from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.css";

export const ThemeContext = createContextId<Signal<string>>("theme");

export default component$(() => {
  const theme = useSignal("dark");
  useContextProvider(ThemeContext, theme);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <ServiceWorkerRegister />

        <script
          dangerouslySetInnerHTML={`
                         (function() {
                            function setTheme(theme) {
                                document.documentElement.className = theme;
                                localStorage.setItem('theme', theme);
                            }
                            var theme = localStorage.getItem('theme');
                            var systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
                            
                            if (theme !== 'light' && (theme === 'dark' || systemTheme)) {
                                setTheme('dark');
                            } else {
                                setTheme('light');
                            }
                        })();
                  `}
        />
      </head>
      <body lang="en">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
