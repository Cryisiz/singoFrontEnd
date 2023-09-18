import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/Star';
import PlaceIcon from '@mui/icons-material/Place';
import PaidIcon from '@mui/icons-material/Paid';
import {blue} from '@mui/material/colors';
import axios from "axios";
import  { useEffect, useState } from "react";
import {useAuthUser} from 'react-auth-kit'
import { Link as aLink } from 'react-router-dom';

function Hotel(props){
  return(    <Grid item xs={12} sm={6} md={4}>
    <Card sx={{ maxWidth: 400,minWidth:300 }} >
    <CardActionArea component={aLink} to="/editHotel" state={{ hotelId: props.hotelId,
    hotelName: props.hotelName, hotelStar:props.hotelStar, 
    hotelLocation:props.hotelLocation, hotelPrice:props.hotelPrice,
    hotelUrl:props.hotelUrl,hotelAddress:props.hotelAddress,hotelDescription:props.hotelDescription,
    hotelPhone:props.hotelPhone,hotelHours:props.hotelHours}}>
        <CardMedia
          component="img"
          height="200"
          image= {props.hotelUrl}
          alt={props.hotelName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {props.hotelName}
          </Typography>
          <Typography variant="body2" color="text.secondary">         
           <Grid container rowSpacing={0} columnSpacing={2} alignItems="center">
              <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <StarIcon style={{ color: blue[500] }}/> {props.hotelStar} star
            </Grid>
            <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <PlaceIcon style={{ color: blue[500] }}/> {props.hotelLocation} 
            </Grid>
        <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <PaidIcon style={{ color: blue[500] }}/> SGD {props.hotelPrice}
            </Grid>
            </Grid>
          </Typography>
        </CardContent>
        </CardActionArea>
    </Card>
    </Grid>  

  ) ;
}

export default function EditCardHotel() {

    const auth = useAuthUser()
    const [hotelData, setHotelData] = useState([]);

    //Authorization
    const authHeader = {     
      headers: { 
      'Authorization': 'Bearer ' + auth().token}
  }
  
    // make the fetch the first time your component mounts
    useEffect(() => {
      axios.get("http://localhost:8080/hotelController/getAll",authHeader).then(response => setHotelData(response.data));
    }, []);
  return (
    <Grid
    container
    spacing={4}
    justify="center"
  >
    {hotelData.map((hotel) => <Hotel key={hotel.hotelId} hotelId = {hotel.hotelId} hotelName= {hotel.hotelName} hotelStar={hotel.hotelStar} 
    hotelLocation={hotel.hotelLocation} hotelPrice={hotel.hotelPrice} hotelUrl={hotel.hotelUrl}
    hotelAddress={hotel.hotelAddress} hotelDescription={hotel.hotelDescription} hotelHours={hotel.hotelHours}
    hotelPhone={hotel.hotelPhone}
    />)}
    </Grid>

  );
}