import { Button, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from '@mui/material';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import CSS from './UserList.module.scss';

const UserList = ({ users, keyParam }) => {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

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
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <PersonIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Users" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit sx={{ color: 'white' }}>
                <List component="div" disablePadding>
                    {users.length >= 1 ? (
                        users.map((user) => (
                            <ListItemButton key={user._id}>
                                <ListItem key={user._id}>
                                    <PersonIcon sx={{ color: 'white' }} />
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
