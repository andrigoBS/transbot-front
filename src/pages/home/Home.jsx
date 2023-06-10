import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import Footer from '../../components/Footer';
import MessageBubble from '../../components/MessageBubble';
import Partners from '../../components/Partners';
import PetTalk from '../../components/PetTalk';
import exemplePNG from '../../icons/exemple/exemple.png';

const createStyle = (theme) => ({
    aboutBox: {
        [theme.breakpoints.up('md')]: {
            marginBottom: '30px',
            marginTop: '30px',
            width: '90%'
        },
        backgroundColor: theme.palette.secondary.main,
        padding: '30px',
        width: '100%'
    },
    button: {
        marginTop: '20px',
    },
    image: {
        marginTop: '35px',
    },
    message: {
        [theme.breakpoints.up('xl')]: {
            marginRight: '40%',
        },

        [theme.breakpoints.up('md')]: {
            marginRight: '12%',
        },

        margin: '20px 20px 20px 0px',
    },
    petTalk: {
        [theme.breakpoints.up('md')]: {
            height: '500px',
        },
        [theme.breakpoints.up('sm')]: {
            height: '550px',
            paddingTop: '20px'
        },
        height: '750px',
    },
});

const Home = () => {
    const theme = useTheme();
    const style = createStyle(theme);

    const usedHeight = useMediaQuery(theme.breakpoints.up('md'))? 300: 200;

    return (
        <>
            <Grid container sx={style.aboutBox}>
                <Grid item xs={12} sm={6}>
                    <Typography variant={'h5'} color={'text'}>Sobre o Projeto</Typography>
                    <br/>
                    <Typography variant={'body1'} color={'text'}>
                        Obrigado por acessar! Conheça o {import.meta.env.REACT_APP_PROJECT_NAME}.
                    </Typography>
                    <Link to={'/chat'}>
                        <Button variant="contained" sx={style.button}>
                            <Typography variant={'subtitle2'} color={'white'}>Conversar agora!</Typography>
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={6} sx={style.image}>
                    <img src={exemplePNG} alt={'pc-exemple'} height={usedHeight}/>
                </Grid>
            </Grid>
            <br/>
            <br/>
            <PetTalk sx={style.petTalk}>
                <MessageBubble white left backgroundColor={theme.palette.background.dark} sx={style.message}>
                    <Typography variant={'body1'} color={'text'}>
                        Muito Prazer! Eu sou o {import.meta.env.REACT_APP_PROJECT_NAME}.
                    </Typography>
                    <br/>
                    <Typography variant={'body1'} color={'text'}>
                        Sou um <b>Chatbot</b>, e meu objetivo é esclarecer todas as suas dúvidas sobre o processo
                        <b> transexualizador</b>, e também sobre alguns assuntos do mundo Trans.
                    </Typography>
                </MessageBubble>
                <MessageBubble white left backgroundColor={theme.palette.background.dark} sx={style.message}>
                    <Typography variant={'body1'} color={'text'}>
                        Consigo simular muito bem uma conversa humana, porque fui desenvolvido <b>baseando em linguagem
                        natural escrita em Português do brasil</b>, ou seja, sou capaz de entender Português da forma como
                        você fala, pode se expressar como quiser, fique à vontade.
                    </Typography>
                </MessageBubble>
                <MessageBubble white left backgroundColor={theme.palette.background.dark} sx={style.message}>
                    <Typography variant={'body1'} color={'text'}>
                        Ah! E não tenha receio, nossa conversa será <b>anônima</b>, não irei guarda nenhum dado pessoal
                        seu, as mensagens ficarão <b>salvas apenas no seu navegador e serão apagadas assim que você o
                        fecha-lo</b>
                    </Typography>
                    <Link to={'/chat'}>
                        <Button variant="contained" sx={style.button}>
                            <Typography variant={'subtitle2'} color={'white'}>Vamos conversar?</Typography>
                        </Button>
                    </Link>
                </MessageBubble>
            </PetTalk>
            <Partners />
            <Footer />
        </>
    );
};

export default Home;
