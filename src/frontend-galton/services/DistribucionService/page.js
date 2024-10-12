import axios from 'axios';

const API_URL = '/api/distribuciones';

export async function fetchDistribucionById(id) {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}

export default {
    fetchDistribucionById,
};
