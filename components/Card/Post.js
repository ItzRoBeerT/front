import moment from 'moment/moment';
import { Card, CardContent, CardHeader, CardMedia, IconButton, Menu, MenuItem, Skeleton, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { deletePost } from '@/api/posts';
import { getUserById } from '@/api/users';
import PostOptions from './PostOptions';
import CSS from './Post.module.scss';
import CustomAvatar from '../shared/headers/headerTools/CustomAvatar';

const Post = ({ post, onDeletePost }) => {
    const [user, setUser] = useState(null);
    const [isUsersPost, setIsUsersPost] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const actualUser = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.userToken);

    //#region FUNCTIONS
    useEffect(() => {
        const getUser = async () => {
            let userFinded = await getUserById(post.userId);
            setUser(userFinded);
        };
        if (actualUser?._id === post.userId) setIsUsersPost(true);
        else setIsUsersPost(false);

        getUser();
    }, [actualUser]);

    const highlightHashtags = (content) => {
        const hashtagRegex = /#\w+/g;
        const parts = content.split(hashtagRegex);
        const matches = content.match(hashtagRegex);

        return parts.map((part, index) => (
            <React.Fragment key={index}>
                {part}
                {matches && matches[index] && <span className={CSS.hashtag}>{matches[index]}</span>}
            </React.Fragment>
        ));
    };

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    const handleDeletePost = async () => {
        const postDeleted = await deletePost(post._id, token);
        onDeletePost(postDeleted);
        closeMenu();
    };

    //#endregion

    return (
        <>
            {user ? (
                <Card className={CSS.card}>
                    <CardHeader
                        avatar={<CustomAvatar user={user} />}
                        action={
                            isUsersPost && (
                                <IconButton aria-label="settings" onClick={openMenu}>
                                    <MoreVertIcon />{' '}
                                </IconButton>
                            )
                        }
                        title={user?.nickname}
                        subheader={moment(post.date).format('LL')}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {highlightHashtags(post.content)}
                        </Typography>
                    </CardContent>
                    {post.image && (
                        <div className={CSS.imageWrapper}>
                            <CardMedia component="img" alt="prueba" height="200" image={post.image} className={CSS.postImage} />
                        </div>
                    )}
                    <PostOptions post={post} usersPost={user} />
                </Card>
            ) : (
                <Card>
                    <CardHeader>
                        <Skeleton variant="circular" width={40} height={40} />
                    </CardHeader>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            <Skeleton variant="text"  />
                            <Skeleton variant="text"  />
                            <Skeleton variant="text" />
                        </Typography>
                    </CardContent>
                    <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular"  width={700}/>
                </Card>
            )}

            <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}>
                <MenuItem onClick={handleDeletePost}>Delete post</MenuItem>
            </Menu>
        </>
    );
};

Post.displayName = 'Post';
export default Post;
