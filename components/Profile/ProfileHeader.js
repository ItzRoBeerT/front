import { Button, Card, Divider, Typography } from '@mui/material';
import CustomAvatar from '../shared/headers/headerTools/CustomAvatar';
import ProfileTabs from './profileTools/ProfileTabs';
import Post from '../Card/Post';
import { useSelector } from 'react-redux';
const ProfileHeader = ({ user, posts }) => {

    const actualUser = useSelector((state) => state.auth.user);

    console.log({actualUser, user});
    return (
        <Card>
            <div className="avatar y editar o seguir">
                <CustomAvatar user={user} />
                {actualUser._id === user._id ? 
                <Button variant="outlined">Editar perfil</Button>
                    :
                <Button variant="outlined">Seguir</Button>
                }
            </div>
            <div className="nick y nombre">
                <Typography>{user.name}</Typography>
                <Typography variant="caption">@{user.nickname}</Typography>
            </div>
            {user.bio && (
                <div className="bio">
                    <Typography>{user.bio}</Typography>
                </div>
            )}
            <div className="seguidores ">
                <Typography>siguiendo a {user.friends.length} personas </Typography>
            </div>
            <Divider />
            <ProfileTabs />
            
            {/* posts */}
            <div>
                {posts.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
            </div>
        </Card>
    );
};

ProfileHeader.displayName = 'ProfileHeader';
export default ProfileHeader;
