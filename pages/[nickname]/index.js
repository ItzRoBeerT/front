import { getFriendsUserById, getUserByNickname } from "@/api/users";
import { getPostsByNickname } from "@/api/posts";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import { useState } from "react";

const UserProfile = ({user, posts,friends}) => {

    const [postsState, setPosts] = useState(posts);

    const handleDeletePost = async (postDeleted) => {
        const newPosts = posts.filter((post) => post._id !== postDeleted._id);
        setPosts(newPosts);
    };

    return (
        <div>
            <ProfileHeader user={user} posts={postsState} friends={friends} onDeletePost={handleDeletePost}/>
        </div>
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