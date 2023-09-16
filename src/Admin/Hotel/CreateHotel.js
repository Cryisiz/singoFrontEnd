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
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { MuiFileInput } from 'mui-file-input'
import { useNavigate} from 'react-router-dom'
import Alert from '@mui/material/Alert';
import axios from "axios";
import imageCompression from 'browser-image-compression'
import {useAuthUser} from 'react-auth-kit'

export default function CreateHotel() {
  
  const auth = useAuthUser()
  const [star, setStar] = React.useState("");
  const handleChange = (event) => {
    setStar(event.target.value);
  };
    const [file, setFile] = React.useState(null)
    const handleChange1 = (newFile) => {
      setFile(newFile)
    }

    const [open, setOpen] = React.useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      //Compress Image
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }
    const compressedFile = await imageCompression(file, options);
      data.append("hotelImage",compressedFile);

      const config = {     
        headers: { 'content-type': 'multipart/form-data' ,
        'Authorization': 'Bearer ' + auth().token} //Authorization
    }

    //Post data to controller
      try {
        await axios.post(
      "http://localhost:8080/hotelController/add",data,config);
       navigate('/adminhome');
      }catch(err) {
      setOpen(true);
      
    } }

  return (
    <ThemeProvider theme={defaultTheme}>
        
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
          <Appbar title="Hotel"/>
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
            Create Hotel
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 , width: '30%',minWidth:350}}>

            <TextField
              required
              fullWidth
              id="hotelName"
              label="Hotel Name"
              name="hotelName"
              autoFocus
            />
        <InputLabel id="hotelStar">Star</InputLabel>
          <Select
            labelId="hotelStar"
            id="hotelStar"
            value={star}
            label="Star"
            name="hotelStar"
            onChange={handleChange}required
            autoFocus
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
          <h5> </h5>
          <TextField
            required
            fullWidth
            id="hotelLocation"
            label="Hotel Location"
            name="hotelLocation"
            autoFocus
          />
          <InputLabel id="hotelPrice">Price</InputLabel>
          <OutlinedInput
            id="hotelPrice"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            name="hotelPrice"
            required
          />
           <h5> </h5>
          <MuiFileInput placeholder="Insert image" value={file} id="hotelImage" onChange={handleChange1} />
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