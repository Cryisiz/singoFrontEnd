import * as React from 'react';
import {ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import defaultTheme from '../../Component/Theme';
import CssBaseline from '@mui/material/CssBaseline';
import CardActivities from './EditCardActivities';
import Appbar from '../../AdminComponent/AdminAppbar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export default function EditViewActivities() {

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
          <CardActivities/>
            </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}