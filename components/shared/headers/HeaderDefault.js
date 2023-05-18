import { useState } from "react";
import { AppBar, Button, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import CSS from "./HeaderDefault.module.scss";
import DrawerComp from "./headerTools/DrawerComp";
import ModalLogin from "@/components/Modal/ModalLogin";
import { useSelector } from "react-redux";
import UserAvatar from "./headerTools/UserAvatar";

const PAGES = ["Products", "Services", "Contact Us", "About Us"];
const HeaderDefault = () => {
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const user = useSelector((state) => state.auth.user);

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const prueba = async () => {
        // const token = localStorage.getItem("token");
        // console.log(token);
        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        // };
        // try {
        //     const res = await axios.get("http://localhost:3004/user/me", config);
        //     console.log(res);
        // } catch (error) {
        //     console.error(error);
        // }

        console.log(user);
    };

    return (
        <>
            <AppBar position="static" className={CSS.appBar}>
                <Toolbar>
                    <AppleIcon />
                    {isMatch ? (
                        <>
                            <Typography className={CSS.title}>Apple</Typography>
                            <DrawerComp />
                        </>
                    ) : (
                        <>
                            <Tabs textColor="inherit" value={value} onChange={(e, value) => setValue(value)}>
                                {PAGES.map((page, index) => (
                                    <Tab key={index} label={page} />
                                ))}
                            </Tabs>
                            {!user ? (
                                <div>
                                    <Button className={CSS.btnLogin} variant="contained" onClick={handleOpen}>
                                        Login
                                    </Button>
                                    <Button className={CSS.btnSignup} variant="contained" onClick={prueba}>
                                        SignUp
                                    </Button>
                                    <ModalLogin show={open} handleClose={handleClose} />
                                </div>
                            ) : (
                                <div className={CSS.divProfile}>
                                    <UserAvatar />
                                </div>
                            )}
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default HeaderDefault;
