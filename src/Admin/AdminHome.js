import * as React from 'react';
import {ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import defaultTheme from '../Component/Theme';
import CssBaseline from '@mui/material/CssBaseline';
import CardAdmin from '../AdminComponent/CardAdmin';
import Appbar from '../AdminComponent/AdminAppbar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export default function AdminHome() {
 
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
      <Appbar title="Admin Home"/>
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
            <CardAdmin/>

          </Container>
          </Box>
          </Box>
    </ThemeProvider>
  );
}