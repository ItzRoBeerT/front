import { useState } from "react";
import { AppBar, Button, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import CSS from "./HeaderDefault.module.scss";
import DrawerComp from "./headerTools/DrawerComp";
import ModalLogin from "@/components/Modal/ModalLogin";
import { useSelector } from "react-redux";
import UserAvatar from "./headerTools/UserAvatar";
import { useRouter } from "next/router";

const PAGES = ["Products", "Services", "Contact Us", "About Us"];
const HeaderDefault = () => {
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const router = useRouter();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const user = useSelector((state) => state.auth.user);

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleRegister = () =>{
        router.push("/register");
    }

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
                                    <Button className={CSS.btnSignup} variant="contained" onClick={handleRegister}>
                                        Register
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
