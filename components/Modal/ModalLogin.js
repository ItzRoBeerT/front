import axios from 'axios';
import { FormControl, InputLabel, Modal, Fade, Backdrop, Input, Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authSlice from '@/store/auth-slice';
import CSS from './ModalLogin.module.scss';
import { loginUser } from '@/api/users';
import ModalAreYouSure from './ModalAreYouSure';

const ModalLogin = ({ show, handleClose }) => {
    //#region VARIABLESSTATES
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    //#endregion

    //#region FUNCTIONS
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.id]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await loginUser(credentials);
        if (res) {
            dispatch(authSlice.actions.login(res.user));
            router.push('/');
        }else{
            handleOpenModal(true);
        }
    };
    const handleOpenModal = (value) => {
        setOpen(value);
    }
    //#endregion

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={show}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={show} className={CSS.modal}>
                    <form method="post" onSubmit={handleSubmit}>
                        <FormControl className={CSS.formControl}>
                            <InputLabel className={CSS.input} htmlFor="email">
                                Email address
                            </InputLabel>
                            <Input id="email" type="email" className={CSS.input} onChange={handleChange} />
                        </FormControl>
                        <FormControl>
                            <InputLabel className={CSS.input} htmlFor="pwd">
                                Password
                            </InputLabel>
                            <Input id="password" type="password" className={CSS.input} onChange={handleChange} />
                        </FormControl>
                        <Button type="submit" variant="contained" className={CSS.btn} onClick={handleClose}>
                            Iniciar sesion
                        </Button>
                        <small className={CSS.register}>
                            Need an account?{' '}
                            <Link href="/register" onClick={handleClose}>
                                <span className={CSS.link}>Register here</span>
                            </Link>
                        </small>
                    </form>
                </Fade>
            </Modal>
            <ModalAreYouSure
                title={'Fail to login'}
                contentText={'User or password incorrect'}
                open={open}
                onSetOpen={handleOpenModal}
                withOptions={false}
            />
        </>
    );
};

ModalLogin.dispatch = 'ModalLogin';
export default ModalLogin;
