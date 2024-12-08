import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL ="https://assignment-backend-a3m9.onrender.com/api/historyBooks" || "http://localhost:5000/api/historyBooks";

const initialState = {
    books: [
        { id: 1, name: 'Book One', author: 'Author A', imageUrl: "https://img.freepik.com/free-vector/red-book-white-background_1308-26708.jpg?ga=GA1.1.168732325.1722966352&semt=ais_hybrid", price: 200 },
        { id: 2, name: 'Book Two', author: 'Author B', imageUrl: "https://img.freepik.com/premium-vector/school-books-illustration_977344-1313.jpg?ga=GA1.1.168732325.1722966352&semt=ais_hybrid", price: 150 },
        { id: 3, name: 'Book Three', author: 'Author C', imageUrl: "https://img.freepik.com/free-vector/open-blue-book-white_1308-69339.jpg?ga=GA1.1.168732325.1722966352&semt=ais_hybrid", price: 300 },
    ],
    status: 'idle',
    error: null,
    searchQuery: '',
    sortOption: '',
};

// Fix 1: Add proper action type names for each thunk
export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            const data = await response.json();
            return data.map(book => ({
                id: book.id,
                name: book.bookName || 'Untitled',
                author: book.authorName || 'Unknown Author',
                price: book.price || 0,
                imageUrl: book.imageUrl || 'https://img.freepik.com/free-vector/hand-drawn-flat-education-illustration-book-set_23-2151358291.jpg?semt=ais_hybrid',
            }));
        } catch (error) {
            throw error;
        }
    }
);


export const addBook = createAsyncThunk(
    'books/addBook',
    async (bookData) => {
        try {
            const response = await axios.post(API_URL, bookData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to add book');
        }
    }
);

export const updateBook = createAsyncThunk(
    'books/updateBook',
    async (bookData) => {
        try {
            const response = await axios.put(`${API_URL}/${bookData.id}`, bookData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update book');
        }
    }
);


export const deleteBook = createAsyncThunk(
    'books/deleteBook',
    async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return id;
        } catch (error) {
            throw new Error(`Failed to delete book: ${error.message}`);
        }
    }
);


const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setSortOption: (state, action) => {
            state.sortOption = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch books
            .addCase(fetchBooks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.books = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Add book
            .addCase(addBook.fulfilled, (state, action) => {
                state.books.push(action.payload);
            })
            // Update book
            .addCase(updateBook.fulfilled, (state, action) => {
                const index = state.books.findIndex(book => book.id === action.payload.id);
                if (index !== -1) {
                    state.books[index] = action.payload;
                }
            })
            // Delete book
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.books = state.books.filter(book => book.id !== action.payload);
            });
    },
});

export const { setSearchQuery, setSortOption } = booksSlice.actions;
export default booksSlice.reducer;
