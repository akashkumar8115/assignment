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

function AddEditBookDialog({ open, handleClose, book, onSuccess, onError }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        author: '',
        price: '',
    });

    useEffect(() => {
        if (book) {
            setFormData(book);
        } else {
            setFormData({
                name: '',
                author: '',
                price: '',
            });
        }
    }, [book]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (book) {
                await dispatch(updateBook({ ...formData, id: book.id })).unwrap();
                onSuccess('Book updated successfully!');
            } else {
                await dispatch(addBook({ ...formData, id: Date.now() })).unwrap();
                onSuccess('Book added successfully!');
            }
        } catch (error) {
            onError(error.message || 'An error occurred');
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>{book ? 'Edit Book' : 'Add New Book'}</DialogTitle>
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