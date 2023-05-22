import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import { Grid, IconButton, Typography, useTheme } from '@mui/material';
import LogoIcon from '../icons/LogoIcon';

const useStyles = (theme) => ({
    container: {
        backgroundColor: theme.palette.primary.main,
        padding: '40px'
    },
    padding:{
        paddingTop: '25px'
    },
    toCenter: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center'
    },
});

const Footer = () => {
    const theme = useTheme();
    const styles = useStyles(theme);

    return (
        <Grid container sx={styles.container} spacing={1} justifyContent={'center'}>
            <Grid item xs={12} sx={styles.toCenter}>
                <LinkRouter to={'/'}>
                    <IconButton edge="start" color="secondary" aria-label="menu">
                        <LogoIcon />
                    </IconButton>
                </LinkRouter>
            </Grid>
            <Grid item xs={12} sx={styles.toCenter}>
                <Typography variant="p" color={'white'} sx={styles.padding} >
                    2023 - Univali - Equipe Transbot
                </Typography>
            </Grid>
        </Grid>
    );
};

export default Footer;
