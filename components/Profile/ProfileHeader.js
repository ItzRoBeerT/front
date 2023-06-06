//#region IMPORTS
import { Button, Card, Divider, List, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileTabs from './profileTools/ProfileTabs';
import CustomAvatar from '../shared/headers/headerTools/CustomAvatar';
import Follower from './profileTools/Follower';
import { addFriend, deleteFriend } from '@/api/users';
import Post from '../Card/Post';
import authSlice from '@/store/auth-slice';
//#endregion

const ProfileHeader = ({ user, posts, friends, onDeletePost }) => {

    const [tabsValue, setTabsValue] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);
    const dispatch = useDispatch();
    const actualUser = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.userToken);



    //#region FUNCIONES
    useEffect(() => {
        actualUser?.friends.forEach((friend, index) => {
            if (friend.friend === user._id) {
                setIsFollowing(true);
            }
        });
    }, []);

    const handleChangeTabs = (event, newValue) => {
        setTabsValue(newValue);
    };
    
    const addFriendHandler = async () => {
        const updatedUser = await addFriend(user._id, token);
        setIsFollowing(true);
        dispatch(authSlice.actions.updateUser(updatedUser.user))
    };

    const deleteFriendHandler = async () => {
        const updatedUser = await deleteFriend(user._id, token);
        setIsFollowing(false);
        console.log(updatedUser);
        dispatch(authSlice.actions.updateUser(updatedUser.user))
    };



    //#endregion
    return (
        <Card>
            <div className="avatar y editar o seguir">
                <CustomAvatar user={user} />
                {actualUser?._id === user._id ? 
                <Button variant="outlined">Editar perfil</Button>
                    :
                !isFollowing ? 
                    <Button variant="outlined" onClick={addFriendHandler}>Seguir</Button>
                    :
                    <Button variant="outlined" onClick={deleteFriendHandler}>Dejar de seguir</Button>
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
            <ProfileTabs onHandleTabs={handleChangeTabs} />
            
            {tabsValue === 0 ?(
            <div>
                {posts.map((post) => (
                    <Post key={post._id} post={post}  onDeletePost={onDeletePost}/>
                ))}
            </div>
            ):(
            <List>
                {friends.map((friend) => (
                    <Follower friend={friend} />
                ))}
            </List>
            )}
        </Card>
    );
};

ProfileHeader.displayName = 'ProfileHeader';
export default ProfileHeader;
