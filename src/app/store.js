import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/booksSlice';

export const store = configureStore({
    reducer: {
        books: booksReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['books/fetchBooks/fulfilled'],
                ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
            },
        }),

});

// Add this to store.js temporarily
console.log('Store created:', store.getState());
console.log('Store initialized:', store.getState());


// export default store;