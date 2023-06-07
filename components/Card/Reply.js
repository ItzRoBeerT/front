import { Button, Divider, TextField } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { addComment } from "@/api/posts";
import CSS from './Reply.module.scss'

const Reply = ({postId, onAddComents}) =>{

    const [reply, setReply] = useState("");
    const [error, setError] = useState(false); 
    const token = useSelector((state) => state.auth.userToken);

    const handleChange = (e) => {
        setReply(e.target.value);
    }

    const replyPost = async () => {
        if (reply === "" || reply === null || reply === undefined) {
            setError(true);
            console.log("error", error);
            return;
        }
        const res = await addComment(postId, reply, token);
        console.log({res});
        onAddComents(res.comments);
        setReply("");
        setError(false);
    }

    return (
        <div className={CSS.container}>
            <TextField 
            className={CSS.replyContent}
            label="Type your reply here" 
            variant="filled" 
            onChange={handleChange}
            value={reply}
            error={error}
            helperText={error ? 'you must type something !': ''} 
            inputProps={{
                className: CSS.replyInput
            }}
            InputLabelProps={{
                className: CSS.replyLabel
            }}
            />
            <Button variant="contained" onClick={replyPost}>Reply</Button>
        </div>
    );
}


export default Reply;