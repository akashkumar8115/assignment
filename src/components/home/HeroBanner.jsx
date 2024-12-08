
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function HeroBanner() {
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20">
            <Container maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row items-center justify-between"
                >
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <Typography variant="h2" className="font-bold mb-4">
                            Discover Your Next Great Read
                        </Typography>
                        <Typography variant="h6" className="mb-6 opacity-90">
                            Explore thousands of books from contemporary bestsellers 
                            to timeless classics.
                        </Typography>
                        <Button 
                            variant="contained" 
                            size="large"
                            color="secondary"
                            onClick={() => navigate('/books')}
                            className="text-lg px-8 py-3"
                        >
                            Browse Books
                        </Button>
                    </div>
                    <div className="md:w-1/2">
                        <img 
                            src="https://img.freepik.com/free-vector/vintage-book-elements-collection-with-different-books_1284-34544.jpg" 
                            alt="Books Collection" 
                            className="w-full max-w-md mx-auto"
                        />
                    </div>
                </motion.div>
            </Container>
        </div>
    );
}

export default HeroBanner;
