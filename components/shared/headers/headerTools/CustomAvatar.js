import { Avatar, IconButton,Tooltip } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";


function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

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
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
}

const CustomAvatar = ({user}) => {
 
    const router = useRouter();

    const goToProfile = (event) => {
        event.preventDefault();
        router.push(`/${user.nickname}`);
    };
    return (
        <>
            <Tooltip title={user.nickname}>
                <IconButton onClick={goToProfile}>
                    {user.avatar ? (
                        <Avatar alt="Remy Sharp">
                            <Image 
                                loader={({ src }) => src} 
                                src={user.avatar} 
                                height={40} 
                                width={40} 
                                alt={user.name} 
                                unoptimized />
                        </Avatar>
                    ) : (
                        <Avatar {...stringAvatar("Antonio Gonzalez")} />
                    )}
                </IconButton>
            </Tooltip>
        </>
    );
};

CustomAvatar.displayName = "CustomAvatar";
export default CustomAvatar;
