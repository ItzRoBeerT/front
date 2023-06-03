import { IconButton, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem } from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserById } from "@/api/users";
import { deleteComment } from "@/api/posts";
import CustomAvatar from "@/components/shared/headers/headerTools/CustomAvatar";

const CommentLayout = ({ comment, commentId, userId , onDeleteComments }) => {
    const [user, setUser] = useState({});
    const [isMyComment, setIsMyComment] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const userLogged = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.userToken);

    //FIXME muchos renders
    //console.log({commentId});
    
    //#region FUNCTIONS
    useEffect(() => {
        const getUser = async () => {
            const user = await getUserById(userId);
            setUser(user);
        };
        getUser();
        if (userLogged !== null) {
            if (userLogged._id === userId) setIsMyComment(true);
        }
    }, [userLogged]);

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    const handleDeleteComment = async () => {
        console.log({token});
        const res = await deleteComment(commentId, token);
        onDeleteComments(res.comments);
        closeMenu();
    };
    //#endregion

    return (
        <ListItem key={commentId}>
            <ListItemAvatar>
                <CustomAvatar user={user} />
            </ListItemAvatar>
            <ListItemText primary={"@" + user.nickname} secondary={comment} />
            {isMyComment && (
                <IconButton color="inherit" onClick={openMenu}>
                    <MoreIcon />
                </IconButton>
            )}
            <Menu 
                anchorEl={anchorEl}
                open={open}
                onClose={closeMenu}>
                <MenuItem onClick={handleDeleteComment}>Delete Comment</MenuItem>
            </Menu>
        </ListItem>
    );
};

export default CommentLayout;
