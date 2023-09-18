import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
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
import Grid from '@mui/material/Grid';
import {useLocation} from 'react-router-dom';
import  { useEffect} from "react";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function splitDay(str){
  const items = str.split(": ");
  const hrs = items[1].split("-");
  return(
  <>
  <Grid item xs={3}> {items[0]}: </Grid>
  <Grid item xs={4}>
    <TextField
      required
      fullWidth
      id={items[0] + "Opening"}
      label="Opening Hour"
      name={items[0]+"Opening"}
      defaultValue={hrs[0]}
      autoFocus
    />
  </Grid>
  <Grid item xs={4}>
  <TextField
      required
      fullWidth
      id={items[0]+"Closing"}
      label="Closing Hour"
      name={items[0]+"Closing"}
      defaultValue={hrs[1]}
      autoFocus
    />
  </Grid>
  </>
  )
}

export default function EditRestaurant() {
    const location = useLocation();
    const day = location.state.restaurantHours.split(",");
    const auth = useAuthUser();
    const [file, setFile] = React.useState(null);
    const handleChange1 = (newFile) => {
      setFile(newFile)
    };

    const [price, setPrice] = React.useState("");
    const handleChange = (event) => {
      setPrice(event.target.value);
    };

    useEffect(() => {
      setPrice(location.state.restaurantPrice);
    }, []);

    //Get File Image
    useEffect(() => {
      fetch(location.state.restaurantUrl)
      .then((res) => res.blob())
      .then((myBlob) => {
         setFile(new File([myBlob], location.state.restaurantName+'.jpg', {type:  "image/jpg"}));
      });
    }, []);
   

 //Compress Image
 const [open, setOpen] = React.useState(false)
 const navigate = useNavigate()
 const handleSubmit = async (event) => {
   event.preventDefault();
   const data = new FormData(event.currentTarget);
   const Monday = "Monday: "+ data.get("MondayOpening")+"-"+data.get("MondayClosing");
   const Tuesday = "Tuesday: "+data.get("TuesdayOpening")+"-"+data.get("TuesdayClosing");
   const Wednesday = "Wednesday: "+data.get("WednesdayOpening")+"-"+data.get("WednesdayClosing");
   const Thursday = "Thursday: "+data.get("ThursdayOpening")+"-"+data.get("ThursdayClosing");
   const Friday = "Friday: " + data.get("FridayOpening")+"-"+data.get("FridayClosing");
   const Saturday = "Saturday: "+data.get("SaturdayOpening")+"-"+data.get("SaturdayClosing");
   const Sunday = "Sunday: "+data.get("SundayOpening")+"-"+data.get("SundayClosing");
   const hoursString = Monday+","+Tuesday+","+Wednesday+","+Thursday
                      +","+Friday+","+ Saturday + ","+Sunday;
   data.append("restaurantHours",hoursString);
   data.append("restaurantId",location.state.restaurantId);

   const options = {
     maxSizeMB: 1,
     maxWidthOrHeight: 1920,
     useWebWorker: true,
   }
   const compressedFile = await imageCompression(file, options);
   data.append("restaurantImage",compressedFile);
      const config = {     
        headers: { 'content-type': 'multipart/form-data' ,
        'Authorization': 'Bearer ' + auth().token} //Authorization
    }
      try {
        await axios.post(
      "http://localhost:8080/restaurantController/update",data,config);
       navigate('/adminhome');
      }catch(err) {
      setOpen(true);
      
    } }

    //Post data to controller
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
            Edit Restaurant
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 , width: '30%',minWidth:350}}>

            <TextField
              required
              fullWidth
              id="restaurantName"
              label="Restaurant Name"
              name="restaurantName"
              defaultValue={location.state.restaurantName}
              autoFocus
            />
            <h5> </h5>
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
            id="restaurantType"
            label="Restaurant Type"
            name="restaurantType"
            defaultValue={location.state.restaurantType}
            autoFocus
          />
          <h5> </h5> 
          <TextField
            required
            fullWidth
            id="restaurantPhone"
            label="Restaurant Phone"
            name="restaurantPhone"
            defaultValue={location.state.restaurantPhone}
            autoFocus
          />
          <h5> </h5> 
          <TextField
            required
            fullWidth
            id="restaurantLocation"
            label="Restaurant Location"
            name="restaurantLocation"
            defaultValue={location.state.restaurantLocation}
            autoFocus
          />
          <h5> </h5>
          <TextField
          multiline
            required
            fullWidth
            id="restaurantAddress"
            label="Restaurant Address"
            name="restaurantAddress"
            defaultValue={location.state.restaurantAddress}
            autoFocus
          />
                  <h5> </h5> 
          <TextField
          multiline
            required
            fullWidth
            id="restaurantDescription"
            label="Restaurant Description"
            name="restaurantDescription"
            defaultValue={location.state.restaurantDescription}
            autoFocus
          />
            <h5> </h5> 
        <Grid container spacing={2}>
          {splitDay(day[0])}
          {splitDay(day[1])}
          {splitDay(day[2])}
          {splitDay(day[3])}
          {splitDay(day[4])}
          {splitDay(day[5])}
          {splitDay(day[6])}
         
        </Grid>
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