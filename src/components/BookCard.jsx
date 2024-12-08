import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Chip, Box } from '@mui/material';
import { Edit, Delete, ShoppingCart } from '@mui/icons-material';
import { motion } from 'framer-motion';

function BookCard({ book, onEdit, onDelete }) {
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            onDelete(book._id);
        }
    };

    return (
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Card>
                <CardContent>
                    {book.imageUrl ? (
                        <img src={book.imageUrl} alt={book.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    ) : (
                        <div style={{ width: '100%', height: '200px', backgroundColor: '#ccc' }}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO32Qj8RbsafOtD33hk6C_EPb07MZ4oQPIWFmPMqRIvx1h_wKrkOZgpe5dm2uzQpd5Udw&usqp=CAU" alt="Book" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />

                        </div>
                    )}
                    <Typography variant="h5">{book.bookName}</Typography>
                    <Typography>Author: {book.authorName}</Typography>
                    <Chip label={`$${book.price}`} color="primary" />
                    <Box mt={2}>
                        <IconButton onClick={() => onEdit(book)}><Edit />

                        </IconButton>

                        <IconButton onClick={handleDelete}><Delete /></IconButton>
                        <IconButton><ShoppingCart /></IconButton>
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default BookCard;
