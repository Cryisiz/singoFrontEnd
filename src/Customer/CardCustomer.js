import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import {blue} from '@mui/material/colors';
import axios from "axios";
import {useAuthUser} from 'react-auth-kit'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useNavigate} from 'react-router-dom'
import AllCardCustomer from "./AllCardCustomer";

export default function CardCustomer() {

    //dialog
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    const navigate = useNavigate()
    const auth = useAuthUser()

    //Authorization
    const authHeader = {     
      headers: { 
      'Authorization': 'Bearer ' + auth().token}
  }
    //Add Itinerary
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      data.append("itineraryEmail",auth().name)
      axios.post("http://localhost:8080/itineraryController/add",data,authHeader);
      window.location.reload(); 
    }

  return (
  <Grid
      container
      spacing={4}
      justify="center"
    >
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ maxWidth: 400, minWidth: 300 }}>
          <CardActionArea onClick={handleClickOpen}>
            <CardMedia
              component="img"
              height="200"
              image="../../SingaporePhoto.png"
              alt="SingaporePhoto" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{ display: "flex", alignItems: "center" }}>
                <AddCircleOutlineIcon style={{ color: blue[500] }} /> &nbsp;
                Create New Itinerary
              </Typography>
            </CardContent>
          </CardActionArea>

          <Dialog open={open} onClose={handleClose}fullWidth={true}  maxWidth={'sm'} validate component="form" onSubmit={handleSubmit}>
            
        <DialogTitle>New Itinerary</DialogTitle>
        <DialogContent  >
        <DialogContentText>
            Itinerary Name
          </DialogContentText>
        <TextField
              required
              id="itineraryName"
              name="itineraryName"
              autoFocus
            />
        <DialogContentText>
        <br/>
            Start Date
          </DialogContentText>
          <TextField
            id="itineraryStart"
            type="date"
            name="itineraryStart"
            required />
          <DialogContentText>
            <br/>
            End Date
          </DialogContentText>
          <TextField
            id="itineraryEnd"
            type="date"
            name="itineraryEnd" 
            required/>

          <DialogContentText>
          <br/>
           Number of Adult
          </DialogContentText>
          <TextField
            type ="number"
            autoFocus
            id="itineraryAdult"
            name="itineraryAdult"
            defaultValue={0}
            required
          />
          <DialogContentText>
          <br/>
           Number of Children
          </DialogContentText>
          <TextField
            type ="number"
            autoFocus
            id="itineraryChild"
            name="itineraryChild"
            defaultValue={0}
            required
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
        </Card>

      </Grid>
      <AllCardCustomer/>
    </Grid> 
    
     );
}