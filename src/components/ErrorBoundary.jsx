import React from 'react';
import { Container, Typography, Button } from '@mui/material';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Container className="py-8 text-center">
                    <Typography variant="h4" className="mb-4">
                        Something went wrong
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => window.location.reload()}
                    >
                        Reload Page
                    </Button>
                </Container>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
