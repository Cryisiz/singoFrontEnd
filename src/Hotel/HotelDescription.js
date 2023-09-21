import * as React from 'react';
import {ThemeProvider } from '@mui/material/styles';
import defaultTheme from '../Component/Theme';
import CssBaseline from '@mui/material/CssBaseline';
import Appbar from '../Component/ItineraryAppbar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import {useLocation} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import {blue} from '@mui/material/colors';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import PlaceIcon from '@mui/icons-material/Place';
import PaidIcon from '@mui/icons-material/Paid';
import {useAuthUser} from 'react-auth-kit'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link as aLink } from 'react-router-dom';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import Stack from '@mui/material/Stack';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function HotelDescription() {

    const auth = useAuthUser();
    const nav = useNavigate();
    const location = useLocation();
    const day = location.state.hotelHours.split(",");
    const addLineBreak = (str) =>React.Children.toArray(str.split(' ').map((subStr) => {return (<><Grid item xs={6}>{subStr}</Grid></>);}));
    const dayId = sessionStorage.getItem("storeDayId");
    const config = {     
      headers: { 'content-type': 'multipart/form-data' ,
      'Authorization': 'Bearer ' + auth().token} //Authorization
  }
  const Remove = async() =>{
    const data = new FormData();
    data.append("dayId",dayId);
    await axios.post("http://localhost:8080/dayController/deleteHotel",data,config);
    nav("/viewItinerary");
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Appbar title = "Hotel"/>
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
           <img src={location.state.hotelUrl} alt={location.state.hotelName} height='250' width='350'/>
           <Grid container rowSpacing={0} columnSpacing={2} sx={{width:350}} >
              <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <StarIcon style={{ color: blue[500] }}/> {location.state.hotelStar} star
            </Grid>
            <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <PlaceIcon style={{ color: blue[500] }}/> {location.state.hotelLocation} 
            </Grid>
        <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <PaidIcon style={{ color: blue[500] }}/> SGD {location.state.hotelPrice}
            </Grid>
          </Grid>
          </Grid>
          <Grid item xs={6} sx={{ minWidth:350 }}>         
            <Typography component="span" variant="h5">
              {location.state.hotelName}
            </Typography>
            <Typography variant="subtitle1" paragraph component="span">
            <Grid container>
            <Grid item xs={3}>Address: </Grid><Grid item xs={9}>{location.state.hotelAddress}</Grid>
            <Grid item xs={6}> Phone: </Grid> <Grid item xs={6}>{location.state.hotelPhone}</Grid>
              {(addLineBreak(day[0]))}
              {(addLineBreak(day[1]))}
              </Grid>
            </Typography>
          </Grid>
          {location.state.hotelDescription}
        </Grid>
        <Stack spacing={2} direction="row">
        <Button variant="outlined" component={aLink} to="/viewHotel"><ChangeCircleIcon/>Change</Button>
        <Button variant="outlined" onClick={Remove}><HighlightOffIcon/>Remove</Button>
        </Stack>
        </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}