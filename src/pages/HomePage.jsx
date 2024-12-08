import React from 'react';
import { Container, Typography, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroBanner from '../components/home/HeroBanner';
import BookGrid from '../components/home/BookGrid';
import AboutSection from '../components/home/AboutSection';
function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen"
            >
                <HeroBanner />
                <BookGrid />
                <AboutSection />
            </motion.div>
            <Container maxWidth="lg" className="py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h2" className="font-bold mb-4">
                                Welcome to BookStore
                            </Typography>
                            <Typography variant="h5" className="text-gray-600 mb-6">
                                Discover your next favorite book
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => navigate('/books')}
                                className="text-lg"
                            >
                                Browse Books
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} className="p-6">
                                <img
                                    src="/books-illustration.svg"
                                    alt="Books"
                                    className="w-full"
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </motion.div>
            </Container>

        </div>
    );
}

export default HomePage;