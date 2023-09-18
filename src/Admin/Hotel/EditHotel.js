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
import {useLocation} from 'react-router-dom';
import  { useEffect} from "react";

export default function EditHotel() {
  const location = useLocation();
  const day = location.state.hotelHours.split(",");
  const items1 = day[0].split(": ");
  const items2 = day[1].split(": ");
  const auth = useAuthUser()
  const [star, setStar] = React.useState("");
  const handleChange = (event) => {
    setStar(event.target.value);
  };
    const [file, setFile] = React.useState(null)
    const handleChange1 = (newFile) => {
      setFile(newFile)
    }

    //Set default star
    useEffect(() => {
    setStar(location.state.hotelStar);
    }, []);
    //Get File Image
    useEffect(() => {
      fetch(location.state.hotelUrl)
      .then((res) => res.blob())
      .then((myBlob) => {
          setFile(new File([myBlob], location.state.hotelName+'.jpg', {type:  "image/jpg"}));
      });
    }, []);

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
    const hotelHrs = "Check-in: "+data.get("checkIn")+","+"Check-out: "+data.get("checkOut");
    data.append("hotelHours",hotelHrs);
    data.append("hotelId",location.state.hotelId);

      const config = {     
        headers: { 'content-type': 'multipart/form-data' ,
        'Authorization': 'Bearer ' + auth().token} //Authorization
    }

    //Post data to controller
      try {
        await axios.post(
      "http://localhost:8080/hotelController/update",data,config);
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
            Edit Hotel
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 , width: '30%',minWidth:350}}>

            <TextField
              required
              fullWidth
              id="hotelName"
              label="Hotel Name"
              name="hotelName"
              defaultValue={location.state.hotelName}
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
          <InputLabel id="hotelPrice">Price</InputLabel>
          <OutlinedInput
            id="hotelPrice"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            name="hotelPrice"
            defaultValue={location.state.hotelPrice}
            required
          />
           <h5> </h5>
           <TextField
            required
            fullWidth
            id="hotelPhone"
            label="Hotel Phone"
            name="hotelPhone"
            defaultValue={location.state.hotelPhone}
            autoFocus
          />
          <h5> </h5> 
          <TextField
            required
            fullWidth
            id="hotelLocation"
            label="Hotel Location"
            name="hotelLocation"
            defaultValue={location.state.hotelLocation}
            autoFocus
          />
          <h5> </h5>
          <TextField
          multiline
            required
            fullWidth
            id="hotelAddress"
            label="Hotel Address"
            name="hotelAddress"
            defaultValue={location.state.hotelAddress}
            autoFocus
          />
          <h5> </h5> 
          <TextField
          multiline
            required
            fullWidth
            id="hotelDescription"
            label="Hotel Description"
            name="hotelDescription"
            defaultValue={location.state.hotelDescription}
            autoFocus
          />
            <h5> </h5>
            <TextField
            required
            fullWidth
            id="checkIn"
            label="Hotel Check-in time"
            name="checkIn"
            defaultValue={items1[1]}
            autoFocus
          />
          <h5> </h5>
          <TextField
            required
            fullWidth
            id="checkOut"
            label="Hotel Check-out time"
            name="checkOut"
            defaultValue={items2[1]}
            autoFocus
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