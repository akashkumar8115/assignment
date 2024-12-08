import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import BookCard from './BookCard';

const featuredBooks = [
    {
        id: 1,
        title: "The Midnight Library",
        author: "Matt Haig",
        price: 24.99,
        rating: 4.5,
        reviews: 2547,
        coverImage: "/books/midnight-library.jpg"
    },
    {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear",
        price: 19.99,
        rating: 4.8,
        reviews: 4521,
        coverImage: "/books/atomic-habits.jpg"
    },
    {
        id: 3,
        title: "Project Hail Mary",
        author: "Andy Weir",
        price: 27.99,
        rating: 4.7,
        reviews: 1832,
        coverImage: "/books/project-hail-mary.jpg"
    },
    {
        id: 4,
        title: "Dune",
        author: "Frank Herbert",
        price: 21.99,
        rating: 4.6,
        reviews: 3254,
        coverImage: "/books/dune.jpg"
    }
];

function BookGrid() {
    return (
        <Container maxWidth="lg" className="py-16">
            <Typography variant="h4" className="font-bold mb-8 text-center">
                Featured Books
            </Typography>
            <Grid container spacing={4}>
                {featuredBooks.map((book) => (
                    <Grid item xs={12} sm={6} md={3} key={book.id}>
                        <BookCard book={book} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default BookGrid;
