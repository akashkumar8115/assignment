import React from 'react';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';

function ContactPage() {
    return (
        <Container maxWidth="md" className="py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Paper className="p-8 shadow-lg">
                    <Typography variant="h4" className="mb-4 text-blue-600 font-bold">
                        Contact Us
                    </Typography>
                    <form className="space-y-4">
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            type="email"
                        />
                        <TextField
                            fullWidth
                            label="Message"
                            variant="outlined"
                            multiline
                            rows={4}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className="w-full"
                        >
                            Send Message
                        </Button>
                    </form>
                </Paper>
            </motion.div>
        </Container>
    );
}

export default ContactPage;
