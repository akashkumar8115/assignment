import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../features/booksSlice';

export const useBooks = () => {
    const dispatch = useDispatch();
    const { books, status, error, searchQuery, sortOption } = useSelector(
        (state) => state.books
    );

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchBooks());
        }
    }, [status, dispatch]);

    const filteredAndSortedBooks = books
        .filter(
            (book) =>
                book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.author.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOption === 'lowToHigh') return a.price - b.price;
            if (sortOption === 'highToLow') return b.price - a.price;
            return 0;
        });

    return {
        books: filteredAndSortedBooks,
        status,
        error,
    };
};
