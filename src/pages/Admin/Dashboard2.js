import React from 'react';
import { Grid, Card, CardContent, Typography, useTheme } from '@mui/material';
import LineGraph from './LineGraph'; // Your LineGraph component
import PieChart from './PieChart'; // Your PieChart component
import BarChart from './BarChart'; // Your BarChart component

const Dashboard = () => {
    const theme = useTheme();

    return (
        <div style={{ padding: theme.spacing(2) }}>
            <Typography variant="h4" gutterBottom>
                Student Data Analysis
            </Typography>
            <Grid container spacing={2}>
                {/* Department Analysis */}
                <Grid item xs={12} sm={4} md={3} lg={2}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Department Distribution
                            </Typography>
                            <BarChart /> {/* This will show the number of students per department */}
                        </CardContent>
                    </Card>
                </Grid>

                {/* GPA Analysis */}
                <Grid item xs={12} sm={4} md={3} lg={2}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                GPA Distribution
                            </Typography>
                            <LineGraph /> {/* This can be a line or bar graph showing GPA distribution */}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Gender Analysis */}
                <Grid item xs={12} sm={4} md={3} lg={2}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Gender Ratio
                            </Typography>
                            <PieChart /> {/* This will show the gender distribution */}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Additional cards for other analyses can be added here following the same pattern */}
            </Grid>
        </div>
    );
};

export default Dashboard;
