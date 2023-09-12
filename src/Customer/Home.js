import * as React from 'react';
import {ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Copyright from '../Component/Copyright';
import Appbar from '../Component/Appbar';
import defaultTheme from '../Component/Theme';

export default function Home() {
 
  return (
    <ThemeProvider theme={defaultTheme}>
      <Appbar title = "Home"/>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>

            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>

    </ThemeProvider>
  );
}