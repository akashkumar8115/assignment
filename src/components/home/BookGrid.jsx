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
        coverImage: "https://img.freepik.com/free-vector/hand-drawn-flat-education-illustration-book-set_23-2151358291.jpg?semt=ais_hybrid"
    },
    {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear",
        price: 19.99,
        rating: 4.8,
        reviews: 4521,
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwxH5bTovmI8NaDFms9LXiwmC6gTwule7JFhNEhxxwJB8MdG1XNVQORYyHBOyl0eGwj7c&usqp=CAU"
    },
    {
        id: 3,
        title: "Project Hail Mary",
        author: "Andy Weir",
        price: 27.99,
        rating: 4.7,
        reviews: 1832,
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr0BW7imkpcXrun-Yf7ntxe6FLj7fe1n_gNVahijlYjvbBEo5JVEXOQK6lendYqXQhdVg&usqp=CAU"
    },
    {
        id: 4,
        title: "Dune",
        author: "Frank Herbert",
        price: 21.99,
        rating: 4.6,
        reviews: 3254,
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO32Qj8RbsafOtD33hk6C_EPb07MZ4oQPIWFmPMqRIvx1h_wKrkOZgpe5dm2uzQpd5Udw&usqp=CAU"
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
