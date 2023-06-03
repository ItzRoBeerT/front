import { getUserByNickname } from "@/api/users";
import { getPostsByNickname } from "@/api/posts";
import ProfileHeader from "@/components/Profile/ProfileHeader";

const UserProfile = ({user, posts}) => {
    return (
        <div>
            <ProfileHeader user={user} posts={posts}/>
        </div>
    );
};

export async function getServerSideProps(context) {
    const { nickname } = context.query;
    const user = await getUserByNickname(nickname);
    const posts = await getPostsByNickname(nickname);
 
    return {
        props: {
            user,
            posts
        },
    };
}

UserProfile.displayName = "UserProfile";
export default UserProfile;