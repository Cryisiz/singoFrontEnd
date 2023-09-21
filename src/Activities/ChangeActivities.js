import * as React from 'react';
import {ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import defaultTheme from '../Component/Theme';
import CssBaseline from '@mui/material/CssBaseline';
import Appbar from '../Component/ItineraryAppbar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import {useLocation} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import AttractionsIcon from '@mui/icons-material/Attractions';
import PlaceIcon from '@mui/icons-material/Place';
import PaidIcon from '@mui/icons-material/Paid';
import {blue} from '@mui/material/colors';
import Button from '@mui/material/Button';
import {useAuthUser} from 'react-auth-kit'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

export default function ChangeActivities() {

    const auth = useAuthUser();
    const nav = useNavigate();
    const location = useLocation();
    const day = location.state.activitiesHours.split(",");
    const addLineBreak = (str) =>React.Children.toArray(str.split(' ').map((subStr) => {return (<><Grid item xs={6}>{subStr}</Grid></>);}));
    const config = {     
      headers: { 'content-type': 'multipart/form-data' ,
      'Authorization': 'Bearer ' + auth().token} //Authorization
  }
    const Change = async() =>{
      const data = new FormData();
      data.append("planType","ACTIVITIES");
      data.append("planEventId",location.state.activitiesId);
      data.append("planId",location.state.planId);
      await axios.post("http://localhost:8080/planController/changePlan",data,config);
      nav("/viewItinerary");
    }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Appbar title = "Activities"/>
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
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}>
           <Grid container sx={{ display: 'flex', alignItems: 'center',width: '50%',minWidth:350 }} spacing={2}>
            <Grid sx={{ minWidth:350 }}>
           <img src={location.state.activitiesUrl} alt={location.state.activitiesName} height='250' width='350'/>
           <Grid container rowSpacing={0} columnSpacing={2} sx={{width:350}}>
      <Grid item sx={{ display: "flex", alignItems: "center" }}>
        <AttractionsIcon style={{ color: blue[500] }}/> {location.state.activitiesType} 
      </Grid>
        <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <PlaceIcon style={{ color: blue[500] }}/> {location.state.activitiesLocation}
          </Grid>
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <PaidIcon style={{ color: blue[500] }}/> SGD {location.state.activitiesPrice}
          </Grid>
          </Grid>
          </Grid>
          <Grid item xs={6} sx={{ minWidth:350 }}>         
            <Typography component="span" variant="h5" >
              {location.state.activitiesName}
            </Typography>
            <Typography variant="subtitle1" paragraph component="span">
            <Grid container >
            <Grid item xs={3}>Address: </Grid><Grid item xs={9}>{location.state.activitiesAddress}</Grid>
            <Grid item xs={6}> Phone: </Grid> <Grid item xs={6}>{location.state.activitiesPhone}</Grid>
              {(addLineBreak(day[0]))}
              {(addLineBreak(day[1]))}
              {(addLineBreak(day[2]))}
              {(addLineBreak(day[3]))}
              {(addLineBreak(day[4]))}
              {(addLineBreak(day[5]))}
              {(addLineBreak(day[6]))}
              </Grid>
            </Typography>
          </Grid>
          {location.state.activitiesDescription}
        </Grid>
        <Button variant="outlined" onClick={Change}><ChangeCircleIcon/>Change</Button>
        </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}