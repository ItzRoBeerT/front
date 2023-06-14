import { Container, Fab, useMediaQuery } from '@mui/material';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { getPopularPosts, getRecentPosts } from '@/api/posts';
import { useEffect, useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import CSS from '@/styles/Home.module.scss';
import MiniHeader from '@/components/shared/headers/MiniHeader';
import { includeArray } from '@/utils/functions/methods';
import theme from '@/config/theme';
import ModalComment from '@/components/Modal/ModalComment';
const Post = dynamic(() => import('@/components/Card/Post'));
let loading = false;

function Home({ posts }) {
    const [postsState, setPostsState] = useState(posts);
    const [value, setValue] = useState(0);
    const [openComment, setOpenComment] = useState(false);
    const [page, setPage] = useState(2);
    const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
    const padreRef = useRef(null);

    //#region FUNCTIONS
    useEffect(() => {
        if (padreRef.current === null ) return;

        const observer = new IntersectionObserver(callback);
        observer.observe(padreRef.current);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!loading && value === 0) {
            loading = true;
            getMorePosts();
        }else if(!loading && value === 1){
            loading = true;
            getMoreFeaturedPosts();
        }
    }, [page]);

    const callback = (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
            setPage((prev) => prev + 1);
        }
    };

    const getMorePosts = async () => {
        const newPosts = await getRecentPosts(page);

        const currentIds = postsState.map((post) => post._id);
        const newIds = newPosts.map((post) => post._id);

        const includes = includeArray(currentIds, newIds);

        if (includes) return;

        setPostsState((prev) => [...prev, ...newPosts]);
        loading = false;
    };

    const getMoreFeaturedPosts = async () => {

        const newPosts = await getPopularPosts(page);

        const currentIds = postsState.map((post) => post._id);
        const newIds = newPosts.map((post) => post._id);

        const includes = includeArray(currentIds, newIds);

        if (includes) return;

        setPostsState((prev) => [...prev, ...newPosts]);
        loading = false;
    }

    const getFeaturedPosts = async () => {
        const posts = await getPopularPosts(1);
        setPage(2);
        setPostsState(posts);
        loading = false;
    };

    const getInitialPosts = async () => {
        const newPosts = await getRecentPosts(1);
        setPage(2);
        setPostsState(newPosts);
        loading = false;
    };

    const getValue = (value) => {
        if (value === 0) {
            getInitialPosts();
        } else {
            getFeaturedPosts();
        }
        setValue(value);
    };
    const handleDeletePost = async (postDeleted) => {
        const newPosts = postsState.filter((post) => post._id !== postDeleted._id);
        setPostsState(newPosts);
    };

    const handleOpenComment = () => setOpenComment(true);

    const handleCloseComment = () => setOpenComment(false);

    //#endregion
    return (
        <>
            <MiniHeader onSendValue={getValue} />
            <Container className={CSS.container}>
                {postsState !== null  && postsState.map((post, index) => (
                    <Post key={post._id} post={post} onDeletePost={handleDeletePost} />
                ))}
            </Container>
            <div ref={padreRef} className={CSS.gifContainer}>
                <Image src='/gifs/rolling1.gif' alt="loading" width={100} height={100} />
            </div>
            {
                isMatch && <div>
                    <Fab  color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={handleOpenComment}>
                    <SendIcon />
                    </Fab>
                    <ModalComment show={openComment} handleClose={handleCloseComment} />
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
