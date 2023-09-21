import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSignOut } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom';
import {blue} from '@mui/material/colors'
import axios from "axios";
import {useAuthUser} from 'react-auth-kit'

export default function SignOut(){

    const auth = useAuthUser()
    //Authorization

    const signOut = useSignOut();
    const nav = useNavigate();
    const formData = new FormData();
    formData.append("Authorization", 'Bearer ' + auth().token);
    const logOut = async() =>{
      await axios.post("http://localhost:8080/auth/logout",formData);
      nav("/");
      signOut();
    }
    
    return(
    <React.Fragment>
    <ListItemButton onClick={logOut}>
      <ListItemIcon>
        <LogoutIcon style={{ color: blue[500] }}/>
      </ListItemIcon>
      <ListItemText primary="Logout"/>
    </ListItemButton>
  </React.Fragment>
    )
};