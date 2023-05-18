import React from "react";
import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import moment from "moment/moment";
//import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import { getUserById } from "@/api/users";
import PostOptions from "./PostOptions";
import CSS from "./Post.module.scss";

const Post = React.memo(({ post }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserById(post.userId).then((data) => setUser(data));
    }, [post.userId]);

    return (
        <>
            {user ? (
                <Card className={CSS.card}>
                    <CardHeader avatar={<Avatar aria-label="recipe">{<Image loader={({ src }) => src} src={user.avatar} height={40} width={40} alt={user.name} priority />}</Avatar>} action={<IconButton aria-label="settings"></IconButton>} title={user?.nickname} subheader={moment(post.date).format("LL")} />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {post.content}
                        </Typography>
                    </CardContent>
                    {post.image && <CardMedia component="img" alt="prueba" height="200" image={post.image} />}
                    <PostOptions />
                </Card>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
});

export default Post;
