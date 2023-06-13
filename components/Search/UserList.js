import {  Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from '@mui/material';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import CSS from './UserList.module.scss';
import CustomAvatar from '../shared/headers/headerTools/CustomAvatar';
import { useRouter } from 'next/router';

const UserList = ({ users, keyParam }) => {
    const [open, setOpen] = useState(true);
    const router = useRouter();

    const handleClick = () => {
        setOpen(!open);
    };

    const goToProfile = (user) => {
        router.push(`/${user.nickname}`);
    }

    return (
        <List
            className={CSS.mainList}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader" className={CSS.subheader}>
                    <Typography variant='h6'className={CSS.title}>
                       Users finded with term: {keyParam}
                    </Typography>
                </ListSubheader>
            }
        >
            <ListItemButton onClick={handleClick} sx={{background: '#111'}}>
                <ListItemIcon>
                    <PersonIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Users" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit sx={{ color: 'white', background:'black' }}>
                <List component="div" disablePadding className={CSS.list}>
                    {users.length >= 1 ? (
                        users.map((user) => (
                            <ListItemButton key={user._id} onClick={() => goToProfile(user)}>
                                <ListItem key={user._id}>
                                    <CustomAvatar user={user} />
                                    <ListItemText primary={user.nickname} />
                                </ListItem>
                            </ListItemButton>
                        ))
                    ) : (
                        <ListItem>No users found</ListItem>
                    )}
                </List>
            </Collapse>
        </List>
    );
};

UserList.displayName = 'UserList';
export default UserList;
