import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import {blue} from '@mui/material/colors';
import axios from "axios";
import  { useEffect, useState } from "react";
import {useAuthUser} from 'react-auth-kit'
import { Link as aLink } from 'react-router-dom';
import MapIcon from '@mui/icons-material/Map';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useNavigate} from 'react-router-dom'

function Itinerary(props){
        //dialog
        const [open, setOpen] = React.useState(false);

        const handleClickOpen = () => {
          setOpen(true);
        };
    
        const handleClose = () => {
          setOpen(false);
        };
        const [open1, setOpen1] = React.useState(false);

        const handleClickOpen1 = () => {
          setOpen1(true);
        };
    
        const handleClose1 = () => {
          setOpen1(false);
        };
        const auth = useAuthUser()
        const navigate = useNavigate()
        //Authorization
        const authHeader = {     
          headers: { 
          'Authorization': 'Bearer ' + auth().token}
      }
    //Update Itinerary
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.append("itineraryId",props.itineraryId);
        data.append("itineraryEmail",props.itineraryEmail);
        axios.post("http://localhost:8080/itineraryController/update",data,authHeader);
        window.location.reload(); 
      }

    //Add User
    const handleSubmit1 = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.append("itineraryId",props.itineraryId)
        axios.post("http://localhost:8080/itineraryController/addUser",data,authHeader);
        window.location.reload(); 
      }

    //Delete
    const remove = (id) =>{
        const data = new FormData();
        data.append("itineraryId",id);
        axios.post("http://localhost:8080/itineraryController/delete",data,authHeader);
        window.location.reload(); 
      }
      const storeId = ()=>{
        sessionStorage.setItem("storeItineraryId", props.itineraryId);
        navigate("/dayCustomer");
      }
  return( 
    <Grid item xs={12} sm={6} md={4}>
    <Card sx={{ maxWidth: 400, minWidth: 300 }}>
      <CardActionArea onClick={storeId}>
        <CardMedia
          component="img"
          height="200"
          image="../../SingaporePhoto.png"
          alt="SingaporePhoto" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ display: "flex", alignItems: "center" }}>
            <MapIcon style={{ color: blue[500] }} /> &nbsp;
            {props.itineraryName}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button color="primary" onClick={handleClickOpen}>
          Edit
        </Button>
        <Button  color="primary" onClick={()=>remove(props.itineraryId)}>
          Delete
        </Button>
        <Button color="primary" onClick={handleClickOpen1}>
          Add User
        </Button>
      <Dialog open={open} onClose={handleClose}fullWidth={true}  maxWidth={'sm'} component="form" onSubmit={handleSubmit}>
        
    <DialogTitle>Edit Itinerary</DialogTitle>
    <DialogContent  >
    <DialogContentText>
        Itinerary Name
      </DialogContentText>
    <TextField
          required
          id="itineraryName"
          name="itineraryName"
          defaultValue={props.itineraryName}
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
        defaultValue={props.itineraryStart}
        required />
      <DialogContentText>
        <br/>
        End Date
      </DialogContentText>
      <TextField
        id="itineraryEnd"
        type="date"
        name="itineraryEnd" 
        defaultValue={props.itineraryEnd}
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
        defaultValue={props.itineraryAdult}
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
        defaultValue={props.itineraryChild}
        required
      />
      
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button type="submit">Confirm</Button>
    </DialogActions>
  </Dialog>
  <Dialog open={open1} onClose={handleClose1}fullWidth={true}  maxWidth={'sm'} component="form" onSubmit={handleSubmit1}>
        
        <DialogTitle>Add User</DialogTitle>
        <DialogContent  >
        <DialogContentText>
            User Email
          </DialogContentText>
        <TextField
              required
              id="addUserEmail"
              name="addUserEmail"
              autoFocus
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Cancel</Button>
          <Button type="submit">Confirm</Button>
        </DialogActions>
      </Dialog>
    </Card>
    </Grid>  
  ) ;
}

export default function AllCardCustomer() {

    const auth = useAuthUser()
    const [itineraryData, setItineraryData] = useState([]);

    //Authorization
    const authHeader = {     
      headers: { 
      'Authorization': 'Bearer ' + auth().token}
  }
  
    // fetch first time  component mounts
    useEffect(() => {
        const data = new FormData();
        data.append("itineraryEmail",auth().name)
      axios.post("http://localhost:8080/itineraryController/getAll",data,authHeader).then(response => setItineraryData(response.data));
    }, []);
  return (
    <>
      {itineraryData.map((itinerary) => <Itinerary key={itinerary.itineraryId} itineraryId={itinerary.itineraryId} itineraryName={itinerary.itineraryName} 
        itineraryStart={itinerary.itineraryStart} itineraryEnd={itinerary.itineraryEnd} itineraryAdult={itinerary.itineraryAdult} 
        itineraryChild={itinerary.itineraryChild} itineraryEmail={itinerary.itineraryEmail} />)}

</>
     );
}