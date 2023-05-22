import React from 'react';
import { Box, useTheme } from '@mui/material';
import PetIcon from '../../icons/pet/PetIcon';
import ChatContainer from './chatContainer/ChatContainer';

const makeStyles = (theme) => ({
    container: {
        backgroundColor: theme.palette.background.dark,
        display: 'flex',
    },
    containerChat: {
        width: '100%'
    },
    petContainer: {
        [theme.breakpoints.up('lg')]: {
            marginBottom: '40px',
        },
        alignContent: 'end',
        display: 'grid',
        marginBottom: '15px',
        marginLeft: '-15px',
        marginRight: '-10px',
    },
    petIcon: {
        [theme.breakpoints.up('xl')]: {
            width: '350px',
        },

        [theme.breakpoints.up('lg')]: {
            width: '250px',
        },

        [theme.breakpoints.up('md')]: {
            width: '200px',
        },

        [theme.breakpoints.up('sm')]: {
            width: '160px',
        },

        width: '80px',
    },
});

const Chat = () => {
    const theme = useTheme();
    const styles = makeStyles(theme);

    return (
        <Box sx={styles.container}>
            <Box sx={styles.petContainer}>
                <PetIcon sx={styles.petIcon} />
            </Box>
            <Box sx={styles.containerChat}>
                <ChatContainer />
            </Box>
        </Box>
    );
};

export default Chat;
