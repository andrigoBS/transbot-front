import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import MessageBubble from '../../../../components/MessageBubble';

const makeStyles = (theme) => ({
    chatMessageLeft: {
        marginLeft: '10px',
        marginRight: '15%',
        width: 'fit-content',
    },
    chatMessageRight: {
        display: 'grid',
        justifyContent: 'flex-end',
        marginLeft: '15%',
        marginRight: '10px',
    },
    container: {
        height: '98%',
        marginRight: '-10px',
        overflowY: 'scroll',
        paddingBottom: '15px',
        paddingRight: '15px'
    },
});

const chatBotName = import.meta.env.REACT_APP_PROJECT_NAME;

const RenderMessages = ({ messages, write }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);

    const refScrollFunc = (ref) => {
        ref?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Box sx={styles.container}>
                {messages.map((value, index) => (
                    <Box sx={value.fromUser ? styles.chatMessageRight : styles.chatMessageLeft} key={'message-'+index}
                        {...(index === messages.length -1 ? { ref: refScrollFunc } : {})}
                    >
                        <MessageBubble left={!value.fromUser} label={value.fromUser? 'Você': chatBotName}>{value.message}</MessageBubble>
                    </Box>
                ))}
            </Box>
            {write && (<Typography variant={'subtitle2'}>{chatBotName} está digitando...</Typography>)}
        </>
    );
};

export default RenderMessages;
