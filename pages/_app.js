//import '@/styles/globals.css'

import HeaderDefault from "@/components/shared/headers/HeaderDefault";

function App({ Component, pageProps }) {
    return (
        <>
            <HeaderDefault />
            <Component {...pageProps} />
        </>
    );
}

export default App;
