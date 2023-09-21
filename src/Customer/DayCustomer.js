import * as React from 'react';
import {ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import defaultTheme from '../Component/Theme';
import CssBaseline from '@mui/material/CssBaseline';
import CardDay from './CardDay';
import Appbar from '../Component/Appbar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {useLocation} from 'react-router-dom';

export default function DayCustomer() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Appbar title = "Home"/>
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
          <CardDay />
            </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}