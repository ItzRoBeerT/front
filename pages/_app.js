import "@/styles/globals.css";

import HeaderDefault from "@/components/shared/headers/HeaderDefault";
import MiniHeader from "@/components/shared/headers/MiniHeader";

function App({ Component, pageProps }) {
    return (
        <>
         
                <HeaderDefault />
          
            <main>
                <MiniHeader />
                <Component {...pageProps} />
            </main>
        </>
    );
}

export default App;
