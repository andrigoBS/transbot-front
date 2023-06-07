import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Diversity1Icon from '@mui/icons-material/Diversity1';

const LogoIcon = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Diversity1Icon sx={{ color: 'white' }} />
            <Typography sx={{ flexGrow: 1, marginLeft: '10px' }} variant={isDesktop? 'h5': 'h6'} color={'white'}>
                {import.meta.env.REACT_APP_PROJECT_NAME}
            </Typography>
        </Box>
    );
};

export default LogoIcon;
