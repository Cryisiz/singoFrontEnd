import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import  CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import HotelIcon from '@mui/icons-material/Hotel';
import SnowboardingIcon from '@mui/icons-material/Snowboarding';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate} from 'react-router-dom'

export default function CardHotel() {

  const navigate = useNavigate()

  return (
    <Grid
    container
    spacing={4}
    justify="center"
  >
    <Grid item xs={12} sm={6} md={4}>
    <Card variant="outlined" sx={{ maxWidth: 400,minWidth:300 }} >
    <CardContent>
      <Typography variant="h5" component="div" style={{ textAlign: 'center' }}>
       <HotelIcon/> Hotel
      </Typography>
    </CardContent>
    <CardActions>
      <Button variant="outlined" onClick={()=>(navigate("/createhotel"))}><AddIcon/>Create</Button>
      <Button variant="outlined" onClick={()=>(navigate("/editViewHotel"))}><CreateIcon/>Edit</Button>
      <Button variant="outlined" onClick={()=>(navigate("/deleteHotel"))}><DeleteForeverIcon/>Delete</Button>
    </CardActions>
    </Card>
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
    <Card variant="outlined" sx={{ maxWidth: 400,minWidth:300 }} >
    <CardContent>
      <Typography variant="h5" component="div" style={{ textAlign: 'center' }}>
       <RestaurantIcon/> Restaurant
      </Typography>
    </CardContent>
    <CardActions>
      <Button variant="outlined" onClick={()=>(navigate("/createRestaurant"))}><AddIcon/>Create</Button>
      <Button variant="outlined" onClick={()=>(navigate("/editViewRestaurant"))}><CreateIcon/>Edit</Button>
      <Button variant="outlined" onClick={()=>(navigate("/deleteRestaurant"))}><DeleteForeverIcon/>Delete</Button>
    </CardActions>
    </Card>
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
    <Card variant="outlined" sx={{ maxWidth: 400,minWidth:300 }} >
    <CardContent>
      <Typography variant="h5" component="div" style={{ textAlign: 'center' }}>
       <SnowboardingIcon/> Activities
      </Typography>
    </CardContent>
    <CardActions>
      <Button variant="outlined" onClick={()=>(navigate("/createActivities"))}><AddIcon/>Create</Button>
      <Button variant="outlined" onClick={()=>(navigate("/editViewActivities"))}><CreateIcon/>Edit</Button>
      <Button variant="outlined" onClick={()=>(navigate("/deleteActivities"))}><DeleteForeverIcon/>Delete</Button>
    </CardActions>
    </Card>
    </Grid>
    
    </Grid>

);
}