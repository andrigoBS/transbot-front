import React, { useCallback, useEffect, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import MessageBubble from '../../../components/MessageBubble';
import SendMessageField from '../../../components/SendMessageField';
import HttpHelper from '../../../helpers/HttpHelper';
import StorageHelper from '../../../helpers/StorageHelper';
import RenderMessages from './renderMessages/RenderMessages';

const makeStyles = (theme) => ({
    containerChatMessage: {
        [theme.breakpoints.up('md')]: {
            margin: '40px 50px 0px 0px',
        },
        margin: '15px 15px 0px 0px',
    },
    messageSend: {
        [theme.breakpoints.up('md')]: {
            margin: '40px 50px 40px 0px',
        },
        margin: '15px 15px 15px 0px',
        padding: '15px',
    },
});

const ChatContainer = () => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const usedHeight = useMediaQuery(theme.breakpoints.up('md'))? 238: 163;

    const [height, setHeight] = useState(window.innerHeight - usedHeight);

    useEffect(() => {
        const handleWindowResize = () => {
            setHeight(window.innerHeight - usedHeight);
        };
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [usedHeight]);

    const [messages, setMessages] = useState(StorageHelper.getArray('messages'));
    const [awaitAnswersCount, setAwaitAnswersCount] = useState(StorageHelper.getNumber('awaitAnswersCount'));

    const pushMessage = useCallback((message, incrementOrDecrementCount) => {
        StorageHelper.pushOnArray('messages',message);
        if(incrementOrDecrementCount) {
            StorageHelper.incrementNumber('awaitAnswersCount');
        } else {
            StorageHelper.decrementNumber('awaitAnswersCount');
        }

        setMessages(StorageHelper.getArray('messages'));
        setAwaitAnswersCount(StorageHelper.getNumber('awaitAnswersCount'));
    }, []);

    const onSend = useCallback((value) => {
        pushMessage({ fromUser: true, message: value }, true);
        const lastAnswer = StorageHelper.getString('lastAnswer');
        let message = '';

        let newLastAnswer = '';
        HttpHelper.post('talk', { lastAnswer, question: value }).then((response) => {
            message = response.answer;
            if(!message) {
                message = 'Não entendi, poderia me explicar um pouco melhor?';
            } else {
                newLastAnswer = message;
            }
        }).catch((err) => {
            console.log(err);
            message = 'Estou recebendo muitas mensagens, por favor espere um instante e tente novamente';
        }).finally(() => {
            StorageHelper.setString('lastAnswer', newLastAnswer);
            pushMessage({ fromUser: false, message: message }, false);
        });
    }, [pushMessage]);

    return (
        <>
            <MessageBubble white left backgroundColor={theme.palette.background.dark} sx={{ ...styles.containerChatMessage, height }}>
                <RenderMessages messages={messages} write={awaitAnswersCount > 0}/>
            </MessageBubble>
            <MessageBubble white backgroundColor={theme.palette.background.dark} sx={styles.messageSend}>
                {/*<SendMessageField onSend={onSend} disabled={awaitAnswersCount > 0}/>*/}
                <SendMessageField onSend={onSend} />
            </MessageBubble>
        </>
    );
};

export default ChatContainer;
