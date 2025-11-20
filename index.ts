#!/usr/bin/env node
require("dotenv/config");
const { ACCESSS_TOKEN } = process.env;

export function runCLI() {
    if (process.argv[2] !== '--type') {
        console.error('Please provide a --type flag');
        process.exit(1);
    }

    if (!process.argv[3]) {
        console.warn('Choose a category of movie!');
        process.exit(1);
    }

    const MoviesFilter = {
        playing: 'now_playing',
        popular: 'popular',
        top: 'top_rated',
        upcoming: 'upcoming',
    };

    if (!Object.keys(MoviesFilter).includes(process.argv[3])) {
        console.warn('Please give the appropriate category!');
        process.exit(1);
    }

    let selection = process.argv[3] as keyof typeof MoviesFilter;
    let filtered = MoviesFilter[selection];

    return showMovie(filtered);
}

async function showMovie(filteredMovie: string) {
    const url = `https://api.themoviedb.org/3/movie/${filteredMovie}?language=en-US&page=1`;

    const options = {
        method: 'GT',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESSS_TOKEN}`,
        },
    };

    return fetch(url, options)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            return json
        })
        .catch(err => console.error(err));
}

if (require.main === module) {
    runCLI();
}
