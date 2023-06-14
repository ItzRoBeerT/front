import { Button, Divider, TextField } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { addComment } from '@/api/posts';
import CSS from './Reply.module.scss';
import ModalAreYouSure from '../Modal/ModalAreYouSure';

const Reply = ({ postId, onAddComents }) => {
    const [reply, setReply] = useState('');
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const token = useSelector((state) => state.auth.userToken);

    const handleChange = (e) => {
        setReply(e.target.value);
    };

    const handleOpen = (value) => {
        setOpen(value);
    };
    
    const goToRegister = () => {
        router.push('/register');
    }

    const replyPost = async () => {
        
        if (token !== null && token !== undefined && token !== '') {
            if (reply === '' || reply === null || reply === undefined) {
                setError(true);
                console.log('error', error);
                return;
            }
            const res = await addComment(postId, reply, token);
            onAddComents(res.comments);
            setReply('');
            setError(false);
        }else{
            handleOpen(true);
        }
    };

    return (
        <div className={CSS.container}>
            <TextField
                className={CSS.replyContent}
                label="Type your reply here"
                variant="filled"
                onChange={handleChange}
                value={reply}
                error={error}
                helperText={error ? 'you must type something !' : ''}
                inputProps={{
                    className: CSS.replyInput,
                }}
                InputLabelProps={{
                    className: CSS.replyLabel,
                }}
            />
            <Button variant="contained" onClick={replyPost}>
                Reply
            </Button>
            <ModalAreYouSure
                title={'You must be logged in to reply'}
                contentText={'Do you want to login now ?'}
                open={open}
                onSetOpen={handleOpen}
                handleEvent={goToRegister}
            />
        </div>
    );
};

export default Reply;
