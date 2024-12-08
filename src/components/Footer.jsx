import React from 'react';
import { Container, Typography, Box, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

function Footer() {
    return (
        <Box component="footer" className="bg-gray-800 text-white py-8 mt-auto">
            <Container maxWidth="lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <Typography variant="h6" className="mb-4">BookStore</Typography>
                        <Typography variant="body2">
                            Your one-stop destination for all your reading needs.
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="h6" className="mb-4">Quick Links</Typography>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:text-blue-400">Home</a></li>
                            <li><a href="/books" className="hover:text-blue-400">Books</a></li>
                            <li><a href="/about" className="hover:text-blue-400">About</a></li>
                            <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <Typography variant="h6" className="mb-4">Follow Us</Typography>
                        <div className="flex space-x-4">
                            <IconButton color="inherit"><Facebook /></IconButton>
                            <IconButton color="inherit"><Twitter /></IconButton>
                            <IconButton color="inherit"><Instagram /></IconButton>
                            <IconButton color="inherit"><LinkedIn /></IconButton>
                        </div>
                    </div>
                </div>
                <Typography variant="body2" className="text-center mt-8">
                    © {new Date().getFullYear()} BookStore. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;
