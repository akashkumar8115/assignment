import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../features/booksSlice';

function SearchBar() {
    const dispatch = useDispatch();

    return (
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Search books by name or author..."
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                ),
            }}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
    );
}

export default SearchBar;
