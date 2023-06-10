import Document, { Html, Head, Main, NextScript } from 'next/document';
import {} from '@mui/material/styles';
import createEmotionCache from '../utils/createdEmotionCache';
import createEmotionServer from '@emotion/server/create-instance';

export default function MyDocument({ emotionStyleTags }) {
    return (
        <Html lang="en">
            <Head>{emotionStyleTags}</Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

MyDocument.getInitialProps = async (ctx) => {
    const originalRenderPage = ctx.renderPage;

    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) =>
                function EnhanceApp(props) {
                    return <App emotionCache={cache} {...props} />;
                },
        });

    const initialProps = await Document.getInitialProps(ctx);

    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => <style data-emotion={`${style.key} ${style.ids.join(' ')}`} key={style.key} dangerouslySetInnerHTML={{ __html: style.css }} />);

    return {
        ...initialProps,
        emotionStyleTags,
    };
};
