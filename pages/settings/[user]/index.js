import { Container, Typography } from '@mui/material';
import { getUserByNickname } from '@/api/users';
import SettingsForm from '@/components/UserSettings/SettingsForm';
import ProtectedRoute from '@/components/Protected/ProtectedRoute';
import CSS from './Settings.module.scss'

const UserSettings = ({ user }) => {
    return (
        <Container className={CSS.content}>
            <ProtectedRoute user={user}>
                <Typography  className={CSS.text} variant="h3" component="h1" >
                    Settings
                </Typography>
                <SettingsForm user={user} />
            </ProtectedRoute>
        </Container>
    );
};

export async function getServerSideProps(context) {
    const nickname = context.query.user;
    const user = await getUserByNickname(nickname);

    return {
        props: {
            user,
        },
    };
}

UserSettings.displayName = 'UserSettings';
export default UserSettings;
