import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from "axios";
import {Pagination, Table, TableCell, TableHead, TableRow} from "@mui/material";
import * as rows from "react-bootstrap/ElementChildren";
import BlueThemeTable from "../../components/BlueThemeTable";

const images = [
    {
        url: '/static/images/products/product_1.jpg',
        title: 'Add Students',
        width: '40%',
    },
    {
        url: '/static/images/buttons/burgers.jpg',
        title: 'Add Teachers',
        width: '30%',
    },
    {
        url: '/static/images/buttons/burgers.jpg',
        title: 'Add Coordinators',
        width: '30%',
    },

];

// Mock data for testing
const mockGroups = [
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 1', advisor: 'Advisor A', year: 2023 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 2', advisor: 'Advisor B', year: 2023 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 3', advisor: 'Advisor A', year: 2023 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 4', advisor: 'Advisor B', year: 2023 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 1', advisor: 'Advisor A', year: 2024 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 2', advisor: 'Advisor B', year: 2024 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 3', advisor: 'Advisor A', year: 2024 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 4', advisor: 'Advisor B', year: 2024 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 5', advisor: 'Advisor A', year: 2024 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 6', advisor: 'Advisor B', year: 2024 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 1', advisor: 'Advisor A', year: 2023 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 2', advisor: 'Advisor B', year: 2023 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 3', advisor: 'Advisor A', year: 2023 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 4', advisor: 'Advisor B', year: 2023 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 1', advisor: 'Advisor A', year: 2024 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 2', advisor: 'Advisor B', year: 2024 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 3', advisor: 'Advisor A', year: 2024 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 4', advisor: 'Advisor B', year: 2024 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 5', advisor: 'Advisor A', year: 2024 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 6', advisor: 'Advisor B', year: 2024 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 1', advisor: 'Advisor A', year: 2023 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 2', advisor: 'Advisor B', year: 2023 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 3', advisor: 'Advisor A', year: 2023 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 4', advisor: 'Advisor B', year: 2023 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 1', advisor: 'Advisor A', year: 2024 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 2', advisor: 'Advisor B', year: 2024 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 3', advisor: 'Advisor A', year: 2024 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 4', advisor: 'Advisor B', year: 2024 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 5', advisor: 'Advisor A', year: 2024 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 6', advisor: 'Advisor B', year: 2024 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 1', advisor: 'Advisor A', year: 2023 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 2', advisor: 'Advisor B', year: 2023 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 3', advisor: 'Advisor A', year: 2023 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 4', advisor: 'Advisor B', year: 2023 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 1', advisor: 'Advisor A', year: 2024 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 2', advisor: 'Advisor B', year: 2024 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 3', advisor: 'Advisor A', year: 2024 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 4', advisor: 'Advisor B', year: 2024 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 5', advisor: 'Advisor A', year: 2024 },
    { projectTitle:"smart home", status:"active",students:"name of student", coordinator:"incomplete", name: 'Group 6', advisor: 'Advisor B', year: 2024 }];

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
    const [role, setRole] = useState(''); // State to hold the current role
    const navigate = useNavigate(); // Hook to navigate
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    const [loading, setLoading] = useState(true);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        setLoading(true);
        const year = selectedDate.getFullYear();
        // Fetch groups from the API based on the selected year
        // Replace with your actual API endpoint
        axios.get(`https://your-api.com/groups?year=${year}`)
            .then(response => {
                // If the API call is successful, use the data from the API
                setGroups(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the groups!', error);
                // Fallback to mock data if API call fails
                const filteredMockData = mockGroups.filter(group => group.year === year);
                setGroups(filteredMockData);
                setLoading(false);
            });
    }, [selectedDate]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setPage(1); // Reset to first page when date changes
    };

    // Filter groups based on the selected year
    const filteredGroups = groups.filter(group => group.year === selectedDate.getFullYear());

    // Calculate the current groups to display on the page
    const currentGroups = filteredGroups.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    // Handlers for menu options
    const handleUpload = () => {
        console.log('Upload File clicked');
        setShowForm(false); // Hide the form if it's visible
        navigate('/fileapi', { state: { role: activeButton } }); // Navigate to '/fileapi' with the current role
    };

    const handleForm = () => {
        setShowForm(true);
        navigate('/forminsertion', { state: { role: activeButton } }); // Navigate to the dynamic form with the role

    };

    // Handler for button clicks
    const handleButtonClick = (title) => {
        setActiveButton(title);
        setRole(title); // Save the current role
        setShowMenu(true); // Show the menu options
        setShowForm(false); // Hide the form initially
    };
  return (
      <>

          <Stack direction="row" spacing={4}  sx={{    justifyContent:'space-evenly',     p:2    , flexGrow: 1 , overflow: 'hidden',             backgroundColor: 'cornflowerblue',
          }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap',  minWidth: 300, width: '100%' , justifyContent:'center'}}>
                  {images.map((image) => (
                      <ImageButton
                          focusRipple
                          key={image.title}
                          style={{
                              width: image.width,
                              height: "100px",
                          }}
                          onClick={() => handleButtonClick(image.title)}

                      >
                          <ImageSrc style={{ backgroundImage: `url(${image.url})` ,  backgroundColor: 'transparent',}} />
                          <ImageBackdrop sx={{  backgroundColor: 'lavender'}} className="MuiImageBackdrop-root" />
                          <Image>
                              <Typography
                                  component="span"
                                  variant="subtitle1"
                                  color="inherit"
                                  sx={{
                                      position: 'relative',
                                      p: 4,
                                      pt: 2,
                                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`, backgroundColor: 'skyblue'
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


          <Box sx={{ width: '100%',
                  alignContent: 'center',
              }}>
              <LocalizationProvider  dateAdapter={AdapterDateFns}>
                  <DatePicker
                      sx={{color:'goldenrod',  margin: " 5px 0"}}
                      views={['year']}
                      label="Select Year"
                      value={selectedDate}
                      onChange={handleDateChange}
                      renderInput={(params) =>
                          <TextField
                              sx={{color:'goldenrod', bgcolor: '#00ff00', margin: " 15px 0"}}
                                                                              {...params} />}
                  />
              </LocalizationProvider>
              {loading ? (
                  <Typography>Loading...</Typography>
              ) : (
                  <>
                          <Table
                              borderAxis="bothBetween"
                              stripe="odd"
                              hoverRow

                              sx={{

                                      bgcolor: 'cornflowerblue',textAlign:'center'
                                  ,color: "white"

                              }}
                          >
                              <TableHead >
                              <TableRow

                                  sx={{

                                      bgcolor: 'white'
                                      ,textAlign:'center'
                                      ,color: "black",
                                      fontWeight:"bold",
                                      border:"2px solid black"

                                  }}
                              >
                                  <TableCell sx={{ width: 200 }}>ProjectTitle</TableCell>
                                  <TableCell sx={{ width: 200 }}>Status</TableCell>
                                  <TableCell sx={{ width: 200 }}>Students</TableCell>
                                  <TableCell sx={{ width: 200 }}>Advisors</TableCell>
                                  <TableCell sx={{ width: 200 }}>Coordinators</TableCell>
                                  <TableCell sx={{ width: 400 }}>Take Action</TableCell>



                                  {/*<th*/}
                                  {/*    aria-label="last"*/}
                                  {/*    style={{ width: 'var(--Table-lastColumnWidth)' }}*/}
                                  {/*/>*/}
                              </TableRow>
                              </TableHead>
                              <tbody>
                              {currentGroups.map((group, index) => (
                                  <TableRow key={group.students}>
                                      <td>{group.projectTitle}</td>
                                      <td>{group.status}</td>
                                      <td>{group.students}</td>
                                      <td>{group.advisor}</td>
                                      <td>{group.coordinator}</td>



                                      <td>
                                          <Box sx={{ display: 'flex', gap: 1 }}>
                                              <Button size="sm" variant="plain" color="neuTableRowal">
                                                  Edit
                                              </Button>
                                              <Button size="sm" variant="soft" color="danger">
                                                  Delete
                                              </Button>
                                          </Box>
                                      </td>
                                  </TableRow>
                              ))}
                              </tbody>
                          </Table>

                  </>
              )}
              <Pagination
                  count={Math.ceil(filteredGroups.length / itemsPerPage)}
                  page={page}
                  onChange={handleChangePage}
                  color="primary"
                  sx={{ marginTop: 2 }}
              />
          </Box>






</>
  );
}
export default Insertion;