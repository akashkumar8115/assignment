import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from '@mui/material';
import { addBook, updateBook } from '../features/booksSlice';
import { image } from 'framer-motion/client';

function AddEditBookDialog({ open, handleClose, book, onSuccess, onError }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        imageUrl: '',
        name: '',
        author: '',
        price: '',
    });

    useEffect(() => {
        if (book) {
            setFormData(book);
        } else {
            setFormData({
                imageUrl: '',
                name: '',
                author: '',
                price: '',
            });
        }
    }, [book]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const bookData = {
                imageUrl: formData.imageUrl,
                name: formData.name,
                author: formData.author,
                price: Number(formData.price)
            };

            if (book) {
                await dispatch(updateBook({ ...bookData, id: book.id })).unwrap();
                onSuccess('Book updated successfully!');
                console.log('Book updated successfully!', bookData);

            } else {
                await dispatch(addBook(bookData)).unwrap();
                onSuccess('Book added successfully!');
                console.log('Book added Unsuccessfully!', bookData);
            }
            handleClose();
        } catch (error) {
            onError(error.message || 'An error occurred');
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>{book ? 'Edit Book' : 'Add New Book'}</DialogTitle>
                <DialogActions>
                    <input type="file" accept="image/*"
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        autoFocus
                        margin="dense"
                        label="Book imagee"
                        fullWidth
                        required
                        value={formData.imageUrl}
                    />
                </DialogActions>

                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Book Name"
                        fullWidth
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Author"
                        fullWidth
                        required
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        type="number"
                        fullWidth
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">
                        {book ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>


            </form>
        </Dialog>
    );
}

export default AddEditBookDialog;