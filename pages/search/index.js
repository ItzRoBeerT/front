import { Container } from '@mui/material';
import { searchPosts } from '@/api/posts';
import { useEffect, useState } from 'react';
import UserList from '@/components/Search/UserList';
import CSS from './search.module.scss';
import Post from '@/components/Card/Post';

const SearchPage = ({ posts, users, keyParam }) => {
    const [postsState, setPostsState] = useState(posts);
    const isHashtag = keyParam.startsWith('#');

    useEffect(() => {
        setPostsState(posts);
    }, [keyParam]);

    const handleDeletePost = async (postDeleted) => {
        const newPosts = postsState.filter((post) => post._id !== postDeleted._id);
        setPostsState(newPosts);
    };

    return (
        <>
            <Container className={CSS.container}>{!isHashtag && <UserList users={users} keyParam={keyParam} />}</Container>
            <div className={CSS.postContent}>{postsState.length >= 1 ? postsState.map((post) => <Post key={post._id} post={post} onDeletePost={handleDeletePost} />) : <h1>No posts found</h1>}</div>
        </>
    );
};

export const getServerSideProps = async (context) => {
    //take key from query
    const { key } = context.query;
    const formattedKey = key.startsWith('#') ? `%23${key.slice(1)}` : key;

    const res = await searchPosts(formattedKey);

    const posts = res?.posts ?? [];
    const users = res?.users ?? [];

    return {
        props: {
            posts,
            users,
            keyParam: key,
        },
    };
};

SearchPage.displayName = 'SearchPage';
export default SearchPage;
