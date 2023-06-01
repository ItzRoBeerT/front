import moment from "moment/moment";
import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//import MoreVertIcon from "@mui/icons-material/MoreVert";
import {getUserById} from "@/api/users";
import PostOptions from "./PostOptions";
import CSS from "./Post.module.scss";

const Post = ({ post }) => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        const getUser = async () => {
            let userFinded = await getUserById(post.userId);
            setUser(userFinded);
        };
        getUser();
    }, []);

    return (
        <>
            {user ? (
                <Card className={CSS.card}>
                    <CardHeader 
                    avatar={
                         <Avatar aria-label="recipe">
                            {<Image loader={({ src }) => src} src={user.avatar} height={40} width={40} alt={user.name} priority />}
                        </Avatar>} action={
                            <IconButton aria-label="settings"> </IconButton>}
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
        </>
    );
};

Post.displayName = "Post";
export default Post;