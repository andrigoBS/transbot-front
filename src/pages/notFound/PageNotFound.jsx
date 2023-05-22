import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Link, Typography, useTheme } from '@mui/material';
import Footer from '../../components/Footer';
import Partners from '../../components/Partners';

const makeStyle = (theme) => ({
    div: {
        display: 'block',
        width: '100%'
    },
    firstLinkBox: {
        marginBottom: '10px',
        marginTop: '-20px'
    },
    link: {
        fontWeight: 'bold',
        margin: '0 15px',
    },
    linksContainer: {
        padding: '0px 20px 20px',
    },
    textBox: {
        [theme.breakpoints.up('md')]: {
            padding: '50px 20%',
            textAlign: 'center',
        },
        padding: '35px',

        textAlign: 'left',
    },
    title: {
        marginBottom: '20px'
    },
    toCenter: {
        [theme.breakpoints.up('md')]: {
            justifyContent: 'center',
            textAlign: 'center',
        },
        display: 'flex',
        justifyContent: 'left',
        textAlign: 'left'
    }
});

const PageNotFound = () => {
    const location = useLocation();
    const theme = useTheme();
    const styles = makeStyle(theme);

    const from = location.state?.from?.pathname || '/';

    return (
        <div style={styles.div}>
            <Box sx={styles.textBox}>
                <Typography variant="h4" color={'secondary'} sx={styles.title}>
                    Página não encontrada
                </Typography>
                <Typography variant="p" color={'text'}>
                    Seja muito bem-vindo, infelizmente não encontramos a página solicitada,
                    por favor verifique se o link que você está acessando está correto,
                    caso tenha chegado aqui pela propria plataforma por favor informar ao suporte.
                </Typography>
            </Box>
            <Box sx={styles.linksContainer}>
                <Link href={from} underline="hover" color={'white'} sx={{ ...styles.toCenter, ...styles.firstLinkBox }}>
                    <Typography variant="p" color='secondary' sx={styles.link}>
                        Clique aqui para voltar a página anterior
                    </Typography>
                </Link>
            </Box>
            <Partners/>
            <Footer/>
        </div>
    );
};

export default PageNotFound;
