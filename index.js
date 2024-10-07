import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { fetchMoviesByID, fetchMoviesByS } from './src/omdbService.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors())
app.use(fileUpload())

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send("GLOBUS");
});

app.get('/api/movies/', async (req, res) => {
    const title = req.query.title;
    const type = req.query.type;

    try {
        const movies = await fetchMoviesByS(title, type);
        res.json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ message: 'Error fetching movies' }); 
    }
});

app.get('/api/movies/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const movie = await fetchMoviesByID(id);
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movie' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
