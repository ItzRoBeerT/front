import { FormControl, InputLabel, Modal, Fade, Backdrop, Input, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import CSS from "./ModalLogin.module.scss";
import { useDispatch } from "react-redux";
import authSlice from "@/store/auth-slice";

const ModalLogin = ({ show, handleClose }) => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3004/user/login", credentials);
            console.log(res);
            if (res.data.token) {
                if (typeof window !== "undefined") {
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                }
                dispatch(authSlice.actions.login(res.data.user));
            }
        } catch (e) {
            console.log(e);
        }
    };

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
                        <Button type="submit" variant="contained" className={CSS.btn}>
                            Iniciar sesion
                        </Button>
                    </form>
                </Fade>
            </Modal>
        </>
    );
};

export default ModalLogin;
