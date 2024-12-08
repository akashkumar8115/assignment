import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addBook, updateBook } from '../features/booksSlice';

function AddEditBookDialog({ open, handleClose, book }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        author: '',
        price: '',
    });

    useEffect(() => {
        if (book) {
            setFormData(book);
        }
    }, [book]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (book) {
            dispatch(updateBook({ ...formData, id: book.id }));
        } else {
            dispatch(addBook(formData));
        }
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{book ? 'Edit Book' : 'Add New Book'}</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Book Name"
                        fullWidth
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Author"
                        fullWidth
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        type="number"
                        fullWidth
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained">
                        {book ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default AddEditBookDialog;
