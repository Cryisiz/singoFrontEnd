import * as React from 'react';
import Grid from '@mui/material/Grid';
import axios from "axios";
import  { useEffect, useState } from "react";
import {useAuthUser} from 'react-auth-kit'
import GetCardActivities from './GetCardActivities';
import GetCardHotel from './GetCardHotel';

  function Activities(props){
    const auth = useAuthUser()
    const [activitiesData, setActivitiesData] = useState([]);
    //Authorization
    const authHeader = {     
      headers: { 
      'Authorization': 'Bearer ' + auth().token}
  }    
    const data = new FormData();
    data.append("activitiesId",props.planEventId);
    axios.post("http://localhost:8080/activitiesController/getActivities",data,authHeader).then(response => setActivitiesData(response.data));
    return( 
        <>
        {activitiesData.map((activities) => <GetCardActivities key={activities.activitiesId} activitiesId = {activities.activitiesId} activitiesName= {activities.activitiesName} activitiesType={activities.activitiesType} 
    activitiesLocation={activities.activitiesLocation} activitiesPrice={activities.activitiesPrice} activitiesUrl={activities.activitiesUrl}
    activitiesAddress={activities.activitiesAddress} activitiesDescription={activities.activitiesDescription} activitiesHours={activities.activitiesHours}
    activitiesPhone={activities.activitiesPhone}
    />)}   
    </>
    ) ;
  }

  function Restaurant(props) {
  
    const auth = useAuthUser()
    const [restaurantData, setRestaurantData] = useState([]);

    //Authorization
    const authHeader = {     
      headers: { 
      'Authorization': 'Bearer ' + auth().token}
  }

    const data = new FormData();
    data.append("restaurantId",props.planEventId);
    axios.get("http://localhost:8080/restaurantController/getAll",data,authHeader).then(response => setRestaurantData(response.data));
  return (
    <>
    {restaurantData.map((restaurant) => <Restaurant key={restaurant.restaurantId} restaurantId = {restaurant.restaurantId} restaurantName= {restaurant.restaurantName} restaurantType={restaurant.restaurantType} 
    restaurantLocation={restaurant.restaurantLocation} restaurantPrice={restaurant.restaurantPrice} restaurantUrl={restaurant.restaurantUrl}
    restaurantAddress={restaurant.restaurantAddress} restaurantDescription={restaurant.restaurantDescription} restaurantHours={restaurant.restaurantHours}
    restaurantPhone={restaurant.restaurantPhone}
    />)}
    </>
  );
}

export default function CardItinerary() {

    const auth = useAuthUser()
    const [hotelData, setHotelData] = useState([]);
    const [dayData, setDayData] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [planData, setPlanData] = useState([]);
    const dayId = sessionStorage.getItem("storeDayId");

    //Authorization
    const authHeader = {     
      headers: { 
      'Authorization': 'Bearer ' + auth().token}
  }
    // fetch first time  component mounts
    useEffect(() => { 
      const data = new FormData();
      data.append("dayId",dayId);
      axios.post("http://localhost:8080/dayController/getDay",data,authHeader).then(response =>{ 
        setDayData(response.data);setIsFetched(true);})
    }, []);

    useEffect(() => {
        if (isFetched){
        const data1 = new FormData();
        data1.append("hotelId",dayData.dayHotelId);
        axios.post("http://localhost:8080/hotelController/getHotel",data1,authHeader).then(response => setHotelData(response.data));
        }
      }, [isFetched]);
    
    useEffect(() => {
        const data = new FormData();
        data.append("dayId",dayId);
        axios.post("http://localhost:8080/planController/getAll",data,authHeader).then(response =>setPlanData(response.data))
      }, []);
  

  return (
    <Grid
    container
    spacing={4}
    justify="center"
  >
    {hotelData.map((hotel) => <GetCardHotel key={hotel.hotelId} hotelId = {hotel.hotelId} hotelName= {hotel.hotelName} hotelStar={hotel.hotelStar} 
    hotelLocation={hotel.hotelLocation} hotelPrice={hotel.hotelPrice} hotelUrl={hotel.hotelUrl}
    hotelAddress={hotel.hotelAddress} hotelDescription={hotel.hotelDescription} hotelHours={hotel.hotelHours}
    hotelPhone={hotel.hotelPhone}
    />)}

    {planData.map((plan) => {
        if(plan.planType === "ACTIVITIES"){
        return <Activities key={plan.planId} planId={plan.planId} planType={plan.planType} planEventId={plan.planEventId} planDayId={plan.planDayId}/>
        }else if(plan.planType === "HOTEL"){
            return <Restaurant key={plan.planId} planId={plan.planId} planType={plan.planType} planEventId={plan.planEventId} planDayId={plan.planDayId}/>
        }
    }
)}
    </Grid>

  );
}