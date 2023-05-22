import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, IconButton, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import LogoIcon from '../icons/LogoIcon';

const TopBar = ({ children }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <>
            <AppBar color="primary" position="static">
                <Toolbar variant="dense">
                    <Link to={'/'}>
                        <IconButton edge="start" color="secondary" aria-label="menu" sx={{ mr: isDesktop ? 2 : 0 }}>
                            <LogoIcon />
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
            <Box>
                {children}
            </Box>
        </>
    );
};

export default TopBar;
