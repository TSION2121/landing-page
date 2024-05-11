import {keyframes, styled} from "@mui/system";
import {Typography, Box, Container, Grid, Card, CardMedia, useTheme, CardContent} from '@mui/material';
import {useParams} from "react-router-dom";
import React from "react";

// Keyframes for animation
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;



const StyledCardContent = styled(CardContent)`
  flex-grow: 1;
`;
const StyledCardMedia = styled(CardMedia)`
  padding-top: 56.25%; // 16:9 aspect ratio
`;


const Layout = () => {
    const theme = useTheme();
    const { title } = useParams(); // Get the title parameter from the URL

    const fellowshipDetails = {
        "details-of-news-item-1": {
            description: "Description for Fellowship 1",
            image: 'https://th.bing.com/th/id/OIG2.WSSy5rOyS9yPsD7xf2zI?pid=ImgGn',
            // ...other details
        },
        "details-of-news-item-2": {
            description: "Description for Fellowship 2",
            image: 'https://th.bing.com/th/id/OIG2.WSSy5rOyS9yPsD7xf2zI?pid=ImgGn',
            // ...other details
        },
        "details-of-news-item-3": {
            description: "Description for Fellowship 3",
            image: 'https://th.bing.com/th/id/OIG2.WSSy5rOyS9yPsD7xf2zI?pid=ImgGn',
            // ...other details
        },
        "details-of-news-item-4": {
            description: "Description for Fellowship 4",
            image: 'https://th.bing.com/th/id/OIG2.WSSy5rOyS9yPsD7xf2zI?pid=ImgGn',
            // ...other details
        },
        // ...add as many fellowships as needed
    };

    const detail = fellowshipDetails[title];

    const StyledBox = styled(Container)(({ theme }) => ({
        margin: '20px 0',
        display: 'flex',
        alignItems: 'center',
        padding: '20px',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
            transform: 'scale(1.03)',
        },
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        },
        animation: `${fadeIn} 0.8s ease-out`,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',

    }));
    const StyledCard = styled(Card)(({ theme }) => ({
        margin: '20px',
        padding: '20px',
        // alignItems:'center',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '10px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[4],
        color: theme.palette.text.primary,

    }));
    return (
        <>

            <StyledBox>
                    <StyledCard>
                        <StyledCardMedia
                            image={detail ? detail.image : ''}
                        />
                        <StyledCardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                news
                            </Typography>

                            <Typography variant="h4">
                                {detail ? detail.title : 'Fellowship Detail'}
                            </Typography>
                            <Typography variant="body1" style={{ marginTop: "20px" }}>
                                {detail ? detail.description : ''}
                            </Typography>
                        </StyledCardContent>

                    </StyledCard>
                <Container>
                    <Typography variant="body2" color="textSecondary">

                    </Typography>
                </Container>
            </StyledBox>

        </>
    );
}

export default  Layout;