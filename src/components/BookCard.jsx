import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { deleteBook } from '../features/booksSlice';

function BookCard({ book, onEdit }) {
    const dispatch = useDispatch();

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
        >
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {book.name}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        Author: {book.author}
                    </Typography>
                    <Typography variant="h6" color="primary">
                        ${book.price}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton onClick={() => onEdit(book)}>
                            <Edit />
                        </IconButton>
                        <IconButton onClick={() => dispatch(deleteBook(book.id))}>
                            <Delete />
                        </IconButton>
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default BookCard;
