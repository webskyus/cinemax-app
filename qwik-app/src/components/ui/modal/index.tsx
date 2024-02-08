import {component$} from "@builder.io/qwik";

interface ModalProps {
    isVisible: boolean
    action: () => unknown
}

export const Modal = component$((props: ModalProps) => {
    const {isVisible, action} = props

    return <>
        {
            isVisible
                ? <div id="defaultModal" tab-index="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                    <div class="relative mx-[auto] my-[0] mt-[108px] w-full h-full max-w-4xl md:h-auto">
                        <div class="relative bg-white rounded-[6px] bg-grayscale-10 dark:bg-additional-dark-smooth">
                            <div class="flex items-start justify-between p-4 rounded-[6px] dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Content trailer
                                </h3>
                                <button onClick$={action} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-[6px] text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div>
                                <iframe width="100%" height="500"
                                        src="https://www.youtube.com/embed/sKDeTRlEVTE?si=9-nYglgXy1JYDr0d"
                                        title="YouTube video player"
                                        frame-border="0"
                                        class={"bg-grayscale-10 dark:bg-additional-dark-smooth"}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allow-full-screen/>
                            </div>
                        </div>
                    </div>
                </div>
                : ''
        }
    </>
})
