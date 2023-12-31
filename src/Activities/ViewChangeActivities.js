import * as React from 'react';
import {ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import defaultTheme from '../Component/Theme';
import CssBaseline from '@mui/material/CssBaseline';
import ChangeCardActivities from './ChangeCardActivities';
import Appbar from '../Component/ItineraryAppbar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {useLocation} from 'react-router-dom';

export default function ViewChangeActivities() {
  const location = useLocation();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Appbar title = "Activities"/>
        <Box
          component="main"
          sx={{
            backgroundcolor: 'background.paper',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >  
        
           <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <ChangeCardActivities planId={location.state.planId}/>
            </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}