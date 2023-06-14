import { Provider, useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { CssBaseline } from '@mui/material';
import Head from 'next/head';
import '@/styles/globals.css';
import store from '@/store/index';
import HeaderDefault from '@/components/shared/headers/HeaderDefault';
import theme from '@/config/theme';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../utils/createdEmotionCache';

const clientSideEmotionCache = createEmotionCache();

function App({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
    return (
        <Provider store={store}>
           <Head>
                <title>PocketSM</title>
                <meta name='description' content='Blog' />
           </Head>
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <HeaderDefault />
                    <main>
                        <Component {...pageProps} />
                    </main>
                </ThemeProvider>
            </CacheProvider>
        </Provider>
    );
}

export default App;
