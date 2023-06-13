import ProtectedRoute from '@/components/Protected/ProtectedRoute';
import FormRegister from '@/components/SignIn/FormRegister';
import { Container, Typography } from '@mui/material';
import CSS from './register.module.scss';
import { getAllEmails, getAllNicknames } from '@/api/users';

const Register = ({ nicknames, emails }) => {
    return (
        <Container className={CSS.container}>
            <div className={CSS.centrar}>
                <Typography variant="h3" component="h1" className={CSS.text}>
                    Register new user
                </Typography>
                <FormRegister nicknames={nicknames} emails={emails} />
            </div>
        </Container>
    );
};

export const getServerSideProps = async () => {
    const nicknames = await getAllNicknames();
    const emails = await getAllEmails();
    return {
        props: {
            nicknames,
            emails,
        },
    };
};

Register.displayName = 'Register';
export default Register;
