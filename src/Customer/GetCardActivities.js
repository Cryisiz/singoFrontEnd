import * as React from 'react';
import Grid from '@mui/material/Grid';
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
import { Link as aLink } from 'react-router-dom';
export default function GetCardActivities(props){

  return(    <Grid item xs={12} sm={6} md={4}>
    <Card sx={{ maxWidth: 400,minWidth:300 }} >
    <CardActionArea component={aLink} to="/addActivities" state={{ activitiesId: props.activitiesId,
    activitiesName: props.activitiesName, activitiesType:props.activitiesType, 
    activitiesLocation:props.activitiesLocation, activitiesPrice:props.activitiesPrice,
    activitiesUrl:props.activitiesUrl,activitiesAddress:props.activitiesAddress,activitiesDescription:props.activitiesDescription,
    activitiesPhone:props.activitiesPhone,activitiesHours:props.activitiesHours}}>
        <CardMedia
          component="img"
          height="200"
          image= {props.activitiesUrl}
          alt={props.activitiesName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="span">
          {props.activitiesName}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="span">  
           <Grid container rowSpacing={0} columnSpacing={2}>
      <Grid item sx = {{ display: "flex", alignItems: "center" }}>
  <AttractionsIcon style={{ color: blue[500] }}/> {props.activitiesType} 
      </Grid>
        <Grid item sx = {{ display: "flex", alignItems: "center" }}>
            <PlaceIcon style={{ color: blue[500] }}/> {props.activitiesLocation}
          </Grid>
          <Grid item sx = {{ display: "flex", alignItems: "center" }}>
            <PaidIcon style={{ color: blue[500] }}/> SGD {props.activitiesPrice}
          </Grid>
          </Grid>
          </Typography>
        </CardContent>
        </CardActionArea>
    </Card>
    </Grid>  
  ) ;
}