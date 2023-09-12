import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSignOut } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom';
import {blue} from '@mui/material/colors'

export default function SignOut(){
    const signOut = useSignOut()
    const nav = useNavigate()

    return(
    <React.Fragment>
    <ListItemButton onClick={() => {nav("/");signOut()}}>
      <ListItemIcon>
        <LogoutIcon style={{ color: blue[500] }}/>
      </ListItemIcon>
      <ListItemText primary="Logout"/>
    </ListItemButton>
  </React.Fragment>
    )
};