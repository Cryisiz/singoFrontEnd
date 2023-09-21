import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import {blue} from '@mui/material/colors';
import axios from "axios";
import  { useEffect, useState } from "react";
import {useAuthUser} from 'react-auth-kit'
import { useNavigate } from 'react-router-dom';


function Day(props){
  const nav = useNavigate();
  const storeId = ()=>{
    sessionStorage.setItem("storeDayId", props.dayId);
    sessionStorage.setItem("storeDayName", props.dayName);
    nav("/viewItinerary");
  }
  return(    <Grid item xs={12} sm={6} md={4}>
    <Card sx={{ maxWidth: 400,minWidth:300 }} >
    <CardActionArea onClick={storeId}>
        <CardMedia
          component="img"
          height="200"
          image= "DayPhoto.jpg"
          alt="Day"
        />
        <CardContent>
        <Grid container justify="space-between">
        <Grid item xs>
          <Typography  variant="h5" align="left">
           Day {props.dayName} 
           </Typography>
           </Grid>
           <Grid item xs>
          <Typography  variant="h5" align="right">
            {props.dayDate}
          </Typography>
          </Grid>
          </Grid>
        </CardContent>
        </CardActionArea>
    </Card>
    </Grid>  

  ) ;
}

export default function CardDay() {
    
    const auth = useAuthUser()
    const [dayData, setDayData] = useState([]);
    const itineraryId = sessionStorage.getItem("storeItineraryId");

    //Authorization
    const authHeader = {     
      headers: { 
      'Authorization': 'Bearer ' + auth().token}
  }
  
    // make the fetch the first time your component mounts
    useEffect(() => {
      const data = new FormData();
      data.append("dayItineraryId",itineraryId);
      axios.post("http://localhost:8080/dayController/getAll",data,authHeader)
      .then(response => setDayData(response.data));
    }, []);
  return (
    <Grid
    container
    spacing={4}
    justify="center"
  >
    {dayData.map((day) => <Day key={day.dayId} dayId = {day.dayId} dayName= {day.dayName} dayDate={day.dayDate} 
    dayLocation={day.dayItineraryId} />)}
    </Grid>

  );
}