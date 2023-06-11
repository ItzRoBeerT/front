import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { getFriendsUserById, getUserByNickname } from '@/api/users';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsByNickname } from '@/api/posts';
import authSlice from '@/store/auth-slice';
import ProfileHeader from '@/components/Profile/ProfileHeader';

const UserProfile = ({ user, posts, friends }) => {
    const [postsState, setPosts] = useState(posts);
    const isSubmitedPost = useSelector((state) => state.auth.isSubmitedPost);
    const isChangeUser = useSelector((state) => state.auth.isChangeUser);
    const updatedUserNickname = useSelector((state) => state.auth.userChangedNickname);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isChangeUser === true) {
            getPostsByNickname(updatedUserNickname).then((res) => {
                setPosts(res);
            });
            dispatch(authSlice.actions.resetChangeUser());
        }

        if (isSubmitedPost === false) return;
        getPostsByNickname(user.nickname).then((res) => {
            setPosts(res);
        });

        dispatch(authSlice.actions.resetChangeUser());
    }, [isSubmitedPost, isChangeUser]);

    const handleDeletePost = async (postDeleted) => {
        const newPosts = posts.filter((post) => post._id !== postDeleted._id);
        setPosts(newPosts);
    };

    return (
        <Container>
            <ProfileHeader user={user} posts={postsState} friends={friends} onDeletePost={handleDeletePost} />
        </Container>
    );
};

export async function getServerSideProps(context) {
    const { nickname } = context.query;
    const user = await getUserByNickname(nickname);
    const posts = await getPostsByNickname(nickname);
    const friends = await getFriendsUserById(user._id);

    return {
        props: {
            user,
            posts,
            friends,
        },
    };
}

UserProfile.displayName = 'UserProfile';
export default UserProfile;
