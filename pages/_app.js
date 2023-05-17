import "@/styles/globals.css";
import store from "@/store/index";
import HeaderDefault from "@/components/shared/headers/HeaderDefault";
import MiniHeader from "@/components/shared/headers/MiniHeader";
import { Provider } from "react-redux";

function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
                <HeaderDefault />
            <main>
                <MiniHeader />
                <Component {...pageProps} />
            </main>
        </Provider>
    );
}

export default App;
