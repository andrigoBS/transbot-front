import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes as RoutesRouter } from 'react-router-dom';
import { createTheme, CssBaseline, responsiveFontSizes, ThemeProvider } from '@mui/material';
import HtmlHead from './components/HtmlHead';
import TopBar from './components/TopBar';
import Chat from './pages/chat/Chat';
import Home from './pages/home/Home';
import PageNotFound from './pages/notFound/PageNotFound';
import { getMuiTheme } from './Theme';

let theme = getMuiTheme();
theme = createTheme(theme);
theme = responsiveFontSizes(theme);

const App = () => {
    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <HelmetProvider>
                    <CssBaseline/>
                    <HtmlHead/>
                    <BrowserRouter>
                        <TopBar>
                            <RoutesRouter>
                                <Route exact path={'/'} element={<Home/>} />
                                <Route exact path={'/chat'} element={<Chat/>} />
                                <Route path={'*'} element={<PageNotFound/>} />
                            </RoutesRouter>
                        </TopBar>
                    </BrowserRouter>
                </HelmetProvider>
            </ThemeProvider>
        </React.StrictMode>
    );
};

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
