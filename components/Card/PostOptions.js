import axios from 'axios';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const PostOptions = ({ post, usersPost }) => {
    //#region VARIABLES
    const user = useSelector((state) => state.auth.user);
    const [isUserLikedPost, setIsUserLikedPost] = useState(false);
    const token = useSelector((state) => state.auth.userToken);
    const router = useRouter();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    //#endregion

    //#region FUNCTIONS
    useEffect(() => {
        checkIfUserLikedPost();
    }, []);

    const checkIfUserLikedPost = () => {
        if (user !== null && token !== null) {
            post.likedBy.forEach((like) => {
                if (like.userId === user._id) setIsUserLikedPost(true);
            });
        } else {
            setIsUserLikedPost(false);
        }
    };

    const likePost = async () => {
        if (isUserLikedPost) {
            try {
                const res = await axios.post(`http://localhost:3004/post/unlike/${post._id}`, null, config);
                console.log(res);
                setIsUserLikedPost(false);
            } catch (error) {
                console.log(error);
            }
            return;
        }
        try {
            const res = await axios.post(`http://localhost:3004/post/like/${post._id}`, null, config);
            console.log(res);
            setIsUserLikedPost(true);
        } catch (error) {
            console.log(error);
        }
    };

    const commentPost = () => {
        router.push({ pathname: `/post/${post._id}` });
    };
    //#endregion

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                    m: 1,
                },
            }}
        >
            <ButtonGroup variant="text" aria-label="text button group">
                <Button onClick={likePost}>
                    {!isUserLikedPost ? (
                        <>
                            <Typography variant="caption" component="div" sx={{ color: 'red',  float: 'left' }}>
                                {post.likedBy.length}
                            </Typography>
                            <FavoriteBorderIcon sx={{ color: 'red' }} />
                        </>
                    ) : (
                        <>
                            <Typography variant="caption" component="div" sx={{ color: 'red', float: 'left' }}>
                                {post.likedBy.length}
                            </Typography>
                            <FavoriteIcon sx={{ color: 'red' }} />
                        </>
                    )}
                </Button>
                <Button onClick={commentPost}>
                    <Typography variant="caption" component="div" sx={{ color: 'blue', float: 'left' }}>
                        {post.comments.length}
                    </Typography>
                    <ChatBubbleOutlineIcon />
                </Button>
            </ButtonGroup>
        </Box>
    );
};

PostOptions.displayName = 'PostOptions';
export default PostOptions;
