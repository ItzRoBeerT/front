import { Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { addComment } from "@/api/posts";

const Reply = ({postId, onAddComents}) =>{

    const [reply, setReply] = useState("");
    const [error, setError] = useState(false); 
    const refReply = useRef(null);
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
        setError(false);
    }

    return (
        <div>
            <TextField 
            ref={refReply} 
            label="Your reply" 
            variant="filled" 
            onChange={handleChange}
            error={error}
            helperText={error ? 'you must type something !': ''} />
            <Button variant="contained" onClick={replyPost}>Reply</Button>
        </div>
    );
}


export default Reply;