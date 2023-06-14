import { Card, CardContent, CardHeader, CardMedia, Container, Divider, IconButton, Typography } from '@mui/material';
import moment from 'moment/moment';
import React from 'react';
import { useState } from 'react';
import Comments from './Comments';
import Reply from './Reply';
import CustomAvatar from '../shared/headers/headerTools/CustomAvatar';
import CSS from './PostCard.module.scss';

const PostCard = ({ post, usersPost }) => {
    const [comments, setComments] = useState(post.comments);

    const handleComments = (newComments) => {
        setComments(newComments);
    };

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

    return (
        <Container className={CSS.content}>
            <Card className={CSS.card}>
                <CardHeader
                    className={CSS.cardHeader}
                    avatar={<CustomAvatar user={usersPost} />}
                    action={<IconButton aria-label="settings" />}
                    title={usersPost?.nickname}
                    subheader={<span className={CSS.subheader}>{moment(post.date).format('LL')}</span>}
                />
                <CardContent>
                    <Typography variant="body2" className={CSS.text}>
                        {highlightHashtags(post.content)}
                    </Typography>
                    <div className={CSS.cardContent}>
                        {post.image && (
                            <div className={CSS.imageWrapper}>
                                <CardMedia component="img" alt="prueba" image={post.image} className={CSS.postImage} />
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
            <div className={CSS.dividerPadding}>
                <Divider className={CSS.divider} />
            </div>

            <Reply postId={post._id} onAddComents={handleComments} />
            <Comments comments={comments} userId={post.userId} onDeleteComments={handleComments} />
        </Container>
    );
};

export default PostCard;
