import type { QRL} from "@builder.io/qwik";
import {component$} from "@builder.io/qwik";

interface ModalProps {
  isVisible: boolean;
  id: string;
  action:  QRL<() => boolean>
}

export const Modal = component$((props: ModalProps) => {
  const { isVisible, action, id } = props;

  return (
    <>
      {isVisible ? (
        <div
          id="defaultModal"
          tab-index="-1"
          aria-hidden="true"
          class="h-modal fixed left-0 right-0 top-0 z-50 w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full"
        >
          <div class="relative mx-[auto] my-[0] mt-[108px] h-full w-full max-w-4xl md:h-auto">
            <div class="relative rounded-[6px] bg-grayscale-10 bg-white shadow-xl dark:bg-additional-dark-smooth">
              <div class="flex items-start justify-between border-b-[4px] border-primary p-4">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  Video trailer
                </h3>
                <button
                  onClick$={action}
                  type="button"
                  class="ml-auto inline-flex items-center rounded-[6px] bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="defaultModal"
                >
                  <svg
                    aria-hidden="true"
                    class="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div
                class={`flex h-[500px] items-center justify-center bg-grayscale-10 dark:bg-additional-dark-smooth`}
              >
                <span
                  class={`absolute inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]`}
                />
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${id}`}
                  title="YouTube video player"
                  class={`relative z-10`}
                  frame-border="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allow-full-screen
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
});
