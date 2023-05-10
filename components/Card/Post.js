import { CardContent, CardMedia, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import PostOptions from './PostOptions';
const Post = () =>{
    return(
        <>
            <Card  sx={{ maxWidth: 345 }}>
                <CardMedia
                       component="img"
                       alt="green iguana"
                       height="140"
                       image="https://static.vecteezy.com/system/resources/previews/005/162/476/original/cartoon-iguana-isolated-on-white-background-free-vector.jpg"/>
                       <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                       </CardContent>
                       <PostOptions/>
            </Card>
        </>
    )
}

export default Post;