import Image from 'next/image';
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
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
const UserAvatarMobile = ({ isStringAvatar = true }) => {
    //#region VARIABLES
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.userToken);
    const router = useRouter();
  
    //#endregion

    //#region FUNCTIONS
    const handleClick = (event) => {
        router.push('/'+user.nickname);
    };
 
    //#endregion
    return (
        <>
            {isStringAvatar ? (
                    <IconButton onClick={handleClick}>
                        {user.avatar ? (
                            <Avatar alt="Remy Sharp">
                                <Image loader={({ src }) => src} src={user.avatar} height={40} width={40} alt={user.name} priority />
                            </Avatar>
                        ) : (
                            <Avatar {...stringAvatar(user.name+ ' '+ user.lastName)} />
                        )}
                    </IconButton>
            ) : (
                <Avatar {...stringAvatarEdited(user.name+ ' '+ user.lastName)} />
            )}
        </>
    );
};

UserAvatarMobile.displayName = 'UserAvatarMobile';
export default UserAvatarMobile;
