import Image from "next/image";
import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import moment from "moment/moment";
import { useState } from "react";
import Comments from "./Comments";
import Reply from "./Reply";

const PostCard = ({ post, usersPost }) => {

    const [comments, setComments] = useState(post.comments);

    const handleComments = (newComments) =>{
        setComments(newComments);
    }

    return (
        <div>
            <Card>
                <CardHeader avatar={<Avatar aria-label="recipe">{<Image loader={({ src }) => src} src={usersPost.avatar} height={40} width={40} alt={usersPost.name} priority unoptimized />}</Avatar>} action={<IconButton aria-label="settings" />} title={usersPost?.nickname} subheader={moment(post.date).format("LL")} />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {post.content}
                    </Typography>
                </CardContent>
                {post.image && <CardMedia component="img" alt="prueba" height="200" image={post.image} />}
            </Card>
                <Reply postId={post._id} onAddComents={handleComments}/>
                <Comments comments={comments} />
        </div>
    );
};

export default PostCard;
