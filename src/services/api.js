// import axios from 'axios';

// const BASE_URL = 'http://localhost:5000/api';
// // VITE_API_URL=http://localhost:5000/api

// const api = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// export const bookService = {
//     getAll: () => api.get('/historyBooks'),
//     getById: (id) => api.get(`/historyBooks/${id}`),
//     create: (data) => api.post('/historyBooks', data),
//     update: (id, data) => api.put(`/historyBooks/${id}`, data),
//     delete: (id) => api.delete(`/historyBooks/${id}`),
// };

// export default api;


const API_URL = 'http://localhost:5000/api/historyBooks';
const bookService = {
    // Get all books
    async getAllBooks() {
        const response = await fetch(API_URL);
        return await response.json();
    },

    // Create book
    async createBook(formData) {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData
        });
        return await response.json();
    },

    // Update book
    // async updateBook(id, formData) {
    //     const response = await fetch(`${API_URL}/${id}`, {
    //         method: 'PUT',
    //         body: formData
    //     });
    //     return await response.json();
    // },

    async updateBook(id, formData) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Failed to update book');
        }
        return await response.json();
    },

    // Delete book
    async deleteBook(id) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    }
};

export default bookService;