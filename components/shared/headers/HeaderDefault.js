import { useState } from "react";
import { AppBar, Button, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import CSS from "./HeaderDefault.module.scss";
import DrawerComp from "./headerTools/DrawerComp";

const PAGES = ["Products", "Services", "Contact Us", "About Us"];
const HeaderDefault = () => {
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

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
                            <Button className={CSS.btnLogin} variant="contained">
                                Login
                            </Button>
                            <Button className={CSS.btnSignup} variant="contained">
                                SignUp
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default HeaderDefault;
