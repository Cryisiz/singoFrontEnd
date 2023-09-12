import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import AttractionsIcon from '@mui/icons-material/Attractions';
import PlaceIcon from '@mui/icons-material/Place';
import PaidIcon from '@mui/icons-material/Paid';
import {blue} from '@mui/material/colors';
import axios from "axios";
import  { useEffect, useState } from "react";

function Activities(props){
  return(    <Grid item xs={12} sm={6} md={4}>
    <Card sx={{ maxWidth: 400,minWidth:300 }} >
    <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image= {props.activitiesUrl}
          alt={props.activitiesName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {props.activitiesName}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
}}>        <AttractionsIcon style={{ color: blue[500] }}/> {props.activitiesType} &ensp;
            <PlaceIcon style={{ color: blue[500] }}/> {props.activitiesLocation} &ensp;
            <PaidIcon style={{ color: blue[500] }}/> SGD {props.activitiesPrice}
          </Typography>
        </CardContent>
        </CardActionArea>
    </Card>
    </Grid>  

  ) ;
}

export default function CardActivities() {

    const [activitiesData, setActivitiesData] = useState([]);
  
    // make the fetch the first time your component mounts
    useEffect(() => {
      axios.get("http://localhost:8080/activitiesController/getAll").then(response => setActivitiesData(response.data));
    }, []);
  return (
    <Grid
    container
    spacing={4}
    justify="center"
  >
    {activitiesData.map((activities) => <Activities key={activities.activitiesId} activitiesName= {activities.activitiesName} activitiesType={activities.activitiesType} 
    activitiesLocation={activities.activitiesLocation} activitiesPrice={activities.activitiesPrice} activitiesUrl={activities.activitiesUrl}/>)}
    </Grid>

  );
}