import React from 'react';
import { Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledCardMedia = styled(CardMedia)`
  padding-top: 56.25%; // 16:9 aspect ratio
`;

const StyledCardContent = styled(CardContent)`
  flex-grow: 1;
`;


const newsItems = [
    {
        title: 'Title of news item 1...',
        image: 'https://th.bing.com/th/id/OIG2.WSSy5rOyS9yPsD7xf2zI?pid=ImgGn'
    },
    {
        title: 'Title of news item 2...',
        image: 'https://th.bing.com/th/id/OIG2.WSSy5rOyS9yPsD7xf2zI?pid=ImgGn'
    },
    {
        title: 'Title of news item 3...',
        image: 'https://th.bing.com/th/id/OIG2.WSSy5rOyS9yPsD7xf2zI?pid=ImgGn'
    },
    {
        title: 'Title of news item 4...',
        image: 'https://th.bing.com/th/id/OIG2.WSSy5rOyS9yPsD7xf2zI?pid=ImgGn'
    },


    // Add more news items as needed
];
const Newss = () => {
    return (
        <Grid container spacing={4}>
            {newsItems.map((newsItem) => (
                <Grid item key={newsItem.id} xs={12} sm={6} md={4}>
                    <StyledCard>
                        <StyledCardMedia
                            image={newsItem.image}
                            title={newsItem.title}
                        />
                        <StyledCardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {newsItem.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {newsItem.date}
                            </Typography>
                            <Typography>
                                {newsItem.description}
                            </Typography>
                        </StyledCardContent>
                    </StyledCard>
                </Grid>
            ))}
        </Grid>
    );
};

export default Newss;
