import ProtectedRoute from "@/components/Protected/ProtectedRoute";
import FormRegister from "@/components/SignIn/FormRegister";
import { Container } from "@mui/material";
import CSS from './register.module.scss'

const Register = () => {
    return (
        <Container className={CSS.container}>
            <FormRegister />
        </Container>
    );
};

export default Register;
