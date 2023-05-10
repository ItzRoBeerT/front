import { Container} from "@mui/material";
import CSS from "../styles/Home.module.scss";
import Post from "@/components/Card/Post";
function Home() {
    return (
        <>
            <Container fixed className={CSS.container}>
                <Post />
            </Container>
        </>
    );
}

export default Home;
