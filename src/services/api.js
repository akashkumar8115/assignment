import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';
// VITE_API_URL=http://localhost:5000/api

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const bookService = {
    getAll: () => api.get('/historyBooks'),
    getById: (id) => api.get(`/historyBooks/${id}`),
    create: (data) => api.post('/historyBooks', data),
    update: (id, data) => api.put(`/historyBooks/${id}`, data),
    delete: (id) => api.delete(`/historyBooks/${id}`),
};

export default api;
