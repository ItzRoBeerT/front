import { getFriendsUserById, getUserByNickname } from "@/api/users";
import { getPostsByNickname } from "@/api/posts";
import ProfileHeader from "@/components/Profile/ProfileHeader";

const UserProfile = ({user, posts,friends}) => {
    return (
        <div>
            <ProfileHeader user={user} posts={posts} friends={friends}/>
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