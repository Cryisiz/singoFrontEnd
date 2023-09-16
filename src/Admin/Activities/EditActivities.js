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
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { MuiFileInput } from 'mui-file-input'
import { useNavigate} from 'react-router-dom'
import Alert from '@mui/material/Alert';
import axios from "axios";
import imageCompression from 'browser-image-compression'
import {useAuthUser} from 'react-auth-kit'
import Grid from '@mui/material/Grid';
import {useLocation} from 'react-router-dom';
import  { useEffect} from "react";

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

export default function EditActivities() {
    const location = useLocation();
    const day = location.state.activitiesHours.split(",");
    const auth = useAuthUser();
    const [file, setFile] = React.useState(null);
    const handleChange1 = (newFile) => {
      setFile(newFile)
    };

    //Get File Image
    useEffect(() => {
      fetch(location.state.activitiesUrl)
      .then((res) => res.blob())
      .then((myBlob) => {
         setFile(new File([myBlob], location.state.activitiesName+'.jpg', {type:  "image/jpg"}));
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
   data.append("activitiesHours",hoursString);
   data.append("activitiesId",location.state.activitiesId);

   const options = {
     maxSizeMB: 1,
     maxWidthOrHeight: 1920,
     useWebWorker: true,
   }
   const compressedFile = await imageCompression(file, options);
   data.append("activitiesImage",compressedFile);
      const config = {     
        headers: { 'content-type': 'multipart/form-data' ,
        'Authorization': 'Bearer ' + auth().token} //Authorization
    }
      try {
        await axios.post(
      "http://localhost:8080/activitiesController/update",data,config);
       navigate('/adminhome');
      }catch(err) {
      setOpen(true);
      
    } }

    //Post data to controller
  return (
    <ThemeProvider theme={defaultTheme}>
        
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
          <Appbar title="Activities"/>
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
            Edit Activities
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 , width: '30%',minWidth:350}}>

            <TextField
              required
              fullWidth
              id="activitiesName"
              label="Activities Name"
              name="activitiesName"
              defaultValue={location.state.activitiesName}
              autoFocus
            />
            <h5> </h5> 
          <TextField
            required
            fullWidth
            id="activitiesType"
            label="Activities Type"
            name="activitiesType"
            defaultValue={location.state.activitiesType}
            autoFocus
          />

           <h5> </h5> 
          <InputLabel id="activitiesPrice">Activities Price</InputLabel>
          <OutlinedInput
            id="activitiesPrice"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            name="activitiesPrice"
            defaultValue={location.state.activitiesPrice}
            required
          />
          <h5> </h5> 
          <TextField
            required
            fullWidth
            id="activitiesPhone"
            label="Activities Phone"
            name="activitiesPhone"
            defaultValue={location.state.activitiesPhone}
            autoFocus
          />
          <h5> </h5> 
          <TextField
            required
            fullWidth
            id="activitiesLocation"
            label="Activities Location"
            name="activitiesLocation"
            defaultValue={location.state.activitiesLocation}
            autoFocus
          />
          <h5> </h5>
          <TextField
          multiline
            required
            fullWidth
            id="activitiesAddress"
            label="Activities Address"
            name="activitiesAddress"
            defaultValue={location.state.activitiesAddress}
            autoFocus
          />
                  <h5> </h5> 
          <TextField
          multiline
            required
            fullWidth
            id="activitiesDescription"
            label="Activities Description"
            name="activitiesDescription"
            defaultValue={location.state.activitiesDescription}
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
          <MuiFileInput placeholder="Insert image" value={file} id="activitiesImage" onChange={handleChange1} />
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