import axios from 'axios';

const API_URL = '/api/galton-board';

async function fetchGaltonBoards() {
    const response = await axios.get('/api/galton-board');
    return response.data;
}

export default {
    fetchGaltonBoards,
};
