import { Button, Container } from '@mui/material';
import { getPopularPosts, getRecentPosts, obtenerTodosPosts } from '@/api/posts';
import Post from '@/components/Card/Post';
import CSS from '@/styles/Home.module.scss';
import MiniHeader from '@/components/shared/headers/MiniHeader';
import { useEffect, useRef, useState } from 'react';

function Home({ posts }) {
    const [postsState, setPostsState] = useState(posts);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(0);
    const [page, setPage] = useState(1);
    const padreRef = useRef(null);

    //#region FUNCTIONS
    useEffect(() => {
        // if (value === 0) {
        //     if (page > 1) getMorePosts();
        // }

        let options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        };

        const observer = new IntersectionObserver(([entry]) => {
            console.log({ entry });
            if (entry.isIntersecting) {
                setLoading(true);
                getMorePosts();
            }
        }, options);

        observer.observe(padreRef.current);
    }, [padreRef.current]);

    const getMorePosts = async () => {
        const newPosts = await getRecentPosts(page);
        setPostsState((prev) => [...prev, ...newPosts]);
        setPage((prev) => prev + 1);
        setLoading(false);
    };

    const getFeaturedPosts = async () => {
        const posts = await getPopularPosts();
        setPostsState(posts);
    };

    const getInitialPosts = async () => {
        const newPosts = await getRecentPosts(1);
        setPostsState(newPosts);
    };

    const getValue = (value) => {
        setValue(value);
        if (value === 0) {
            getInitialPosts();
        } else {
            getFeaturedPosts();
        }
    };

    console.log({ postsState });

    const handleDeletePost = async (postDeleted) => {
        const newPosts = postsState.filter((post) => post._id !== postDeleted._id);
        setPostsState(newPosts);
    };
    //#endregion
    return (
        <>
            <MiniHeader onSendValue={getValue} />
            <Container className={CSS.container}>
                {postsState.map((post, index) => (
                    <Post key={post._id} post={post} onDeletePost={handleDeletePost} />
                ))}
                {loading && <h1>Cargando...</h1>}
            </Container>
            <div ref={padreRef}>
                <hr />
            </div>
            <Button >FFSFS</Button>
        </>
    );
}

export const getServerSideProps = async () => {
    // let allPosts = await obtenerTodosPosts();
    let recentPosts = await getRecentPosts(1);

    return {
        props: {
            // posts: allPosts,
            posts: recentPosts,
        },
    };
};

Home.displayName = 'Home';
export default Home;
