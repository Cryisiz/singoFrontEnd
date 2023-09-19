import * as React from 'react';
import {ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Appbar from '../Component/Appbar';
import defaultTheme from '../Component/Theme';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import CardCustomer from './CardCustomer';

export default function Home() {
 
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
      <Appbar title="Home"/>
      <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
          >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <CardCustomer/>

          </Container>
          </Box>
          </Box>
    </ThemeProvider>
  );
}