//#region IMPORTS
import { Button, Card, Divider, List, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileTabs from './profileTools/ProfileTabs';
import CustomAvatar from '../shared/headers/headerTools/CustomAvatar';
import Follower from './profileTools/Follower';
import { addFriend, deleteFriend } from '@/api/users';
import Post from '../Card/Post';
import authSlice from '@/store/auth-slice';
import CSS from './ProfileHeader.module.scss';
//#endregion

const ProfileHeader = ({ user, posts, friends, onDeletePost }) => {
    const [tabsValue, setTabsValue] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
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
        dispatch(authSlice.actions.updateUser(updatedUser.user));
    };

    const deleteFriendHandler = async () => {
        const updatedUser = await deleteFriend(user._id, token);
        setIsFollowing(false);
        console.log(updatedUser);
        dispatch(authSlice.actions.updateUser(updatedUser.user));
    };

    const goToSettings = () => {
        router.push('/settings/'+user.nickname);
    };

    //#endregion
    return (
        <Card className={CSS.card}>
            <div className="avatar y editar o seguir">
                <CustomAvatar user={user} />
                {actualUser?._id === user._id ? (
                    <Button variant="outlined" onClick={goToSettings}>Edit profile</Button>
                ) : !isFollowing ? (
                    <Button variant="outlined" onClick={addFriendHandler}>
                        Follow
                    </Button>
                ) : (
                    <Button variant="outlined" onClick={deleteFriendHandler}>
                        Unfollow
                    </Button>
                )}
            </div>
            <div className="nick y nombre">
                <Typography className={CSS.text}>{user.name}</Typography>
                <Typography className={CSS.text} variant="caption">
                    @{user.nickname}
                </Typography>
            </div>
            {user.bio && (
                <div className="bio">
                    <Typography className={CSS.text}>{user.bio}</Typography>
                </div>
            )}
            <div className="seguidores ">
                <Typography className={CSS.text}>Following {user.friends.length} users ! </Typography>
            </div>
            <Divider className={CSS.divider} />
            <div className={CSS.tabsContent}>
                <ProfileTabs onHandleTabs={handleChangeTabs} />
            </div>
            {tabsValue === 0 ? (
                <div className={CSS.postsContent}>
                    {posts.map((post) => (
                        <Post key={post._id} post={post} onDeletePost={onDeletePost} />
                    ))}
                </div>
            ) : (
                <div className={CSS.listContent}>
                    <List>
                        {friends.map((friend) => (
                            <Follower key={friend._id} friend={friend} />
                        ))}
                    </List>
                </div>
            )}
        </Card>
    );
};

ProfileHeader.displayName = 'ProfileHeader';
export default ProfileHeader;
