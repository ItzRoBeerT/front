import { AppBar, Button, IconButton, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import HomeIcon from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CSS from "./HeaderDefault.module.scss";
import DrawerComp from "./headerTools/DrawerComp";
import ModalLogin from "@/components/Modal/ModalLogin";
import UserAvatar from "./headerTools/UserAvatar";
import SearchPostBar from "./headerTools/SearchPostBar";
import authSlice from "@/store/auth-slice";
import pocketSM from "@/public/images/PocketSM.png";
import ModalComment from "@/components/Modal/ModalComment";
import Image from "next/image";

const HeaderDefault = ({onChangePosts}) => {
    //#region VARIABLES
    const [open, setOpen] = useState(false);
    const [openComment, setOpenComment] = useState(false);
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

    const handleOpenComment = () => setOpenComment(true);

    const handleCloseComment = () => setOpenComment(false);

    const handleRegister = () => {
        router.push("/register");
    };
    const goToHome = () => {
        router.push("/");
    };
    //#endregion

    return (
            <AppBar sx={{paddingRight: '0px !important'}} className={CSS.toolbar} >
                <Toolbar>
                    <IconButton onClick={goToHome} sx={{ color: "white" }}>
                        <Image src={pocketSM} width={40} height={40} alt="logo"/>
                    </IconButton>
                    <SearchPostBar />
                    {isMatch ? (
                            <DrawerComp user={user} />                  
                    ) : (
                        <>
                            {!user ? (
                                <div className={CSS.divProfile}>
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
                                    <Button  variant="outlined" onClick={handleOpenComment} color="inherit" endIcon={<SendIcon />}>
                                        what are you thinking?
                                    </Button>
                                    <ModalComment show={openComment} handleClose={handleCloseComment} />
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