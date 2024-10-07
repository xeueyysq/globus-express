import axios from 'axios';

export const fetchMoviesByS = async () => {
    const API_KEY = process.env.OMDB_API_KEY;
    const url = type === 'all'
        ? `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`
        : `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&type=${type}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from OMDB: ${[error, type, url]}`);
        throw new Error('Failed to fetch movies from OMDB API');
    }
};

export const fetchMoviesByID = async () => {
    const API_KEY = process.env.OMDB_API_KEY;
    const url = `http://www.omdbapi.com/?apikey=${API_KEY}&i=${searchTerm}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch movies from OMDB API');
    }
};
