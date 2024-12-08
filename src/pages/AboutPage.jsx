import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

function AboutPage() {
    return (
        <Container maxWidth="md" className="py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Paper className="p-8 shadow-lg">
                    <Typography variant="h4" className="mb-4 text-blue-600 font-bold">
                        About Us
                    </Typography>
                    <Typography paragraph>
                        Welcome to BookStore, your premier destination for quality books...
                    </Typography>
                    {/* Add more content as needed */}
                </Paper>
            </motion.div>
        </Container>
    );
}

export default AboutPage;
