import { Container } from "@mui/material";
import { getUserByNickname } from "@/api/users";
import SettingsForm from "@/components/UserSettings/SettingsForm";

const UserSettings = ({user}) => {

    return(
        <Container>
            <SettingsForm user={user}/>
        </Container>
    )
};

export async function getServerSideProps(context) {
    const nickname  = context.query.user;
    const user = await getUserByNickname(nickname);
 
    return {
        props: {
            user,
        },
    };
}

UserSettings.displayName = 'UserSettings';
export default UserSettings;