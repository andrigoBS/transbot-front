import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const makeStyles = (color, background, textColor) => ({
    container: {
        '&:before, &:after': {
            bottom: '0px',
            content: '""',
            height: '25px',
            position: 'absolute',
        },
        background: color,
        borderRadius: '20px',
        color: textColor,
        padding: '10px 15px',

        position: 'relative',
    },

    label: {
        marginTop: '10px',
    },

    left: {
        '&:after': {
            backgroundColor: background,
            borderBottomRightRadius: '10px',
            left: '-10px',
            width: '10px',
        },

        '&:before': {
            backgroundColor: color,
            borderBottomRightRadius: '16px 14px',
            left: '-7px',
            width: '20px',
        },
    },

    right: {
        ' &:after': {
            backgroundColor: background,
            borderBottomLeftRadius: '10px',
            right: '-10px',
            width: '10px',
        },

        '&:before': {
            backgroundColor: color,
            borderBottomLeftRadius: '16px 14px',
            right: '-7px',
            width: '20px',
        },
    },
});

const MessageBubble = ({ backgroundColor, children, label, left, sx, white }) => {
    const theme = useTheme();

    let color = left? theme.palette.primary.main : theme.palette.secondary.main;
    const background = backgroundColor || theme.palette.background.default;
    let textColor = left? theme.palette.background.default : theme.palette.text.main;

    if(white) {
        color = theme.palette.background.default;
        textColor = theme.palette.text.main;
    }

    const styles = makeStyles(color, background, textColor);

    return (
        <>
            {label && (<Typography variant={'body2'} sx={styles.label}>{label}</Typography>)}
            <Box sx={{ ...styles.container, ...(left? styles.left: styles.right), ...sx }}>
                {children}
            </Box>
        </>
    );
};

export default MessageBubble;
