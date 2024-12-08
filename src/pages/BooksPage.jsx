import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Fab } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import BookCard from '../components/BookCard';
import AddEditBookDialog from '../components/AddEditBookDialog';
import bookService from '../services/api';

function BooksPage() {
    const [books, setBooks] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchBooks = async () => {
        try {
            const data = await bookService.getAllBooks();
            setBooks(data);
        } catch (err) {
            setError('Failed to fetch books');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleCreate = async (formData) => {
        try {
            const response = await bookService.createBook(formData);
            console.log('Create response:', response);
            fetchBooks();
            setDialogOpen(false);
        } catch (err) {
            console.error('Create error details:', err);
            setError(`Failed to add book: ${err.message}`);
        }
    };


    // const handleUpdate = async (id, formData) => {
    //     try {
    //         await bookService.updateBook(id, formData);
    //         fetchBooks();
    //         setDialogOpen(false);
    //     } catch (err) {
    //         setError('Failed to update book');
    //     }
    // };

    const handleUpdate = async (formData) => {
        try {
            if (!selectedBook?._id) return;
            await bookService.updateBook(selectedBook._id, formData);
            fetchBooks();
            setDialogOpen(false);
            setSelectedBook(null); // Reset selected book after update
        } catch (err) {
            setError('Failed to update book');
        }
    };
    // Update the edit handler
    const handleEdit = (book) => {
        setSelectedBook(book);
        setDialogOpen(true);
    };
    const handleDelete = async (id) => {
        try {
            await bookService.deleteBook(id);
            fetchBooks();
        } catch (err) {
            setError('Failed to delete book');
        }
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container className='books-page pt-6'>
            <Typography variant="h4">Books Collection</Typography>
            <Fab onClick={() => setDialogOpen(true)}>
                <AddIcon />
            </Fab>
            <Grid container spacing={2} className='mt-4 mb-4'>
                {books.map((book) => (
                    <Grid item xs={12} sm={6} md={4} key={book._id}>
                        {/* <BookCard book={book} onEdit={setSelectedBook} onDelete={handleDelete}/> */}
                        <BookCard book={book} onEdit={handleEdit} onDelete={handleDelete} />
                    </Grid>
                ))}
            </Grid>
            <AddEditBookDialog
                open={dialogOpen}
                handleClose={() => setDialogOpen(false)}
                book={selectedBook}
                onSubmit={selectedBook ? handleUpdate : handleCreate}
            />
        </Container>
    );
}

export default BooksPage;
