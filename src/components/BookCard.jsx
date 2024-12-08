import React from 'react';
import { Card, CardContent, Typography, IconButton, Box, Chip } from '@mui/material';
import { Edit, Delete, ShoppingCart } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { deleteBook } from '../features/booksSlice';

function BookCard({ book, onEdit }) {
    const dispatch = useDispatch();
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await dispatch(deleteBook(book.id)).unwrap();
            } catch (error) {
                console.error('Failed to delete book:', error);
            }
        }
    };
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="card-hover"
        >
            <Card className="h-full flex flex-col">
                <CardContent className="flex-1">
                    <Typography variant="h5" className="font-bold text-gray-800 mb-2">
                        {book.name}
                    </Typography>
                    <Typography className="text-gray-600 mb-2">
                        Author: {book.author}
                    </Typography>
                    <Chip
                        label={`$${book.price}`}
                        color="primary"
                        className="mb-4"
                    />
                    <Box className="flex justify-between items-center mt-4">
                        <IconButton
                            onClick={() => onEdit(book)}
                            className="hover:text-blue-600"
                        >
                            <Edit />
                        </IconButton>
                        <IconButton
                            onClick={() => dispatch(deleteBook(book.id))}
                            className="hover:text-red-600"
                        >
                            <Delete />
                        </IconButton>
                        <IconButton
                            className="hover:text-green-600"
                        >
                            <ShoppingCart />
                        </IconButton>
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default BookCard;
