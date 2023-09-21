import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SignOut from '../Account/SignOut';
import Copyright from './Copyright';
import HomeIcon from '@mui/icons-material/Home';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {blue} from '@mui/material/colors'
import { useNavigate } from 'react-router-dom';
import HotelIcon from '@mui/icons-material/Hotel';
import SnowboardingIcon from '@mui/icons-material/Snowboarding';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Link as aLink } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {useAuthUser} from 'react-auth-kit'

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(0),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(0),
        },
      }),
    },
  }),
);

export default function ItineraryAppbar(props) {
  const nav = useNavigate()

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const auth = useAuthUser()
  React.useEffect(() => {
    if(auth().role !=="USER"){
      nav("/");
    }
  },[]);

  return (
    <React.Fragment>
    <AppBar position="absolute" open={open}>
    <Toolbar
      sx={{
        pr: '24px', // keep right padding when drawer closed
      }}
    >
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
        sx={{
          marginRight: '36px',
          ...(open && { display: 'none' }),
        }}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1 }}
      >
        {props.title}
      </Typography>
      <IconButton color="inherit">
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Toolbar>
  </AppBar>
  <Drawer variant="permanent" open={open}>
    <Toolbar
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
      }}
    > 
      <IconButton onClick={toggleDrawer}>
        <ChevronLeftIcon />
      </IconButton>

    </Toolbar>
    <Divider />
    <List component="nav">
    <ListItemButton onClick={() => {nav("/viewItinerary");}}>
      <ListItemIcon>
        <FormatListBulletedIcon style={{ color: blue[500] }}/>
      </ListItemIcon>
      <ListItemText primary="Itinerary"/>
    </ListItemButton>
    <ListItemButton onClick={() => {nav("/dayCustomer");}}>
      <ListItemIcon>
        <CalendarTodayIcon style={{ color: blue[500] }}/>
      </ListItemIcon>
      <ListItemText primary="Day"/>
    </ListItemButton>
    <ListItemButton onClick={() => {nav("/home");}}>
      <ListItemIcon>
        <HomeIcon style={{ color: blue[500] }}/>
      </ListItemIcon>
      <ListItemText primary="Home"/>
    </ListItemButton>
    <Divider sx={{ my: 1 }} />
    <ListItemButton component={aLink} to="/viewHotel" >
      <ListItemIcon>
        <HotelIcon style={{ color: blue[500] }}/>
      </ListItemIcon>
      <ListItemText primary="Hotel"/>
    </ListItemButton>
    <ListItemButton component={aLink} to="/viewRestaurant" >
      <ListItemIcon>
        <RestaurantIcon style={{ color: blue[500] }}/>
      </ListItemIcon>
      <ListItemText primary="Restaurant" />
    </ListItemButton>
    <ListItemButton component={aLink} to="/viewActivities">
      <ListItemIcon>
        <SnowboardingIcon style={{ color: blue[500] }}/>
      </ListItemIcon>
      <ListItemText primary="Activities" />
    </ListItemButton>
      <Divider sx={{ my: 1 }} />
      <SignOut/>
    </List>
    <Divider sx={{ my: 1 }} />
    <Copyright sx={{ pt: 4 }} />
  </Drawer>
  </React.Fragment>
  );
}