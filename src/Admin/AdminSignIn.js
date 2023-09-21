import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { Link as aLink } from 'react-router-dom';
import { useSignIn} from 'react-auth-kit'
import {Navigate, useNavigate} from 'react-router-dom'
import Alert from '@mui/material/Alert';
import axios, { AxiosError } from "axios";
import Copyright from "../Component/Copyright";
import defaultTheme from '../Component/Theme';


export default function AdminSignIn() {
  const [open, setOpen] = React.useState(false)
  const signIn = useSignIn()
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user ={email:data.get('email'),password:data.get('password'),role:'ADMIN'}
    try {
    const res = await axios.post(
    "http://localhost:8080/auth/authenticate",user);
    signIn({
      token: res.data.access_token,
      tokenType: 'Bearer',   
      authState: {name: data.get('email'),role:'ADMIN',token:res.data.access_token},
      expiresIn: 1440 
    }).then(
      navigate('/adminhome'));
    }catch(err) {
    setOpen(true);
  }
  
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Admin Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {open && (
              <Alert severity="error">Email Or Password Incorrect!</Alert>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link component={aLink} to="/" variant="body2">
                    User Login
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
