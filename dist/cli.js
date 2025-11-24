"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCLI = runCLI;
require("dotenv/config");
const { ACCESSS_TOKEN } = process.env;
function runCLI() {
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
    let selection = process.argv[3];
    let filtered = MoviesFilter[selection];
    return showMovie(filtered);
}
function showMovie(filteredMovie) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://api.themoviedb.org/3/movie/${filteredMovie}?language=en-US&page=1`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${ACCESSS_TOKEN}`,
            },
        };
        return fetch(url, options)
            .then(res => res.json())
            .then(json => {
            console.log(json);
            return json;
        })
            .catch(err => console.error(err));
    });
}
//# sourceMappingURL=cli.js.map