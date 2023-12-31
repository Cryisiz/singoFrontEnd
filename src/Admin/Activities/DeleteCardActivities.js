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
import {useAuthUser} from 'react-auth-kit'
import { useNavigate} from 'react-router-dom'

function Activities(props){
  DeleteCardActivities();
  return(    <Grid item xs={12} sm={6} md={4}>
    <Card sx={{ maxWidth: 400,minWidth:300 }} >
    <CardActionArea onClick={()=>DeleteCardActivities.Delete(props.activitiesId)} >
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
      <Grid item sx={{ display: "flex", alignItems: "center" }}>
  <AttractionsIcon style={{ color: blue[500] }}/> {props.activitiesType} 
      </Grid>
        <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <PlaceIcon style={{ color: blue[500] }}/> {props.activitiesLocation}
          </Grid>
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
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

export default function DeleteCardActivities() {
  
    const auth = useAuthUser()
    const [activitiesData, setActivitiesData] = useState([]);
    const navigate = useNavigate()

    //Authorization
    const authHeader = {     
      headers: { 
      'Authorization': 'Bearer ' + auth().token}
  }
  
    // fetch first time  component mounts
    useEffect(() => {
      axios.get("http://localhost:8080/activitiesController/getAll",authHeader).then(response => setActivitiesData(response.data));
    }, []);

    const Delete = async(id) =>{

      const data = new FormData();
      data.append("activitiesId",id);
      await axios.post("http://localhost:8080/activitiesController/delete",data,authHeader);
      navigate("/adminHome");
    }
    DeleteCardActivities.Delete= Delete;

  return (
    <Grid
    container
    spacing={4}
    justify="center"
  >
    {activitiesData.map((activities) => <Activities key= {activities.activitiesId} activitiesId = {activities.activitiesId} activitiesName= {activities.activitiesName} 
    activitiesType={activities.activitiesType} activitiesLocation={activities.activitiesLocation} activitiesPrice={activities.activitiesPrice} activitiesUrl={activities.activitiesUrl}
    activitiesAddress={activities.activitiesAddress} activitiesDescription={activities.activitiesDescription} activitiesHours={activities.activitiesHours}
    activitiesPhone={activities.activitiesPhone}
    /> ) }
    </Grid>

  );
}