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


export const convertMinutes = (time: number) => {
    const hours = time >= 60 ? Math.round(time / 60) : 0;
    const min = time % 60;

    return `${hours}h ${min}m`
}

export const formatterForBudget = (numb: number) => {
    const formatter = Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});

    return formatter.format(numb)
}


export const getContentWithGenresParam = (prevUrl: URL | undefined) => {
    const params = new URLSearchParams(prevUrl?.searchParams);
    const genreId = params?.get('genre_id');

    return  genreId ? `&with_genres=${genreId}` : '';
}
