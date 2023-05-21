import axios from "axios";
import { Box, Button, ButtonGroup } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PostOptions = memo(({ post }) => {
    //#region VARIABLES
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.userToken);
    const [isUserLikedPost, setIsUserLikedPost] = useState(false);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    //#endregion
    console.log('isUserLikedPost', isUserLikedPost)

    //#region FUNCTIONS
    const checkIfUserLikedPost = () => {
        if (user !== null && token !== null) {
            post.likedBy.forEach((like) => {
                if (like.userId === user._id) setIsUserLikedPost(true);
            });
        }else{
            setIsUserLikedPost(false);
        }
    };
    useEffect(() => {
        checkIfUserLikedPost();
    }, [checkIfUserLikedPost]);

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
    //#endregion

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "& > *": {
                    m: 1,
                },
            }}
        >
            <ButtonGroup variant="text" aria-label="text button group">
                <Button onClick={likePost}>{!isUserLikedPost ? <FavoriteBorderIcon sx={{ color: "red" }} /> : <FavoriteIcon sx={{ color: "red" }} />}</Button>
                <Button>
                    <ChatBubbleOutlineIcon />
                </Button>
            </ButtonGroup>
        </Box>
    );
});

export default PostOptions;
