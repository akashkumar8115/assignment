import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

function SearchBar({ onSearch }) {
    if (typeof onSearch !== 'function') {
        console.warn('onSearch prop must be a function');
        onSearch = () => {}; // Fallback empty function
    }

    const handleChange = (e) => {
        onSearch(e.target.value);
    };

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
            onChange={handleChange}
            sx={{ maxWidth: '400px' }}
        />
    );
}

export default SearchBar;
