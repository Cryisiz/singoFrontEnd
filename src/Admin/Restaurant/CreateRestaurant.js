import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import defaultTheme from '../../Component/Theme';
import Appbar from '../../AdminComponent/AdminAppbar';
import {ThemeProvider } from '@mui/material/styles';
import { MuiFileInput } from 'mui-file-input'
import { useNavigate} from 'react-router-dom'
import Alert from '@mui/material/Alert';
import axios from "axios";
import imageCompression from 'browser-image-compression'
import {useAuthUser} from 'react-auth-kit'

export default function CreateRestaurant() {

  const auth = useAuthUser()
  const [price, setPrice] = React.useState("");
  const handleChange = (event) => {
    setPrice(event.target.value);
  };
    const [file, setFile] = React.useState(null)
    const handleChange1 = (newFile) => {
      setFile(newFile)
    }

    //Compress Image
    const [open, setOpen] = React.useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      }
      const compressedFile = await imageCompression(file, options);
      data.append("restaurantImage",compressedFile);
      const config = {     
        headers: { 'content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' + auth().token} //Authorization
    }

    //Post data to controller
      try {
        await axios.post(
      "http://localhost:8080/restaurantController/add",data,config);
       navigate('/adminhome');
      }catch(err) {
      setOpen(true);
      
    } }

  return (
    <ThemeProvider theme={defaultTheme}>
        
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
          <Appbar title="Restaurant"/>
          <Box
          component="main"
          sx={{
            backgroundcolor: 'background.paper',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            minWidth:350
          }}>
          <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}>
          <Typography component="h1" variant="h5">
            Create Restaurant
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 , width: '30%',minWidth:350}}>

            <TextField
              required
              fullWidth
              id="restaurantName"
              label="Restaurant Name"
              name="restaurantName"
              autoFocus
            />
        <InputLabel id="restaurantPrice">Price</InputLabel>
          <Select
            labelId="restaurantPrice"
            id="restaurantPrice"
            value={price}
            label="Price"
            name="restaurantPrice"
            onChange={handleChange}required
            autoFocus
          >
            <MenuItem value={'$'}>$</MenuItem>
            <MenuItem value={'$$'}>$$</MenuItem>
            <MenuItem value={'$$$'}>$$$</MenuItem>
            <MenuItem value={'$$$$'}>$$$$</MenuItem>
            <MenuItem value={'$$$$$'}>$$$$</MenuItem>
          </Select>
          <h5> </h5>
          <TextField
            required
            fullWidth
            id="restaurantLocation"
            label="Restaurant Location"
            name="restaurantLocation"
            autoFocus
          />
          <h5> </h5>
            <TextField
              required
              fullWidth
              id="restaurantType"
              label="Restaurant Type"
              name="restaurantType"
              autoFocus
            />

           <h5> </h5>
          <MuiFileInput placeholder="Insert image" value={file} id="restaurantImage" onChange={handleChange1} />
          {open && (
              <Alert severity="error">Error</Alert>
              )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            </Box>
            </Box>
          </Box>
        </Box>
    </ThemeProvider>
  );
}