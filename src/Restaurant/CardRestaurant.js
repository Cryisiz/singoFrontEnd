import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import PlaceIcon from '@mui/icons-material/Place';
import PaidIcon from '@mui/icons-material/Paid';
import {blue} from '@mui/material/colors';
import axios from "axios";
import  { useEffect, useState } from "react";
import {useAuthUser} from 'react-auth-kit'

function Restaurant(props){
  return(    <Grid item xs={12} sm={6} md={4}>
    <Card sx={{ maxWidth: 400,minWidth:300 }} >
    <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image= {props.restaurantUrl}
          alt={props.restaurantName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {props.restaurantName}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
}}>        <DinnerDiningIcon style={{ color: blue[500] }}/> {props.restaurantType} &ensp;
            <PlaceIcon style={{ color: blue[500] }}/> {props.restaurantLocation} &ensp;
            <PaidIcon style={{ color: blue[500] }}/>  {props.restaurantPrice}
          </Typography>
        </CardContent>
        </CardActionArea>
    </Card>
    </Grid>  

  ) ;
}

export default function CardRestaurant() {
  
    const auth = useAuthUser()
    const [restaurantData, setRestaurantData] = useState([]);

    //Authorization
    const authHeader = {     
      headers: { 
      'Authorization': 'Bearer ' + auth().token}
  }
  
    // make the fetch the first time your component mounts
    useEffect(() => {
      axios.get("http://localhost:8080/restaurantController/getAll",authHeader).then(response => setRestaurantData(response.data));
    }, []);
  return (
    <Grid
    container
    spacing={4}
    justify="center"
  >
    {restaurantData.map((restaurant) => <Restaurant key={restaurant.restaurantId} restaurantName= {restaurant.restaurantName} restaurantType={restaurant.restaurantType} 
    restaurantLocation={restaurant.restaurantLocation} restaurantPrice={restaurant.restaurantPrice} restaurantUrl={restaurant.restaurantUrl}/>)}
    </Grid>

  );
}