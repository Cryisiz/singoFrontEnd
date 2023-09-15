import * as React from 'react';
import {ThemeProvider } from '@mui/material/styles';
import defaultTheme from '../Component/Theme';
import CssBaseline from '@mui/material/CssBaseline';
import Appbar from '../Component/Appbar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import {useLocation} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import AttractionsIcon from '@mui/icons-material/Attractions';
import PlaceIcon from '@mui/icons-material/Place';
import PaidIcon from '@mui/icons-material/Paid';
import {blue} from '@mui/material/colors';

export default function AddActivities() {
    const location = useLocation();
    const addLineBreak = (str) =>str.split(' ').map((subStr) => {return (<><Grid Item xs={6}>{subStr}</Grid></>);});
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Appbar title = "Add Activities"/>
        <Box
          component="main"
          sx={{
            backgroundcolor: 'background.paper',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >  
           <Toolbar />
           <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}>
           <Grid container sx={{ display: 'flex', alignItems: 'center',width: '50%',minWidth:350 }} spacing={2}>
            <Grid sx={{ minWidth:350 }}>
           <img src={location.state.activitiesUrl} alt={location.state.activitiesName} height='250' width='350'/>
           <Grid container rowSpacing={0} columnSpacing={2}  sx={{ width:350 }}>
      <Grid item >
        <AttractionsIcon style={{ color: blue[500] }}/> {location.state.activitiesType} 
      </Grid>
        <Grid item >
            <PlaceIcon style={{ color: blue[500] }}/> {location.state.activitiesLocation}
          </Grid>
          <Grid item>
            <PaidIcon style={{ color: blue[500] }}/> SGD {location.state.activitiesPrice}
          </Grid>
          </Grid>
          </Grid>
          <Grid item xs={6} sx={{ minWidth:350 }}>         
            <Typography component="h2" variant="h5">
              {location.state.activitiesName}
            </Typography>
            <Typography variant="subtitle1" paragraph>
            <Grid container>
            <Grid Item xs={6}>Address: </Grid><Grid Item xs={6}>{location.state.activitiesAddress}</Grid>
            <Grid Item xs={6}> Phone: </Grid> <Grid Item xs={6}>{location.state.activitiesPhone}</Grid>
              {(addLineBreak(location.state.activitiesHours))}
              </Grid>
            </Typography>
          </Grid>
          {location.state.activitiesDescription}
        </Grid>
        
        </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}