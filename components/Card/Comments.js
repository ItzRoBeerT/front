import { List } from "@mui/material";
import CommentLayout from "./tools/CommentLayout";

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
                <p>no existen comentarios</p>
            )}
        </List>
    );
};

export default Comments;