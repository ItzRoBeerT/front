//import '@/styles/globals.css'

import HeaderDefault from "@/components/model/header/HeaderDefault";

function App({ Component, pageProps }) {
    return (
        <>
            <HeaderDefault />
            <Component {...pageProps} />
        </>
    );
}

export default App;
