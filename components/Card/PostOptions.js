import { Box, Button, ButtonGroup } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
const PostOptions = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "& > *": {
                    m: 1,
                },
            }}
        >
            <ButtonGroup variant="text" aria-label="text button group">
                <Button>
                    <FavoriteBorderIcon />
                </Button>
                <Button>
                    <ChatBubbleOutlineIcon />
                </Button>
            </ButtonGroup>
        </Box>
    );
};

export default PostOptions;
