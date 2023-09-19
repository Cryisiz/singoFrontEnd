import * as React from 'react';
import {ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import defaultTheme from '../Component/Theme';
import CssBaseline from '@mui/material/CssBaseline';
import Appbar from '../Component/Appbar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import {useLocation} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {blue} from '@mui/material/colors';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import PlaceIcon from '@mui/icons-material/Place';
import PaidIcon from '@mui/icons-material/Paid';

export default function AddHotel() {
    const location = useLocation();
    const day = location.state.hotelHours.split(",");
    const addLineBreak = (str) =>str.split(' ').map((subStr) => {return (<><Grid Item xs={6}>{subStr}</Grid></>);});
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Appbar title = "Add Hotel"/>
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
            <Typography component="h2" variant="h5">
              {location.state.hotelName}
            </Typography>
            <Typography variant="subtitle1" paragraph>
            <Grid container>
            <Grid Item xs={3}>Address: </Grid><Grid Item xs={9}>{location.state.hotelAddress}</Grid>
            <Grid Item xs={6}> Phone: </Grid> <Grid Item xs={6}>{location.state.hotelPhone}</Grid>
              {(addLineBreak(day[0]))}
              {(addLineBreak(day[1]))}
              </Grid>
            </Typography>
          </Grid>
          {location.state.hotelDescription}
        </Grid>
        <Button variant="outlined"><AddIcon/>Add</Button>
        </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}