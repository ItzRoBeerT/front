import { Button, Container } from '@mui/material';
import { getPopularPosts, getRecentPosts } from '@/api/posts';
import { useEffect, useRef, useState } from 'react';
import Post from '@/components/Card/Post';
import CSS from '@/styles/Home.module.scss';
import MiniHeader from '@/components/shared/headers/MiniHeader';
import { includeArray } from '@/functions/methods';

let loading = false;

function Home({ posts }) {
    const [postsState, setPostsState] = useState(posts);
    const [value, setValue] = useState(0);
    const [page, setPage] = useState(2);
    const padreRef = useRef(null);

    //#region FUNCTIONS
    useEffect(() => {
        if (padreRef.current === null ) return;

        const observer = new IntersectionObserver(callback);
        observer.observe(padreRef.current);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        console.log({ useffectPage: page, loading });
        if (!loading) {
            loading = true;
            getMorePosts();
        }
    }, [page]);

    const callback = (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
            console.log({ intersectionPage: page });
            setPage((prev) => prev + 1);
        }
    };

    const getMorePosts = async () => {
        const newPosts = await getRecentPosts(page);

        const currentIds = postsState.map((post) => post._id);
        const newIds = newPosts.map((post) => post._id);

        const includes = includeArray(currentIds, newIds);

        if (includes) return;

        console.log({ newPosts, postsState, includes, page });

        setPostsState((prev) => [...prev, ...newPosts]);
        loading = false;
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
            </Container>
            <div ref={padreRef}>
                <hr />
                <Button>FFSFS</Button>
            </div>
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
