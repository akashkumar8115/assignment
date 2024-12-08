import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Container,
    Grid,
    Typography,
    Fab,
    Snackbar,
    Alert
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import SearchBar from '../components/SearchBar';
import SortOptions from '../components/SortOptions';
import BookCard from '../components/BookCard';
import AddEditBookDialog from '../components/AddEditBookDialog';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchBooks } from '../features/booksSlice';

function BooksPage() {
    const dispatch = useDispatch();
    const { books, searchQuery, sortOption, status } = useSelector((state) => state.books);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchBooks());
        }
    }, [status, dispatch]);

    const handleAddBook = () => {
        setSelectedBook(null);
        setDialogOpen(true);
    };

    const handleEditBook = (book) => {
        setSelectedBook(book);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedBook(null);
    };

    const handleSuccess = (message) => {
        setSnackbar({
            open: true,
            message,
            severity: 'success'
        });
        handleDialogClose();
    };

    const handleError = (message) => {
        setSnackbar({
            open: true,
            message,
            severity: 'error'
        });
    };

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

    if (status === 'loading') {
        return <LoadingSpinner />;
    }

    return (
        <Container maxWidth="lg" className="py-8 pt-16">
            <div className="flex justify-between items-center mb-6">
                <Typography variant="h4" component="h1">
                    Book Collection
                </Typography>
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={handleAddBook}
                    className="hover:bg-blue-600"
                >
                    <AddIcon />
                </Fab>
            </div>

            <SearchBar />
            <SortOptions />

            <Grid container spacing={3} className="mt-6">
                {filteredBooks.map((book) => (
                    <Grid item xs={12} sm={6} md={4} key={book.id}>
                        <BookCard
                            book={book}
                            onEdit={() => handleEditBook(book)}
                        />
                    </Grid>
                ))}
            </Grid>

            <AddEditBookDialog
                open={dialogOpen}
                handleClose={handleDialogClose}
                book={selectedBook}
                onSuccess={handleSuccess}
                onError={handleError}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default BooksPage;