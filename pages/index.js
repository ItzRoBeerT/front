import { Button, Container } from '@mui/material';
import { getPopularPosts, getRecentPosts, obtenerTodosPosts } from '@/api/posts';
import Post from '@/components/Card/Post';
import CSS from '@/styles/Home.module.scss';
import MiniHeader from '@/components/shared/headers/MiniHeader';
import { useEffect, useRef, useState } from 'react';

function Home({ posts }) {
    const [postsState, setPostsState] = useState(posts);
    let postsAux =  [];
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(0);
    const [page, setPage] = useState(1);
    const padreRef = useRef(null);

    //#region FUNCTIONS
    useEffect(() => {
        if (padreRef.current === null) return;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                console.log('Intersecting');
                setLoading(true);
                getMorePosts();
                observer.unobserve(padreRef.current);
            }
        });
        observer.observe(padreRef.current);
    }, [padreRef.current, page]);

    const getMorePosts = async () => {
        const newPosts = await getRecentPosts(page + 1);
        const areEquals = JSON.stringify(postsAux) === JSON.stringify(newPosts);

        if(!areEquals) postsAux = newPosts;
        else return;

        console.log({ newPosts, page });
        // Filtrar los nuevos posts para evitar duplicados
        const filteredPosts = newPosts.filter((newPost) => {
            return !postsState.find((existingPost) => existingPost._id === newPost._id);
        });

        console.log({ newPosts, filteredPosts });
        setPostsState((prev) => [...prev, ...newPosts]);
        setLoading(false);
        setPage((prev) => prev + 1);
    };

    console.log({ postsState });

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
                {loading && <h1>Cargando...</h1>}
            </Container>
            {
                <div ref={padreRef}>
                    <hr />
                    <Button>FFSFS</Button>
                </div>
            }
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
