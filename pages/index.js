import React from "react";
import { Container } from "@mui/material";
import { obtenerTodosPosts } from "@/api/posts";
import Post from "@/components/Card/Post";
import CSS from "@/styles/Home.module.scss";
import MiniHeader from "@/components/shared/headers/MiniHeader";

function Home({ posts }) {
    return (
        <>
            <MiniHeader />
            <Container fixed className={CSS.container}>
                {posts.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
            </Container>
        </>
    );
}

export async function getServerSideProps() {
    let allPosts = await obtenerTodosPosts();
    return {
        props: {
            posts: allPosts,
        },
    };
}

export default React.memo(Home);
