import { ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { useRouter } from "next/router";
import CustomAvatar from "@/components/shared/headers/headerTools/CustomAvatar";

const Follower = ({friend}) => {

    const router = useRouter();
    const goToProfile = () => {
        router.push(`/${friend.nickname}`);
    };

    return (
        <ListItemButton key={friend._id} onClick={goToProfile}>
            <ListItemAvatar>
                <CustomAvatar user={friend} />
            </ListItemAvatar>
            <ListItemText primary={friend.name} secondary={'@'+friend.nickname} />
        </ListItemButton>
    )
};

Follower.displayName = "Follower";
export default Follower;