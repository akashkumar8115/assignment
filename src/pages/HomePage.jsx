import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Typography, Fab, CircularProgress } from '@mui/material';
import { Add } from '@mui/icons-material';
import SearchBar from '../components/SearchBar';
import SortOptions from '../components/SortOptions';
import BookCard from '../components/BookCard';
import AddEditBookDialog from '../components/AddEditBookDialog';
import { fetchBooks } from '../features/booksSlice';

function HomePage() {
    const dispatch = useDispatch();
    const { books, searchQuery, sortOption, status } = useSelector((state) => state.books);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchBooks());
        }
    }, [status, dispatch]);

    const filteredBooks = books
        .filter((book) =>
            book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOption === 'lowToHigh') return a.price - b.price;
            if (sortOption === 'highToLow') return b.price - a.price;
            return 0;
        });

    const handleEdit = (book) => {
        setSelectedBook(book);
        setDialogOpen(true);
    };

    if (status === 'loading') {
        return <CircularProgress />;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Book Store
            </Typography>
            <SearchBar />
            <SortOptions />
            <Grid container spacing={3} sx={{ mt: 3 }}>
                {filteredBooks.map((book) => (
                    <Grid item xs={12} sm={6} md={4} key={book.id}>
                        <BookCard book={book} onEdit={handleEdit} />
                    </Grid>
                ))}
            </Grid>
            <Fab
                color="primary"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                onClick={() => {
                    setSelectedBook(null);
                    setDialogOpen(true);
                }}
            >
                <Add />
            </Fab>
            <AddEditBookDialog
                open={dialogOpen}
                handleClose={() => {
                    setDialogOpen(false);
                    setSelectedBook(null);
                }}
                book={selectedBook}
            />
        </Container>
    );
}

export default HomePage;
