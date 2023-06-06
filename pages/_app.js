// import "@/styles/globals.css";
import store from "@/store/index";
import HeaderDefault from "@/components/shared/headers/HeaderDefault";
import { Provider, useSelector, } from "react-redux";
import React from "react";
function App({ Component, pageProps }) {

    return (
        <Provider store={store}>
            <React.Suspense>
                <HeaderDefault />
            </React.Suspense>
            <main>
                <React.Suspense>
                    <Component {...pageProps} />
                </React.Suspense>
            </main>
        </Provider>
    );
}

export default App;
