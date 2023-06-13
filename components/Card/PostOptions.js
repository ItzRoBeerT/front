import axios from 'axios';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Resizer from 'react-image-file-resizer';
import ModalAreYouSure from '../Modal/ModalAreYouSure';

const PostOptions = ({ post, usersPost }) => {
    //#region VARIABLES
    const user = useSelector((state) => state.auth.user);
    const [isUserLikedPost, setIsUserLikedPost] = useState(false);
    const [likes, setLikes] = useState(post.likedBy.length);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
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

    const handleModal = (value) => {
        setOpenDeleteModal(value);
    };
    const likePost = async () => {
        if (isUserLikedPost) {
            try {
                const res = await axios.post(`http://localhost:3004/post/unlike/${post._id}`, null, config);
                setLikes(likes - 1);
                setIsUserLikedPost(false);
            } catch (error) {
                console.log(error);
            }
            return;
        }
        try {
            const res = await axios.post(`http://localhost:3004/post/like/${post._id}`, null, config);

            setLikes(likes + 1);
            setIsUserLikedPost(true);
        } catch (error) {
            setOpenDeleteModal(true);
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
                            <Typography variant="caption" component="div" sx={{ color: 'red', float: 'left' }}>
                                {likes}
                            </Typography>
                            <FavoriteBorderIcon sx={{ color: 'red' }} />
                        </>
                    ) : (
                        <>
                            <Typography variant="caption" component="div" sx={{ color: 'red', float: 'left' }}>
                                {likes}
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
            <ModalAreYouSure title={'Account needed'} open={openDeleteModal} onSetOpen={handleModal} contentText={'You need to be logged in to like a post'} withOptions={false} />
        </Box>
    );
};

PostOptions.displayName = 'PostOptions';
export default PostOptions;
