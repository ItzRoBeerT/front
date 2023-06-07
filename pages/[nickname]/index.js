import { useState } from "react";
import { Container } from "@mui/material";
import { getFriendsUserById, getUserByNickname } from "@/api/users";
import { getPostsByNickname } from "@/api/posts";
import ProfileHeader from "@/components/Profile/ProfileHeader";

const UserProfile = ({user, posts,friends}) => {

    const [postsState, setPosts] = useState(posts);

    const handleDeletePost = async (postDeleted) => {
        const newPosts = posts.filter((post) => post._id !== postDeleted._id);
        setPosts(newPosts);
    };

    return (
        <Container>
            <ProfileHeader user={user} posts={postsState} friends={friends} onDeletePost={handleDeletePost}/>
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

UserProfile.displayName = "UserProfile";
export default UserProfile;