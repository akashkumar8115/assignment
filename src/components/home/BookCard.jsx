import React from 'react';
import { Card, CardContent, CardMedia, Typography, Rating } from '@mui/material';
import { motion } from 'framer-motion';

function BookCard({ book }) {
    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
        >
            <Card className="h-full hover:shadow-lg transition-shadow">
                <CardMedia
                    component="img"
                    height="200"
                    image={book.coverImage}
                    alt={book.title}
                    className="h-48 object-cover"
                />
                <CardContent>
                    <Typography variant="h6" className="font-semibold mb-1">
                        {book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="mb-2">
                        {book.author}
                    </Typography>
                    <div className="flex items-center mb-2">
                        <Rating value={book.rating} readOnly size="small" />
                        <Typography variant="body2" className="ml-2">
                            ({book.reviews})
                        </Typography>
                    </div>
                    <Typography variant="h6" color="primary" className="font-bold">
                        ${book.price}
                    </Typography>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default BookCard;
