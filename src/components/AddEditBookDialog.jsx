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
import { addBook, updateBook,deleteBook,fetchBooks } from '../features/booksSlice';

function AddEditBookDialog({ open, handleClose, book, onSuccess, onError }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        author: '',
        price: '',
        imageUrl: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (book) {
            setFormData(book);
        } else {
            setFormData({
                name: '',
                author: '',
                price: '',
                imageUrl: ''
            });
        }
    }, [book]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, imageUrl: reader.result });
            };
            reader.readAsDataURL(file);
            setSelectedFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const bookData = {
                name: formData.name,
                author: formData.author,
                price: Number(formData.price),
                imageUrl: formData.imageUrl
            };

            if (book) {
                await dispatch(updateBook({ ...bookData, id: book.id })).unwrap();
                onSuccess('Book updated successfully!');
            } else {
                await dispatch(addBook(bookData)).unwrap();
                onSuccess('Book added successfully!');
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
                <DialogContent>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ margin: '10px 0' }}
                    />
                    {formData.imageUrl && (
                        <img
                            src={formData.imageUrl}
                            alt="Preview"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '200px',
                                marginBottom: '10px'
                            }}
                        />
                    )}
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
