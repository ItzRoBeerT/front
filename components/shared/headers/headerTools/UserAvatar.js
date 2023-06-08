import axios from 'axios';
import Image from 'next/image';
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Logout, Settings } from '@mui/icons-material';
import authSlice from '@/store/auth-slice';
import { useRouter } from 'next/router';

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}
function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),

        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}
function stringAvatarEdited(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            width: '200px',
            height: '200px',
            fontSize: '80px',

        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}
const UserAvatar = ({ isStringAvatar = true }) => {
    //#region VARIABLES
    const [anchorEl, setAnchorEl] = useState(null);
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.userToken);
    const router = useRouter();
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    //#endregion

    //#region FUNCTIONS
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const goToProfile = () => {
        router.push('/' + user.nickname);
        setAnchorEl(null);
    };

    const goToSettings = () => {
        router.push('/settings/' + user.nickname);
        setAnchorEl(null);
    };

    const logout = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const res = await axios.post('http://localhost:3004/user/logout', null, config);
            console.log(res);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            dispatch(authSlice.actions.logout());
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    };
    //#endregion
    return (
        <>
            {isStringAvatar ? (
                <Tooltip title="Account settings">
                    <IconButton onClick={handleClick}>
                        {user.avatar ? (
                            <Avatar alt="Remy Sharp">
                                <Image loader={({ src }) => src} src={user.avatar} height={40} width={40} alt={user.name} priority />
                            </Avatar>
                        ) : (
                            <Avatar {...stringAvatar(user.name+ ' '+ user.lastName)} />
                        )}
                    </IconButton>
                </Tooltip>
            ) : (
                <Avatar {...stringAvatarEdited(user.name+ ' '+ user.lastName)} />
            )}

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={goToProfile}>My account</MenuItem>
                <Divider />
                <MenuItem onClick={goToSettings}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

UserAvatar.displayName = 'UserAvatar';
export default UserAvatar;
