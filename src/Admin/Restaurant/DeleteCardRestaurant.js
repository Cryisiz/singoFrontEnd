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
import { useNavigate} from 'react-router-dom'

function Restaurant(props){
  DeleteCardRestaurant();
  return(    <Grid item xs={12} sm={6} md={4}>
    <Card sx={{ maxWidth: 400,minWidth:300 }} >
    <CardActionArea onClick={()=>DeleteCardRestaurant.Delete(props.restaurantId)} >
        <CardMedia
          component="img"
          height="200"
          image= {props.restaurantUrl}
          alt={props.restaurantName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="span">
          {props.restaurantName}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="span">   
          <Grid container rowSpacing={0} columnSpacing={2}>
      <Grid item sx={{ display: "flex", alignItems: "center" }}>
  <DinnerDiningIcon style={{ color: blue[500] }}/> {props.restaurantType} 
      </Grid>
        <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <PlaceIcon style={{ color: blue[500] }}/> {props.restaurantLocation}
          </Grid>
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <PaidIcon style={{ color: blue[500] }}/> {props.restaurantPrice}
          </Grid>
          </Grid>
          </Typography>
        </CardContent>
        </CardActionArea>
    </Card>
    </Grid>  

  ) ;
}

export default function DeleteCardRestaurant() {
  
    const auth = useAuthUser()
    const [restaurantData, setRestaurantData] = useState([]);
    const navigate = useNavigate()

    //Authorization
    const authHeader = {     
      headers: { 
      'Authorization': 'Bearer ' + auth().token}
  }
  
    // fetch first time  component mounts
    useEffect(() => {
      axios.get("http://localhost:8080/restaurantController/getAll",authHeader).then(response => setRestaurantData(response.data));
    }, []);

    const Delete = async(id) =>{

      const data = new FormData();
      data.append("restaurantId",id);
      await axios.post("http://localhost:8080/restaurantController/delete",data,authHeader);
      navigate("/adminHome");
    }
    DeleteCardRestaurant.Delete= Delete;

  return (
    <Grid
    container
    spacing={4}
    justify="center"
  >
    {restaurantData.map((restaurant) => <Restaurant key= {restaurant.restaurantId} restaurantId = {restaurant.restaurantId} restaurantName= {restaurant.restaurantName} 
    restaurantType={restaurant.restaurantType} restaurantLocation={restaurant.restaurantLocation} restaurantPrice={restaurant.restaurantPrice} restaurantUrl={restaurant.restaurantUrl}
    restaurantAddress={restaurant.restaurantAddress} restaurantDescription={restaurant.restaurantDescription} restaurantHours={restaurant.restaurantHours}
    restaurantPhone={restaurant.restaurantPhone}
    /> ) }
    </Grid>

  );
}