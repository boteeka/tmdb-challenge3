import { Movie, Series, Genre } from './models';

const apiKey = `66683917a94e703e14ca150023f4ea7c`;
let stage;

export const init = (stageInstance) => {
    stage = stageInstance;
};

/**
 * @todo:
 * call get with the correct url
 * https://api.themoviedb.org/3/movie/popular
 * and return the data
 */
export const getMovies = async () => {
    const response = await get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
    const { results = [] } = response;

    const genres = await getMovieGenres();

    if (results.length) {
        return results.map((data) => {
            return new Movie(data, genres);
        });
    }

    return [];
};

export const getSeries = async () => {
    const response = await get(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`);
    const { results = [] } = response;

    const genres = await getSeriesGenres();

    if (results.length) {
        return results.map((data) => {
            return new Series(data, genres);
        });
    }

    return [];
};

const getMovieGenres = async () => {
    const response = await get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
    const { genres = [] } = response;

    if (genres.length) {
        return genres.map((data) => {
            return new Genre(data);
        });
    }

    return [];
};

const getSeriesGenres = async () => {
    const response = await get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}`);
    const { genres = [] } = response;

    if (genres.length) {
        return genres.map((data) => {
            return new Genre(data);
        });
    }

    return [];
};

const get = (url) => {
    return fetch(url, {
        Accept: 'application/json',
    }).then((response) => {
        return response.json();
    });
};
