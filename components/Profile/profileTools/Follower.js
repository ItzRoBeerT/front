import { ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import CSS from './Follower.module.scss';
import { useDispatch } from 'react-redux';
import authSlice from '@/store/auth-slice';
import CustomAvatar from '@/components/shared/headers/headerTools/CustomAvatar';

const Follower = ({ friend }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const goToProfile = () => {
        dispatch(authSlice.actions.changeUser());
        dispatch(authSlice.actions.changeUserNickname(friend.nickname));
        router.push(`/${friend.nickname}`);
    };

    return (
        <ListItemButton key={friend._id} onClick={goToProfile} sx={{border: '1px solid white', borderRadius: '10px'}}>
            <ListItemAvatar>
                <CustomAvatar user={friend} />
            </ListItemAvatar>
            <ListItemText 
                primary={<span className={CSS.title}>{friend.name}</span>} 
                secondary={<span className={CSS.subText}> {'@' + friend.nickname}</span>} />
        </ListItemButton>
    );
};

Follower.displayName = 'Follower';
export default Follower;
