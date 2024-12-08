import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from '@mui/material';

function AddEditBookDialog({ open, handleClose, book, onSubmit }) {
    const [formData, setFormData] = useState({
        bookName: '',
        authorName: '',
        price: '',
        imageurl: "",
        // imagePreview: '',
    });

    useEffect(() => {
        if (book) {
            setFormData({
                bookName: book.bookName || 'name',
                authorName: book.authorName || 'unknow',
                price: book.price || '123',
                imageurl: book.imageUrl||""
                // imagePreview: book.imageUrl || '',
            });
        } else {
            setFormData({
                bookName: '',
                authorName: '',
                price: '',
                imageurl: '',
                // imagePreview: '',
            });
        }
    }, [book]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image' && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setFormData((prev) => ({
                    ...prev,
                    image: file,
                    imageurl: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('bookName', formData.bookName);
        data.append('authorName', formData.authorName);
        data.append('price', formData.price);

        if (formData.image) {
            data.append('image', formData.imageurl);
        }

        onSubmit(data);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>{book ? 'Edit Book' : 'Add New Book'}</DialogTitle>
                <DialogContent>
                    <input
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        style={{ margin: '10px 0' }}
                    />
                    {formData.imageurl && (
                        <img
                            src={formData.imageurl}
                            alt="Preview"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '200px',
                                marginBottom: '10px',
                            }}
                        />
                    )}
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Book Name"
                        name="bookName"
                        fullWidth
                        required
                        value={formData.bookName}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Author Name"
                        name="authorName"
                        fullWidth
                        required
                        value={formData.authorName}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        name="price"
                        type="number"
                        fullWidth
                        required
                        value={formData.price}
                        onChange={handleChange}
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
