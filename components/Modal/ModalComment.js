import { Backdrop, Fade, FormControl, InputLabel, Modal, Input, Button, IconButton } from '@mui/material';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import Image from 'next/image';
import { useState } from 'react';
import CSS from './ModalComment.module.scss';
import { createPost } from '@/api/posts';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const ModalComment = ({ show, handleClose }) => {

    //#region VARIABLES
    const [image, setImage] = useState("");
    const [post, setPost] = useState({
        content: "",
    });
    const actualUser = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.userToken);
    const router = useRouter();
    //#endregion

    //#region FUNCTIONS

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({post});
        const res = await createPost(post, token);
        if (res) router.push("/"+actualUser.nickname);
        handleClose();
        setImage("");
        setPost({
            content: "",
        });
    };

    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.id]: e.target.value,
        });
    };

    const onFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.type.includes("image")) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function load() {
                   setPost({
                        ...post,
                        image: reader.result,
                    });
                    setImage(reader.result); 
                };
            } else {
                delete post.image;
                setImage(null);
            }
        }
    }
    //#endregion

    return (
        <Modal 
            aria-labelledby="transition-modal-title" 
            aria-describedby="transition-modal-description" 
            open={show} 
            onClose={handleClose} 
            closeAfterTransition 
            slots={{ backdrop: Backdrop }}
        >
            <Fade in={show} className={CSS.modal}>
                <form method='post' onSubmit={handleSubmit}>
                    <FormControl>
                        <InputLabel htmlFor="content">Contenido</InputLabel>
                        <Input id="content" type="text" onChange={handleChange}/>
                    </FormControl>
                    <br />
                    {image && <Image src={image} width={200} height={200} alt={image} />}
                    <br />
                    <IconButton component='label'>                        
                         <input type='file' hidden onChange={onFileChange}/>
                        <PermMediaIcon color='primary'/>
                    </IconButton>

                    <Button type="submit" variant="contained" color="primary">Comentar</Button>
                </form>
            </Fade>
        </Modal>
    );
};

ModalComment.displayName = 'ModalComment';
export default ModalComment;
