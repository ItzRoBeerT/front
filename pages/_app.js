import { Provider, useSelector } from 'react-redux';
import React from 'react';
import '@/styles/globals.css';
import store from '@/store/index';
import HeaderDefault from '@/components/shared/headers/HeaderDefault';

function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <HeaderDefault />
            <main>
                <Component {...pageProps}  />
            </main>
        </Provider>
    );
}

export default App;
