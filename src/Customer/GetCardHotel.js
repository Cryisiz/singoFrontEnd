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
import { Link as aLink } from 'react-router-dom';

export default function GetCardHotel(props){
    return(    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ maxWidth: 400,minWidth:300 }} >
      <CardActionArea component={aLink} to="/hotelDescription" state={{ hotelId: props.hotelId,
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
            <Typography variant="body2" color="text.secondary" component="span">         
             <Grid container rowSpacing={0} columnSpacing={2} >
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