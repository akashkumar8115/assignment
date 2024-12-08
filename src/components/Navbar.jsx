import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Box,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { Menu, Home, Book, Info, ContactMail } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const menuItems = [
        { text: 'Home', icon: <Home />, path: '/' },
        { text: 'Books', icon: <Book />, path: '/books' },
        { text: 'About', icon: <Info />, path: '/about' },
        { text: 'Contact', icon: <ContactMail />, path: '/contact' },
    ];

    const drawer = (
        <List>
            {menuItems.map((item) => (
                <ListItem
                    button
                    key={item.text}
                    component={Link}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="hover:bg-blue-100 transition-colors"
                >
                    <Box className="flex items-center space-x-2">
                        {item.icon}
                        <ListItemText primary={item.text} />
                    </Box>
                </ListItem>
            ))}
        </List>
    );

    return (
        <>
            <AppBar position="fixed" className="bg-white shadow-md">
                <Toolbar className="justify-between">
                    <Typography variant="h6" className="text-blue-600 font-bold">
                        BookStore
                    </Typography>

                    {isMobile ? (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="text-blue-600"
                        >
                            <Menu />
                        </IconButton>
                    ) : (
                        <Box className="flex space-x-4">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.text}
                                    to={item.path}
                                    className="text-blue-600 hover:text-blue-800 transition-colors px-4 py-2 rounded-md hover:bg-blue-50"
                                >
                                    {item.text}
                                </Link>
                            ))}
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                classes={{
                    paper: 'w-64',
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
}

export default Navbar;
