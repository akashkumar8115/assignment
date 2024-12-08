import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Fab } from '@mui/material';
import { Add as AddIcon, Search } from '@mui/icons-material';
import BookCard from '../components/BookCard';
import AddEditBookDialog from '../components/AddEditBookDialog';
import bookService from '../services/api';
import SearchBar from '../components/SearchBar'; import SortOptions from '../components/SortOptions';
function BooksPage() {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [sortOption, setSortOption] = useState('none');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const filteredBooks = books.filter((book) => {
        return (
            book.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.authorName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    // Search handler
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    // Sort handler
    const handleSort = (option) => {
        setSortOption(option);
    };
    // Add price range handler
    const handlePriceRangeChange = (range) => {
        setPriceRange(range);
    };

    // Update the filter function
    const getFilteredAndSortedBooks = () => {
        let filteredBooks = books.filter((book) => {
            const matchesSearch = book.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.authorName.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesPriceRange = book.price >= priceRange[0] && book.price <= priceRange[1];
            return matchesSearch && matchesPriceRange;
        });

        switch (sortOption) {
            case 'lowToHigh':
                return [...filteredBooks].sort((a, b) => a.price - b.price);
            case 'highToLow':
                return [...filteredBooks].sort((a, b) => b.price - a.price);
            case 'nameAZ':
                return [...filteredBooks].sort((a, b) => a.bookName.localeCompare(b.bookName));
            case 'nameZA':
                return [...filteredBooks].sort((a, b) => b.bookName.localeCompare(a.bookName));
            default:
                return filteredBooks;
        }
    };

    // // Filter and sort books
    // const getFilteredAndSortedBooks = () => {
    //     let filteredBooks = books.filter((book) =>
    //         book.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         book.authorName.toLowerCase().includes(searchQuery.toLowerCase())
    //     );

    //     switch (sortOption) {
    //         case 'lowToHigh':
    //             return [...filteredBooks].sort((a, b) => a.price - b.price);
    //         case 'highToLow':
    //             return [...filteredBooks].sort((a, b) => b.price - a.price);
    //         default:
    //             return filteredBooks;
    //     }
    // };


    const fetchBooks = async () => {
        try {
            const data = await bookService.getAllBooks();
            setBooks(data);
        } catch (err) {
            setError('Failed to fetch books');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleCreate = async (formData) => {
        try {
            const response = await bookService.createBook(formData);
            console.log('Create response:', response);
            fetchBooks();
            setDialogOpen(false);
        } catch (err) {
            console.error('Create error details:', err);
            setError(`Failed to add book: ${err.message}`);
        }
    };


    // const handleUpdate = async (id, formData) => {
    //     try {
    //         await bookService.updateBook(id, formData);
    //         fetchBooks();
    //         setDialogOpen(false);
    //     } catch (err) {
    //         setError('Failed to update book');
    //     }
    // };

    const handleUpdate = async (formData) => {
        try {
            if (!selectedBook?._id) return;
            await bookService.updateBook(selectedBook._id, formData);
            fetchBooks();
            setDialogOpen(false);
            setSelectedBook(null); // Reset selected book after update
        } catch (err) {
            setError('Failed to update book');
        }
    };
    // Update the edit handler
    const handleEdit = (book) => {
        setSelectedBook(book);
        setDialogOpen(true);
    };
    const handleDelete = async (id) => {
        try {
            await bookService.deleteBook(id);
            fetchBooks();
        } catch (err) {
            setError('Failed to delete book');
        }
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container className='books-page pt-6'>
            <Typography variant="h4">Books Collection</Typography>
            <div className="relative">
                {/* Fixed Add Button */}
                <Fab
                    onClick={() => setDialogOpen(true)}
                    className="fixed bottom-4 right-4 z-50"
                >
                    <AddIcon />
                </Fab>

                {/* Responsive Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 my-4">
                    <div className="flex-grow w-full sm:w-auto">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                    <div className="flex-shrink-0 w-full sm:w-auto">
                        <SortOptions
                            onSort={handleSort}
                            onPriceRangeChange={handlePriceRangeChange}
                        />
                    </div>
                </div>
            </div>

            {/* <SortOptions onSort={handleSort} /> */}
            <Grid container spacing={2} className='mt-4 mb-4'>
                {getFilteredAndSortedBooks().map((book) => (
                    <Grid item xs={12} sm={6} md={4} key={book._id}>
                        <BookCard
                            book={book}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </Grid>
                ))}
            </Grid>
            {getFilteredAndSortedBooks().length === 0 && (
                <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
                    No books found matching your search.
                </Typography>
            )}
            <AddEditBookDialog
                open={dialogOpen}
                handleClose={() => setDialogOpen(false)}
                book={selectedBook}
                onSubmit={selectedBook ? handleUpdate : handleCreate}
            />
        </Container>
    );
}

export default BooksPage;
