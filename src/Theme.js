export const getMuiTheme = () => ({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    width: '100%'
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                h1: {
                    fontWeight: 'bold',
                },
                h2: {
                    fontWeight: 'bold',
                },
                h3: {
                    fontWeight: 'bold',
                },
                h4: {
                    fontWeight: 'bold',
                },
                h5: {
                    fontWeight: 'bold',
                },
                h6: {
                    fontWeight: 'bold',
                },
                subtitle1: {
                    fontWeight: 'bold',
                },
                subtitle2: {
                    fontWeight: 'bold',
                },
            }
        },
    },
    palette: {
        background: {
            dark: '#daddd8',
            default: '#fafdf8'
        },
        primary: {
            light: 'rgba(21,189,229,0.2)',
            main: '#15bde5'
        },
        secondary: {
            main: '#f5a0b0'
        },
        text: {
            main: '#3b3b3b'
        }
    },
});
