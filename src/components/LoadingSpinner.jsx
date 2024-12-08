import React from 'react';
import { CircularProgress, Box } from '@mui/material';

function LoadingSpinner() {
    return (
        <Box className="flex justify-center items-center min-h-[200px]">
            <CircularProgress />
        </Box>
    );
}

export default LoadingSpinner;
