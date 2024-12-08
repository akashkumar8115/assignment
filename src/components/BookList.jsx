import React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { setSearchQuery } from '../features/booksSlice';

function BookList() {
    const dispatch = useAppDispatch();
    const books = useAppSelector(state => state.books.books);
    const searchQuery = useAppSelector(state => state.books.searchQuery);

    return (
        // Your component JSX
        <>
        <input type="text" value={searchQuery} onChange={e => dispatch(setSearchQuery(e.target.value))} />
        {/* Your component JSX */}
        
        </>
    );
}

export default BookList;
