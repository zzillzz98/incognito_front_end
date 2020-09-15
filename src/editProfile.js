import React, { useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editProfile } from './actions/user';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles((theme) => ({
  textField: {
    margin: '5px auto 5px auto'
  }
}));

const EditProfile = (props) => {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  const profile = user.profile;

  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    education: '',
    achievements: '',
  });

  // Assign props icon
  const Icon = props.icon;

  const mapDetailsToState = (profile) => {
    setDetails({
      name: profile.name ? profile.name : '',
      email: profile.email ? profile.email : '',
      phone: profile.phone ? profile.phone : '',
      experience: profile.experience ? profile.experience : '',
      education: profile.education ? profile.education : '',
      achievements: profile.achievements ? profile.achievements : ''
    });
  }

  // useEffect(() => {
  //   mapDetailsToState(profile);
  // });

  const handleClickOpen = () => {
    setOpen(true);
    mapDetailsToState(profile);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    const userData = {
      name: details.name,
      email: details.email,
      phone: details.phone,
      experience: details.experience,
      education: details.education,
      achievements: details.achievements
    }
    dispatch(editProfile(userData));
    handleClose();
  }

  const classes = useStyles();
  return (
    <Fragment>
      <Tooltip title={props.title} placement='top'>
        <IconButton className='editIcon' onClick={handleClickOpen}>
          <Icon/>
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='md'
      > 
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <form>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                className={classes.textField}
                fullWidth
                label='Full Name'
                name='name'
                onChange={handleChange}
                type='text'
                value={details.name}
                variant='outlined'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                className={classes.textField}
                fullWidth
                label='Email'
                name='email'
                onChange={handleChange}
                type='text'
                value={details.email}
                variant='outlined'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                className={classes.textField}
                fullWidth
                label='Phone Number'
                name='phone'
                onChange={handleChange}
                type='text'
                value={details.phone}
                variant='outlined'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                className={classes.textField}
                fullWidth
                label='Experience'
                multiline
                name='experience'
                onChange={handleChange}
                rows='3'
                type='text'
                value={details.experience}
                variant='outlined'
                />  
              </Grid>
              <Grid item xs={12}>
                <TextField
                className={classes.textField}
                fullWidth
                label='Education'
                multiline
                name='education'
                onChange={handleChange}
                rows='3'
                type='text'
                value={details.education}
                variant='outlined'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                className={classes.textField}
                fullWidth
                label='Achievements'
                multiline
                name='achievements'
                onChange={handleChange}
                rows='3'
                type='text'
                value={details.achievements}
                variant='outlined'
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default EditProfile;
