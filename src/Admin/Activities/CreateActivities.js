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

export default function CreateActivities() {

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
   data.append("activitiesImage",compressedFile);
      const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }
      try {
        await axios.post(
      "http://localhost:8080/activitiesController/add",data,config);
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
            Create Activities
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 , width: '30%',minWidth:300}}>

            <TextField
              required
              fullWidth
              id="activitiesName"
              label="Activities Name"
              name="activitiesName"
              autoFocus
            />
            <h5> </h5> 
          <TextField
            required
            fullWidth
            id="activitiesType"
            label="Activities Type"
            name="activitiesType"
            autoFocus
          />
         <h5> </h5> 
          <TextField
            required
            fullWidth
            id="activitiesLocation"
            label="Activities Location"
            name="activitiesLocation"
            autoFocus
          />
           <h5> </h5> 
          <InputLabel id="activitiesPrice">Price</InputLabel>
          <OutlinedInput
            id="activitiesPrice"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            name="activitiesPrice"
            required
          />
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