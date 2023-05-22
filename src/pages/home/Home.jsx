import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, useTheme } from '@mui/material';
import Footer from '../../components/Footer';
import Partners from '../../components/Partners';

const createStyle = (theme) => ({
    aboutBox: {
        [theme.breakpoints.up('md')]: {
            marginBottom: '30px',
            marginRight: '10%',
            marginTop: '30px',
        },
        backgroundColor: theme.palette.secondary.main,
        padding: '30px',
    },
    button: {
        marginTop: '20px',
    }
});

const Home = () => {
    const theme = useTheme();
    const style = createStyle(theme);

    return (
        <>
            <Box sx={style.aboutBox}>
                <Typography variant={'h5'} color={'text'}>Sobre o projeto</Typography>
                <br/>
                <Typography variant={'body1'} color={'text'}>
                    Muito Prazer! Eu sou o {import.meta.env.REACT_APP_PROJECT_NAME}.
                </Typography>
                <Typography variant={'body1'} color={'text'}>
                    Sou um Chatbot, e meu objetivo é esclarecer todas as suas duvidas sobre o processo transessualizador,
                    e também sobre alguns assuntos do mundo Trans.
                </Typography>
                <Typography variant={'body1'} color={'text'}>
                    Eu fui desenvolvido baseando em linguagem natural escrita em Português do brasil, ou seja, sou capaz
                    de entender Português da forma como você fala, pode se expressar como quiser, fique a vontade. Consigo
                    Simular muito bem uma conversa humana.
                </Typography>
                <Typography variant={'body1'} color={'text'}>
                    Ah! E não tenha receio, nossa conversa será anonima, não irei guarda nenhum dado pessoal seu,
                    as mensagens ficarão salvas apenas no seu navegador e serão apagadas assim que você o fecha-lo.
                </Typography>
                <Link to={'/chat'}>
                    <Button variant="contained" sx={style.button}>
                        <Typography variant={'subtitle2'} color={'white'}>Vamos conversar?</Typography>
                    </Button>
                </Link>
            </Box>
            <Partners />
            <Footer />
        </>
    );
};

export default Home;
