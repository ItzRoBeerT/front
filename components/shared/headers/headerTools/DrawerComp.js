import { useState } from 'react';
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CSS from './DrawerComp.module.scss';
import ModalLogin from '@/components/Modal/ModalLogin';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import UserAvatarMobile from './UserAvatarMobile';
import { logoutUser } from '@/api/users';
import authSlice from '@/store/auth-slice';

const PAGES = ['Login', 'register'];
const PAGESLOGGED = ['settings', 'Logout'];

const DrawerComp = ({user}) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [open, setOpen] = useState(false);
    const token = useSelector((state) => state.auth.userToken);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleItemClick = (item) => {
        setOpenDrawer(false);
        if (item === 'Login') {
            setOpen(true);
        }else if(item === 'register'){
            router.push('/register');
        }

        //logged in 
        if (item === 'settings') {
            router.push('/settings/'+user.nickname);
        }else if(item === 'Logout'){
            logout();
        }
    };

    const logout = async () => {
        const res = await logoutUser(token);
        if (res) {
            dispatch(authSlice.actions.logout());
            router.push('/');
            setOpenDrawer(true);
        }

    };

    const handleClose = () => setOpen(false);

    return (
        <>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} anchor='right' PaperProps={{sx: {width: '200px'}}}>
                {!user ? <List>
                    {PAGES.map((page, index) => (
                        <ListItemButton onClick={() => handleItemClick(page)} key={index}>
                            <ListItemIcon>
                                <ListItemText>{page}</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                    ))}
                </List> : 
                <List>
                    <ListItemButton  className={CSS.avatarMobile}>
                        <ListItemIcon>
                            <UserAvatarMobile user={user} />
                        </ListItemIcon>
                    </ListItemButton>
                    {PAGESLOGGED.map((page, index) => (
                        <ListItemButton onClick={() => handleItemClick(page)} key={index}>
                            <ListItemIcon>
                                <ListItemText>{page}</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                    ))}
                </List>}
            </Drawer>
            <IconButton className={CSS.iconBtn} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
            </IconButton>
            <ModalLogin show={open} handleClose={handleClose} />
        </>
    );
};

export default DrawerComp;
