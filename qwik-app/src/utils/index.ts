export const debounce = <F extends (...args: any) => any>(fn: F, delay = 500) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args: Parameters<F>): Promise<ReturnType<F>> => {
        return new Promise((resolve) => {
            if (timeoutId) clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                resolve(fn(...(args as any[])));
            }, delay);
        });
    };
}


export const generateRandomLetter = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const random = Math.round(Math.random() * 26);

    return letters.charAt(random);
}
