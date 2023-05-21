// import "@/styles/globals.css";
import store from "@/store/index";
import HeaderDefault from "@/components/shared/headers/HeaderDefault";
import { Provider } from "react-redux";
import React from "react";

function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <React.Suspense >
                <HeaderDefault />
                <main>
                    <Component {...pageProps} />
                </main>
            </React.Suspense>
        </Provider>
    );
}

export default App;
