import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


const images = [
    {
        url: '/static/images/buttons/breakfast.jpg',
        title: 'Add Students',
        width: '40%',
    },
    {
        url: '/static/images/buttons/burgers.jpg',
        title: 'Add Teachers',
        width: '30%',
    },
    {
        url: '/static/images/buttons/camera.jpg',
        title: 'Upload Excel',
        width: '30%',
    },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

const DemoPaper = styled(Paper)(({ theme }) => ({
    width: 120,
    height: 120,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const MenuOptions = ({ onUpload, onForm }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
            <Button variant="contained" onClick={onUpload} sx={{ mb: 1 }}>
                Upload File
            </Button>
            <Button variant="contained" onClick={onForm}>
                Use Form
            </Button>
        </Box>
    );
};


const FormComponent = () => {
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Student Information
            </Typography>
            <TextField label="Name" variant="outlined" fullWidth margin="normal" />
            {/* Add more fields as needed */}
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Submit
            </Button>
        </Box>
    );
};
const Insertion = () => {
    const [activeButton, setActiveButton] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [showForm, setShowForm] = useState(false);

    // Handlers for menu options
    const handleUpload = () => {
        // Implement file upload logic here
        console.log('Upload File clicked');
        setShowForm(false); // Hide the form if it's visible
    };

    const handleForm = () => {
        // Show the form
        setShowForm(true);
    };

    // Handler for button clicks
    const handleButtonClick = (title) => {
        setActiveButton(title);
        setShowMenu(true); // Show the menu options
        setShowForm(false); // Hide the form initially
    };

  return (
      <>

          <Stack direction="row" spacing={4}  sx={{    justifyContent:'space-evenly',     p:3    ,             backgroundColor: 'goldenrod',
          }}>
              {/*<DemoPaper square={false}>Add Students</DemoPaper>*/}
              {/*<DemoPaper square>Add Teachers</DemoPaper>*/}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
                  {images.map((image) => (
                      <ImageButton
                          focusRipple
                          key={image.title}
                          style={{
                              width: image.width,
                          }}
                          onClick={() => handleButtonClick(image.title)}

                      >
                          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                          <ImageBackdrop className="MuiImageBackdrop-root" />
                          <Image>
                              <Typography
                                  component="span"
                                  variant="subtitle1"
                                  color="inherit"
                                  sx={{
                                      position: 'relative',
                                      p: 4,
                                      pt: 2,
                                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                  }}
                              >
                                  {image.title}
                                  <ImageMarked className="MuiImageMarked-root" />
                              </Typography>
                              {showMenu && activeButton === image.title && (
                                  <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, bgcolor: 'rgba(0, 0, 0, 0.7)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                      {!showForm ? (
                                          <MenuOptions onUpload={handleUpload} onForm={handleForm} />
                                      ) : (
                                          <FormComponent />
                                      )}
                                  </Box>
                              )}
                          </Image>
                      </ImageButton>
                  ))}
              </Box>
          </Stack>
          {/*{showMenu && activeButton === 'Add Students' && (*/}
          {/*    <MenuOptions onUpload={handleUpload} onForm={handleForm} />*/}
          {/*)}*/}

                 <Grid container spacing={2}>
      {[lightTheme, darkTheme].map((theme, index) => (
          <Grid item xs={6} key={index}>
              <ThemeProvider theme={theme}>
                  <Box
                      sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: 'background.default',
                          display: 'grid',
                          gridTemplateColumns: { md: '1fr 1fr' },
                          gap: 2,
                      }}
                  >
                      {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
                          <Item key={elevation} elevation={elevation}>
                              {`elevation=${elevation}`}
                          </Item>
                      ))}
                  </Box>
              </ThemeProvider>
          </Grid>
      ))}

      </Grid>






</>
  );
}
export default Insertion;