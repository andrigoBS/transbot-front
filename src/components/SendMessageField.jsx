import React, { useCallback, useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const styles = {
    messageSendBox: {
        display: 'flex',
    },
    messageSendIcon: {
        marginLeft: '15px',
        padding: 0,
    },
};

const SendMessageField = ({ disabled, onSend }) => {
    const [textField, setTextField] = useState(null);

    const onSubmit = useCallback((event) => {
        event.preventDefault();

        if(textField && textField.value) {
            onSend(textField.value);
            textField.value = '';
        }
    }, [onSend, textField]);

    return (
        <form style={styles.messageSendBox} onSubmit={onSubmit}>
            <TextField inputRef={setTextField} disabled={disabled}
                size={'small'} color={'primary'} label={'Digitar mensagem...'} fullWidth
            />
            <IconButton sx={styles.messageSendIcon} type={'submit'} disabled={disabled}>
                <SendIcon fontSize={'large'} color={disabled? 'disabled': 'primary'}/>
            </IconButton>
        </form>
    );
};

export default SendMessageField;
