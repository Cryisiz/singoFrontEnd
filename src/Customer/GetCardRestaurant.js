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
import { Link as aLink } from 'react-router-dom';

export default function Restaurant(props){
    return(    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ maxWidth: 400,minWidth:300 }} >
      <CardActionArea component={aLink} to="/addRestaurant" state={{ restaurantId: props.restaurantId,
      restaurantName: props.restaurantName, restaurantType:props.restaurantType, 
      restaurantLocation:props.restaurantLocation, restaurantPrice:props.restaurantPrice,
      restaurantUrl:props.restaurantUrl,restaurantAddress:props.restaurantAddress,restaurantDescription:props.restaurantDescription,
      restaurantPhone:props.restaurantPhone,restaurantHours:props.restaurantHours}}>
          <CardMedia
            component="img"
            height="200"
            image= {props.restaurantUrl}
            alt={props.restaurantName}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {props.planName}. {props.restaurantName}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="span">  
             <Grid container rowSpacing={0} columnSpacing={2}>
        <Grid item sx = {{ display: "flex", alignItems: "center" }}>
    <DinnerDiningIcon style={{ color: blue[500] }}/> {props.restaurantType} 
        </Grid>
          <Grid item sx = {{ display: "flex", alignItems: "center" }}>
              <PlaceIcon style={{ color: blue[500] }}/> {props.restaurantLocation}
            </Grid>
            <Grid item sx = {{ display: "flex", alignItems: "center" }}>
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