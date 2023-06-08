import moment from "moment/moment";
import { Card, CardContent, CardHeader, CardMedia, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { deletePost } from "@/api/posts";
import {getUserById} from "@/api/users";
import PostOptions from "./PostOptions";
import CSS from "./Post.module.scss";
import CustomAvatar from "../shared/headers/headerTools/CustomAvatar";

const Post = ({ post, onDeletePost }) => {
    const [user, setUser] = useState(null);
    const [isUsersPost, setIsUsersPost] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const actualUser = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.userToken);
    const postRef = useRef(null);

    //#region FUNCTIONS
    useEffect(() => {
        const getUser = async () => {
            let userFinded = await getUserById(post.userId);
            setUser(userFinded);
        };
        if(actualUser?._id === post.userId) setIsUsersPost(true);
        else setIsUsersPost(false);
        
        getUser();
    }, [actualUser]);

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
                <Card className={CSS.card} >
                    <CardHeader 
                        avatar={<CustomAvatar user={user} />}
                        action={ isUsersPost && <IconButton aria-label="settings" onClick={openMenu}><MoreVertIcon/> </IconButton>}
                        title={user?.nickname} 
                        subheader={moment(post.date).format("LL")} />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {post.content}
                        </Typography>
                    </CardContent>
                    {post.image && <CardMedia component="img" alt="prueba" height="200" image={post.image} />}
                    <PostOptions post={post} usersPost={user} />
                </Card>
            ) : (
                <div>Loading...</div>
            )}

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={closeMenu}
            >
                <MenuItem onClick={handleDeletePost}>Delete post</MenuItem>
            </Menu>
        </>
    );
};

Post.displayName = "Post";
export default Post;
