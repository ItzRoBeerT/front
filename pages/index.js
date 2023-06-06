import { Container } from "@mui/material";
import { obtenerTodosPosts } from "@/api/posts";
import Post from "@/components/Card/Post";
import CSS from "@/styles/Home.module.scss";
import MiniHeader from "@/components/shared/headers/MiniHeader";
import { useEffect, useState } from "react";

function Home({ posts }) {

    const [postsState, setPostsState] = useState(posts);
    const handleDeletePost = async (postDeleted) => {
        const newPosts = postsState.filter((post) => post._id !== postDeleted._id);
        setPostsState(newPosts);  
    };

    useEffect(() => {

    }, []);

    return (
        <>
            <MiniHeader />
            <Container fixed className={CSS.container}>
                {postsState.map((post) => (
                    <Post key={post._id} post={post} onDeletePost={handleDeletePost}/>
                ))}
            </Container>
        </>
    );
}

export const getServerSideProps = async () => {
    let allPosts = await obtenerTodosPosts();
    return {
        props: {
            posts: allPosts,
        },
    };
};

Home.displayName = "Home";
export default Home;
