import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';

function ContactPage() {
    // State to store form data
    const [save, setSave] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        
        setFormData({
            name: '',
            email: '',
            message: '',
        });
        setSave(true);
    };

    return (
        <Container maxWidth="md" className="py-8 pt-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Paper className="p-8 shadow-lg">
                    <Typography variant="h4" className="mb-4 text-blue-600 font-bold">
                        Contact Us
                    </Typography>
                    {
                        save ? (
                            <Typography variant="body1" className="text-green-600">
                                Form submitted successfully!
                            </Typography>
                        ) : (
                            <Typography variant="body1" className="text-red-600">
                                Please fill out the form.
                            </Typography>
                        )
                    }

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            label="Message"
                            variant="outlined"
                            multiline
                            rows={4}
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className="w-full"
                            type="submit"
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
