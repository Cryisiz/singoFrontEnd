import Typography from '@mui/material/Typography';

export function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}   
        {'Singo '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
export default Copyright;