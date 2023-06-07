import { ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import CustomAvatar from '@/components/shared/headers/headerTools/CustomAvatar';
import CSS from './Follower.module.scss';

const Follower = ({ friend }) => {
    const router = useRouter();
    const goToProfile = () => {
        router.push(`/${friend.nickname}`);
    };

    return (
        <ListItemButton key={friend._id} onClick={goToProfile}>
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
