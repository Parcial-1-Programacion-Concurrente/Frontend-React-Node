import axios from 'axios';

const API_URL = '/api/galton-boards';

export async function fetchGaltonBoards() {
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
}

export async function fetchGaltonBoardById(id) {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}

export async function createGaltonBoard(galtonBoard) {
    const response = await axios.post(API_URL, galtonBoard);
    return response.data;
}

export async function deleteGaltonBoard(id) {
    await axios.delete(`${API_URL}/${id}`);
}

export default {
    fetchGaltonBoards,
    fetchGaltonBoardById,
    createGaltonBoard,
    deleteGaltonBoard,
};
