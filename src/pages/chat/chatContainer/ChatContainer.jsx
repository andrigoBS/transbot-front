import React, { useCallback, useEffect, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import MessageBubble from '../../../components/MessageBubble';
import SendMessageField from '../../../components/SendMessageField';
import HttpHelper from '../../../helpers/HttpHelper';
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

    // const [messages, setMessages] = useState([]);
    // const [lastAnswer, setLastAnswer] = useState('');
    // const [awaitAnswersCount, setAwaitAnswersCount] = useState(0);
    // const onSend = useCallback((value) => {
    //     const newMessages = [...messages];
    //     newMessages.push({ fromUser: true, message: value });
    //     setMessages(newMessages);
    //     const newAwaitAnswersCount = awaitAnswersCount + 1;
    //     setAwaitAnswersCount(newAwaitAnswersCount);
    //     console.log(value, messages, newMessages);
    //
    //     HttpHelper.post('talk', { lastAnswer, question: value }).then((response) => {
    //         let message = response.answer;
    //         if(!message) {
    //             message = 'Não entendi, poderia me explicar um pouco melhor?';
    //             setLastAnswer('');
    //         } else {
    //             setLastAnswer(message);
    //         }
    //         newMessages.push({ fromUser: false, message });
    //         setMessages(newMessages);
    //         setAwaitAnswersCount(newAwaitAnswersCount - 1);
    //     }).catch((err) => {
    //         console.log(err);
    //         const message = 'Estou recebendo muitas mensagens, por favor espere um instante';
    //         newMessages.push({ fromUser: false, message });
    //         setMessages(newMessages);
    //         setLastAnswer('');
    //         setAwaitAnswersCount(newAwaitAnswersCount - 1);
    //     });
    // }, [awaitAnswersCount, lastAnswer, messages]);

    const [messages, setMessages] = useState(JSON.parse(sessionStorage.getItem('messages') || '[]'));
    const [awaitAnswersCount, setAwaitAnswersCount] = useState(Number(sessionStorage.getItem('awaitAnswersCount') || '0'));
    const onSend = useCallback((value) => {
        const messages = JSON.parse(sessionStorage.getItem('messages') || '[]');
        messages.push({ fromUser: true, message: value });
        sessionStorage.setItem('messages', JSON.stringify(messages));

        const awaitAnswersCount = Number(sessionStorage.getItem('awaitAnswersCount') || '0');
        sessionStorage.setItem('awaitAnswersCount', `${awaitAnswersCount+1}`);

        const lastAnswer = sessionStorage.getItem('lastAnswer') || '';

        let message = '';

        HttpHelper.post('talk', { lastAnswer, question: value }).then((response) => {
            message = response.answer;
            if(!message) {
                message = 'Não entendi, poderia me explicar um pouco melhor?';
                sessionStorage.setItem('lastAnswer', '');
            } else {
                sessionStorage.setItem('lastAnswer', message);
            }
        }).catch((err) => {
            console.log(err);
            message = 'Estou recebendo muitas mensagens, por favor espere um instante';
            sessionStorage.setItem('lastAnswer', '');
        }).finally(() => {
            const messages = JSON.parse(sessionStorage.getItem('messages') || '[]');
            messages.push({ fromUser: false, message });
            sessionStorage.setItem('messages', JSON.stringify(messages));

            const awaitAnswersCount = Number(sessionStorage.getItem('awaitAnswersCount') || '0');
            sessionStorage.setItem('awaitAnswersCount', `${awaitAnswersCount-1}`);

            setMessages(JSON.parse(sessionStorage.getItem('messages') || '[]'));
            setAwaitAnswersCount(Number(sessionStorage.getItem('awaitAnswersCount') || '0'));
        });

        setMessages(JSON.parse(sessionStorage.getItem('messages') || '[]'));
        setAwaitAnswersCount(Number(sessionStorage.getItem('awaitAnswersCount') || '0'));
    }, []);

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
