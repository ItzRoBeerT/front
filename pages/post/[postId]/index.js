import { Container } from '@mui/material';
import Comments from '@/components/Card/Comments';
import Post from '@/components/Card/Post';
import PostCard from '@/components/Card/PostCard';
import { getPostById } from '@/api/posts';
import { getUserById } from '@/api/users';
import CSS from './PostComents.module.scss';

const CommentsPost = ({ post, usersPost }) => {
    return (
        <Container className={CSS.content}>
            <PostCard post={post} usersPost={usersPost} />
        </Container>
    );
};

export const getServerSideProps = async (context) => {
    const post = await getPostById(context.query.postId);
    const usersPost = await getUserById(post.userId._id);

    return {
        props: {
            post: post,
            usersPost: usersPost,
        },
    };
};

export default CommentsPost;


