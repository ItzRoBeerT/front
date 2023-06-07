import { Divider, List, Typography } from "@mui/material";
import CommentLayout from "./tools/CommentLayout";
import CSS from './Comments.module.scss'

const Comments = ({ comments , onDeleteComments}) => {

    return (
        <List>
            {comments.length > 0 ? (
                comments.map((res) => (     
                     <CommentLayout 
                        key={res._id}
                        commentId={res._id} 
                        comment={res.comment} 
                        userId={res.userId} 
                        onDeleteComments={onDeleteComments} 
                       />   
                ))
            ) : (
                <>
                    <Divider className={CSS.divider} />
                    <Typography variant="body1" className={CSS.noComments}>
                        No comments yet
                    </Typography>
                </>
                
            )}
        </List>
    );
};
Comments.displayName = "Comments";
export default Comments;