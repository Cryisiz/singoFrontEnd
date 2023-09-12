import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HotelIcon from '@mui/icons-material/Hotel';
import SnowboardingIcon from '@mui/icons-material/Snowboarding';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from "react-router-dom";
import {blue} from '@mui/material/colors';

export default function ListItems(){
    //Navigate
    const navigate = useNavigate()
    const navigateHotel = () => {
        navigate('/viewHotel');
    };
    const navigateActivities = () => {
        navigate('/viewActivities');
    };
    const navigateRestaurant = () => {
        navigate('/viewRestaurant');
    };

    return(
    <React.Fragment>
    <ListItemButton onClick={navigateHotel}>
      <ListItemIcon>
        <HotelIcon style={{ color: blue[500] }}/>
      </ListItemIcon>
      <ListItemText primary="Hotel"/>
    </ListItemButton>
    <ListItemButton onClick={navigateRestaurant}>
      <ListItemIcon>
        <RestaurantIcon style={{ color: blue[500] }}/>
      </ListItemIcon>
      <ListItemText primary="Restaurant" />
    </ListItemButton>
    <ListItemButton onClick={navigateActivities}>
      <ListItemIcon>
        <SnowboardingIcon style={{ color: blue[500] }}/>
      </ListItemIcon>
      <ListItemText primary="Activities" />
    </ListItemButton>
  </React.Fragment>
    )
};