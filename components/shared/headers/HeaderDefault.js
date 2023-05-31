import { AppBar, Button, IconButton, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import AppleIcon from "@mui/icons-material/Apple";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CSS from "./HeaderDefault.module.scss";
import DrawerComp from "./headerTools/DrawerComp";
import ModalLogin from "@/components/Modal/ModalLogin";
import UserAvatar from "./headerTools/UserAvatar";
import SearchPostBar from "./headerTools/SearchPostBar";
import authSlice from "@/store/auth-slice";

const PAGES = ["Products", "Services", "Contact Us", "About Us"];
const HeaderDefault = () => {
    //#region VARIABLES
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const router = useRouter();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch()
    //#endregion

    //#region FUNCTIONS

    useEffect(() => {
        dispatch(authSlice.actions.autoLogin())
    }, []);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleRegister = () => {
        router.push("/register");
    };
    const goToHome = () => {
        router.push("/");
    };
    //#endregion

    return (
            <AppBar position="static" className={CSS.appBar}>
                <Toolbar>
                    <IconButton onClick={goToHome} sx={{ color: "white" }}>
                        <AppleIcon />
                    </IconButton>
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
                            <SearchPostBar />
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
    );
};

HeaderDefault.displayName = "HeaderDefault";
export default HeaderDefault;