import { Backdrop, Fade, FormControl, InputLabel, Modal, Input, Button, IconButton, TextareaAutosize } from '@mui/material';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Resizer from 'react-image-file-resizer';
import authSlice from '@/store/auth-slice';
import CSS from './ModalComment.module.scss';
import { createPost } from '@/api/posts';

const ModalComment = ({ show, handleClose }) => {
    //#region VARIABLES
    const [image, setImage] = useState('');
    const [post, setPost] = useState({
        content: '',
    });
    const [characterCount, setCharacterCount] = useState(post.content.length);
    const actualUser = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.userToken);
    const dispatch = useDispatch();
    const router = useRouter();
    //#endregion

    //#region FUNCTIONS

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createPost(post, token);
        if (res) {
            dispatch(authSlice.actions.submitPost());
            router.push('/' + actualUser.nickname);
        }
        handleClose();
        setImage('');
        setPost({
            content: '',
        });
        setCharacterCount(0);
    };

    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.id]: e.target.value,
        });
        setCharacterCount(e.target.value.length);
    };

    const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.type.includes('image')) {
                try {
                    const resizedImage = await resizeFile(file); // Llama a la función resizeFile
                    setPost({
                        ...post,
                        image: resizedImage,
                    });
                    setImage(resizedImage);
                } catch (error) {
                    console.log(error);
                }
            } else {
                delete post.image;
                setImage(null);
            }
        }
    };

    const cleanImage = () => {
        setImage(null);
        delete post.image;
    };


    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                300,
                300,
                'JPEG',
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                'base64'
            );
        });

    //#endregion

    return (
        <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={show} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }}>
            <Fade in={show} className={CSS.modal}>
                <form method="post" onSubmit={handleSubmit}>
                    <FormControl>
                        <TextareaAutosize className={CSS.textArea} id="content" type="text" maxRows={5} maxLength={200} minRows={3} onChange={handleChange} placeholder="What are you thinkin ?" />
                        <span>{characterCount}/200</span>
                    </FormControl>

                    <div className={CSS.imageContent}>
                        {image && <Image src={image} width={200} height={200} alt={image} className={CSS.image} />}

                        <IconButton component="label">
                            <input type="file" hidden onChange={onFileChange} />
                            <PermMediaIcon color="primary" />
                        </IconButton>

                        {image && <IconButton>
                            <DeleteIcon color="error" onClick={cleanImage} />
                        </IconButton>}
                    </div>
                    <Button type="submit" variant="contained" color="primary">
                        Comentar
                    </Button>
                </form>
            </Fade>
        </Modal>
    );
};

ModalComment.displayName = 'ModalComment';
export default ModalComment;
