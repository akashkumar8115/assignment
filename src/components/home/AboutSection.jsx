import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import { LocalLibrary, People, Event, EmojiObjects } from '@mui/icons-material';

function AboutSection() {
    const features = [
        {
            icon: <LocalLibrary fontSize="large" />,
            title: "Vast Collection",
            description: "Access to over 100,000 titles across all genres"
        },
        {
            icon: <People fontSize="large" />,
            title: "Expert Staff",
            description: "Knowledgeable bookworms ready to help"
        },
        {
            icon: <Event fontSize="large" />,
            title: "Regular Events",
            description: "Author meetups and reading clubs"
        },
        {
            icon: <EmojiObjects fontSize="large" />,
            title: "Personalized Recommendations",
            description: "Get curated suggestions based on your interests"
        }
    ];

    return (
        <div className="bg-gray-50 py-16">
            <Container maxWidth="lg">
                <Typography variant="h4" className="font-bold mb-12 text-center">
                    Why Choose BookStore?
                </Typography>
                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Paper className="p-6 h-full text-center hover:shadow-lg transition-shadow">
                                <div className="text-blue-600 mb-4">
                                    {feature.icon}
                                </div>
                                <Typography variant="h6" className="mb-2">
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {feature.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}

export default AboutSection;
