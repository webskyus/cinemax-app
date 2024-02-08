import {component$} from "@builder.io/qwik";

interface Props {
    width?: number
    height?: number
    class?: string
}

export const LoadingIcon = component$(({
                                      width = 24,
                                      height = 24,
                                      class: className = ''
                                  }: Props) => {
    return (
        <svg width={width}
             height={height}
             viewBox="0 0 200 200"
             fill="none"
             class={className}
             xmlns="http://www.w3.org/2000/svg">
            <circle fill="#B43FEB" stroke="#B43FEB" stroke-width="6" r="15" cx="35" cy="100">
                <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35"
                         keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite"
                         begin="0"></animate>
            </circle>
            <circle fill="#B43FEB" stroke="#B43FEB" stroke-width="6" opacity=".8" r="15" cx="35" cy="100">
                <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35"
                         keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite"
                         begin="0.05"></animate>
            </circle>
            <circle fill="#B43FEB" stroke="#B43FEB" stroke-width="6" opacity=".6" r="15" cx="35" cy="100">
                <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35"
                         keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite"
                         begin=".1"></animate>
            </circle>
            <circle fill="#B43FEB" stroke="#B43FEB" stroke-width="6" opacity=".4" r="15" cx="35" cy="100">
                <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35"
                         keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite"
                         begin=".15"></animate>
            </circle>
            <circle fill="#B43FEB" stroke="#B43FEB" stroke-width="6" opacity=".2" r="15" cx="35" cy="100">
                <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35"
                         keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".2">

                </animate>
            </circle>
        </svg>
    )
});


