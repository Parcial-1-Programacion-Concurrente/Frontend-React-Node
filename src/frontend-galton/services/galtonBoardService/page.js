import axios from 'axios';

const API_URL = '/api/galton-board';

export async function createGaltonBoard(galtonBoard) {
    const response = await axios.post(API_URL, galtonBoard);
    return response.data;
}

export async function deleteGaltonBoard(id) {
    await axios.delete(`${API_URL}/${id}`);
}

async function fetchGaltonBoards() {
    const response = await axios.get('/api/galton-board');
    return response.data;
}

export default {

    createGaltonBoard,
    deleteGaltonBoard,
    fetchGaltonBoards,
};
