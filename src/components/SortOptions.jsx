import React from 'react';
import { ButtonGroup, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSortOption } from '../features/booksSlice';

function SortOptions() {
    const dispatch = useDispatch();

    return (
        <ButtonGroup variant="contained" sx={{ mt: 2 }}>
            <Button onClick={() => dispatch(setSortOption('lowToHigh'))}>
                Price: Low to High
            </Button>
            <Button onClick={() => dispatch(setSortOption('highToLow'))}>
                Price: High to Low
            </Button>
        </ButtonGroup>
    );
}

export default SortOptions;