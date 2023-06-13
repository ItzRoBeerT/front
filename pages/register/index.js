import ProtectedRoute from "@/components/Protected/ProtectedRoute";
import FormRegister from "@/components/SignIn/FormRegister";
import { Container } from "@mui/material";
import CSS from './register.module.scss'
import { getAllEmails, getAllNicknames } from "@/api/users";

const Register = ({nicknames, emails}) => {

    return (
        <Container className={CSS.container}>
            <FormRegister nicknames={nicknames} emails={emails}/>
        </Container>
    );
};

export const getServerSideProps = async () => {
    const nicknames = await getAllNicknames();
    const emails = await getAllEmails();
    return {
        props: {
            nicknames,
            emails
        },
    };
};

Register.displayName = "Register";
export default Register;
