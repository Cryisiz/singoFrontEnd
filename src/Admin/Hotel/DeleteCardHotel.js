import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import PlaceIcon from '@mui/icons-material/Place';
import PaidIcon from '@mui/icons-material/Paid';
import {blue} from '@mui/material/colors';
import axios from "axios";
import  { useEffect, useState } from "react";
import {useAuthUser} from 'react-auth-kit'
import { useNavigate} from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star';

function Hotel(props){
  DeleteCardHotel();
  return(    <Grid item xs={12} sm={6} md={4}>
    <Card sx={{ maxWidth: 400,minWidth:300 }} >
    <CardActionArea onClick={()=>DeleteCardHotel.Delete(props.hotelId)} >
        <CardMedia
          component="img"
          height="200"
          image= {props.hotelUrl}
          alt={props.hotelName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="span">
          {props.hotelName}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="span">            <Grid container rowSpacing={0} columnSpacing={2} >
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

export default function DeleteCardHotel() {
  
    const auth = useAuthUser()
    const [hotelData, setHotelData] = useState([]);
    const navigate = useNavigate()

    //Authorization
    const authHeader = {     
      headers: { 
      'Authorization': 'Bearer ' + auth().token}
  }
  
    // fetch first time  component mounts
    useEffect(() => {
      axios.get("http://localhost:8080/hotelController/getAll",authHeader).then(response => setHotelData(response.data));
    }, []);

    const Delete = async(id) =>{

      const data = new FormData();
      data.append("hotelId",id);
      await axios.post("http://localhost:8080/hotelController/delete",data,authHeader);
      navigate("/adminHome");
    }
    DeleteCardHotel.Delete= Delete;

  return (
    <Grid
    container
    spacing={4}
    justify="center"
  >
    {hotelData.map((hotel) => <Hotel key= {hotel.hotelId} hotelId = {hotel.hotelId} hotelName= {hotel.hotelName} 
    hotelStar={hotel.hotelStar} hotelLocation={hotel.hotelLocation} hotelPrice={hotel.hotelPrice} hotelUrl={hotel.hotelUrl}
    hotelAddress={hotel.hotelAddress} hotelDescription={hotel.hotelDescription} hotelHours={hotel.hotelHours}
    hotelPhone={hotel.hotelPhone}
    /> ) }
    </Grid>

  );
}