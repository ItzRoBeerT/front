import "@/styles/globals.css";
import store from "@/store/index";
import HeaderDefault from "@/components/shared/headers/HeaderDefault";
import MiniHeader from "@/components/shared/headers/MiniHeader";
import { Provider } from "react-redux";
import React from "react";

function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <React.Suspense >
                <HeaderDefault />
                <main>
                    <MiniHeader />
                    <Component {...pageProps} />
                </main>
            </React.Suspense>
        </Provider>
    );
}

export default App;
