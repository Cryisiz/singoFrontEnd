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
import Stack from '@mui/material/Stack';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Link as aLink } from 'react-router-dom';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export default function ActivitiesDescription() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    const auth = useAuthUser();
    const nav = useNavigate();
    const location = useLocation();
    const day = location.state.activitiesHours.split(",");
    const addLineBreak = (str) =>React.Children.toArray(str.split(' ').map((subStr) => {return (<><Grid item xs={6}>{subStr}</Grid></>);}));
    const dayId = sessionStorage.getItem("storeDayId");
    const config = {     
      headers: { 'content-type': 'multipart/form-data' ,
      'Authorization': 'Bearer ' + auth().token} //Authorization
  }
    const Remove = () =>{
      const data = new FormData();
      data.append("planType","ACTIVITIES");
      data.append("planEventId",location.state.activitiesId);
      data.append("planDayId",dayId);
      axios.post("http://localhost:8080/planController/addPlan",data,config);
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
        <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={handleClickOpen}><ChangeCircleIcon/>Change</Button>
        <Button variant="outlined" onClick={Remove}><HighlightOffIcon/>Remove</Button>
        </Stack>
        <Dialog open={open} onClose={handleClose} fullWidth={true}  maxWidth={'sm'}>
        <DialogTitle>Change To</DialogTitle>
        <DialogContent>
        <Card sx={{ maxWidth: 345 }}>
      <CardActionArea component={aLink} to="/viewChangeActivities" state={{planId:location.state.planId}}>
        <CardMedia
          component="img"
          height="140"
          image="ActivitiesImage.jpg"
          alt="activitiesImage"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Activities
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea component={aLink} to="/viewChangeRestaurant" state={{planId:location.state.planId}}>
        <CardMedia
          component="img"
          height="140"
          image="RestaurantImage.jpg"
          alt="restaurantImage"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Restaurant
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
        </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}