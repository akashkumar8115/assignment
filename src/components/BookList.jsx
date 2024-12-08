import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import BookCard from './BookCard';

function BookList({ onEditBook }) {
    const { books, searchQuery, sortOption } = useSelector((state) => state.books);

    // Filter and sort books
    const filteredAndSortedBooks = React.useMemo(() => {
        return [...books]
            .filter((book) =>
                book?.name?.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
                book?.author?.toLowerCase().includes((searchQuery || '').toLowerCase())
            )
            .sort((a, b) => {
                if (sortOption === 'lowToHigh') return a.price - b.price;
                if (sortOption === 'highToLow') return b.price - a.price;
                return 0;
            });
    }, [books, searchQuery, sortOption]);

    if (!filteredAndSortedBooks.length) {
        return (
            <Typography variant="h6" align="center" color="textSecondary">
                No books found
            </Typography>
        );
    }

    return (
        <Grid container spacing={3}>
            {filteredAndSortedBooks.map((book) => (
                <Grid item xs={12} sm={6} md={4} key={book.id || Math.random()}>
                    <BookCard book={book} onEdit={() => onEditBook(book)} />
                </Grid>
            ))}
        </Grid>
    );
}

export default BookList;
