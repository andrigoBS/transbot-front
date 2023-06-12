import React, { useCallback, useEffect, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import MessageBubble from '../../components/MessageBubble';
import PetTalk from '../../components/PetTalk';
import SendMessageField from '../../components/SendMessageField';
import StorageHelper from '../../helpers/StorageHelper';
import WebSocketHelper from '../../helpers/WebSocketHelper';
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

const Chat = () => {
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
    const [lastAnswer, setLastAnswer] = useState(StorageHelper.getString('lastAnswer'));
    const [isLoading, setIsLoading] =useState(true);

    const pushMessage = useCallback((message) => {
        StorageHelper.pushOnArray('messages',message);
        if(message.fromUser) {
            StorageHelper.incrementNumber('awaitAnswersCount');
        } else {
            StorageHelper.decrementNumber('awaitAnswersCount');
        }
        setMessages(StorageHelper.getArray('messages'));
        setAwaitAnswersCount(StorageHelper.getNumber('awaitAnswersCount'));
    }, []);

    const onReceive = React.useCallback(({ answer }) => {
        let newLastAnswer = '';
        if(!answer) {
            answer = 'Não entendi, poderia me explicar de outra maneira?';
        } else {
            newLastAnswer = answer;
        }
        StorageHelper.setString('lastAnswer', newLastAnswer);
        setLastAnswer(newLastAnswer);
        pushMessage({ fromUser: false, message: answer });
    }, [pushMessage]);

    const onError = React.useCallback(() => {
        const message = 'Estou recebendo muitas mensagens, por favor espere um instante e tente novamente';
        StorageHelper.setString('lastAnswer', '');
        setLastAnswer('');
        pushMessage({ fromUser: false, message: message });
    }, [pushMessage]);

    const onSend = React.useCallback((question) => {
        const lastAnswer = StorageHelper.getString('lastAnswer');
        pushMessage({ fromUser: true, message: question });
        WebSocketHelper.send({ lastAnswer, question });
    }, [pushMessage]);

    const onConnect = useCallback(() => {
        const message = `Oi, tudo bem ? Eu sou ${import.meta.env.REACT_APP_PROJECT_NAME}, sobre o que você deseja se informar?`;
        StorageHelper.setString('lastAnswer', 'Oi, tudo bem ?');
        setLastAnswer('Oi, tudo bem ?');
        pushMessage({ fromUser: false, message: message });
        setIsLoading(false);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            WebSocketHelper.createConnection(onReceive, onError, onConnect);
            return WebSocketHelper.close;
        }, 200);
    }, [onConnect, onError, onReceive]);

    return (
        <PetTalk>
            <MessageBubble white left backgroundColor={theme.palette.background.dark} sx={{ ...styles.containerChatMessage, height }}>
                <RenderMessages messages={messages} write={awaitAnswersCount > 0 || isLoading}/>
            </MessageBubble>
            <MessageBubble white backgroundColor={theme.palette.background.dark} sx={styles.messageSend}>
                <SendMessageField onSend={onSend} disabled={isLoading}/>
            </MessageBubble>
        </PetTalk>
    );
};

export default Chat;
