import { useState } from "react";
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CSS from "./DrawerComp.module.scss";

const PAGES = ["Products", "Services", "Contact Us", "About Us", "Login", "Logout"];

const DrawerComp = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
        <>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <List>
                    {PAGES.map((page, index) => (
                        <ListItemButton onClick={()=> setOpenDrawer(false)} key={index}>
                            <ListItemIcon>
                                <ListItemText>{page}</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
            <IconButton className={CSS.iconBtn} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
            </IconButton>
        </>
    );
};

export default DrawerComp;
