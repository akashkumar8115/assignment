import axios from 'axios';

const BASE_URL = 'https://your-api-endpoint.com/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const bookService = {
    getAll: () => api.get('/books'),
    getById: (id) => api.get(`/books/${id}`),
    create: (data) => api.post('/books', data),
    update: (id, data) => api.put(`/books/${id}`, data),
    delete: (id) => api.delete(`/books/${id}`),
};

export default api;
