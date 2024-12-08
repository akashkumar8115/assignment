// import React from 'react';
// import { ButtonGroup, Button } from '@mui/material';

// function SortOptions({ onSort }) {
//     return (
//         <ButtonGroup variant="contained" sx={{ mt: 2 }}>
//             <Button onClick={() => onSort('lowToHigh')}>
//                 Price: Low to High
//             </Button>
//             <Button onClick={() => onSort('highToLow')}>
//                 Price: High to Low
//             </Button>
//             <Button onClick={() => onSort('none')}>
//                 Clear Sort
//             </Button>
//         </ButtonGroup>
//     );
// }

// export default SortOptions;

// 2nd1 oeration
import React, { useState } from 'react';
import {
    ButtonGroup,
    Button,
    Select,
    MenuItem,
    Slider,
    FormControl,
    InputLabel,
    Box,
    Typography
} from '@mui/material';

function SortOptions({ onSort, onPriceRangeChange }) {
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [sortType, setSortType] = useState('none');

    const handlePriceRangeChange = (event, newValue) => {
        setPriceRange(newValue);
        onPriceRangeChange(newValue);
    };

    const handleSortChange = (event) => {
        const value = event.target.value;
        setSortType(value);
        onSort(value);
    };

    return (
        <div className='flex flex-col items-center justify-center gap-4'>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                        value={sortType}
                        label="Sort By"
                        onChange={handleSortChange}
                    >
                        <MenuItem value="none">None</MenuItem>
                        <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
                        <MenuItem value="highToLow">Price: High to Low</MenuItem>
                        <MenuItem value="nameAZ">Name: A to Z</MenuItem>
                        <MenuItem value="nameZA">Name: Z to A</MenuItem>
                    </Select>
                </FormControl>

                <Box sx={{ width: 300 }}>
                    <Typography gutterBottom>
                        Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                    </Typography>
                    <Slider
                        value={priceRange}
                        onChange={handlePriceRangeChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={1000}
                    />
                </Box>
            </Box>
        </div>
    );
}

export default SortOptions;
