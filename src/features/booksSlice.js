import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://fake-book-api.herokuapp.com/books'; // Replace with actual API

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const addBook = createAsyncThunk('books/addBook', async (bookData) => {
    const response = await axios.post(API_URL, bookData);
    return response.data;
});

export const updateBook = createAsyncThunk('books/updateBook', async (bookData) => {
    const response = await axios.put(`${API_URL}/${bookData.id}`, bookData);
    return response.data;
});

export const deleteBook = createAsyncThunk('books/deleteBook', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const initialState = {
    books: [],
    status: 'idle',
    error: null,
    searchQuery: '',
    sortOption: '',
};

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
      setSearchQuery: (state, action) => {
        state.searchQuery = action.payload;
      },
      setSortOption: (state, action) => {
        state.sortOption = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
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
        .addCase(addBook.fulfilled, (state, action) => {
          state.books.push(action.payload);
        })
        .addCase(updateBook.fulfilled, (state, action) => {
          const index = state.books.findIndex(book => book.id === action.payload.id);
          if (index !== -1) {
            state.books[index] = action.payload;
          }
        })
        .addCase(deleteBook.fulfilled, (state, action) => {
          state.books = state.books.filter(book => book.id !== action.payload);
        });
    },
});

export const { setSearchQuery, setSortOption } = booksSlice.actions;
export default booksSlice.reducer;