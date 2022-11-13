import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { getAuth, loginAsync } from "../../slices/authSlice";
import { getServerResponseMessage, setServerResponseMessage } from "../../slices/serverResponseMessageSlice";
import { setModalWidth, getLoginModalStatus, setLoginModalStatus } from "../../slices/modalSlice";

// For modal style
import { getDevice } from '../../slices/deviceInfoSlice';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { green, purple } from '@mui/material/colors';
import LoadingButton from '@mui/lab/LoadingButton';
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import './loginModal.css';

const modal_style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '3px',
  boxShadow: 24,
  padding: 15,
  p: 4,
  outline: 'none',
};

const Login = () => {
  const dispatch = useDispatch();
  const [loginUsername, setLoginUserName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Modal related
  const device = useSelector(getDevice);
  if (device === 'Mobile') modal_style.width = 300;
  else if (device === 'Tablet') modal_style.width = 550;
  else modal_style.width = 500;

  const isLoginModalOpen = useSelector(getLoginModalStatus);
  useSelector(setModalWidth(modal_style));
  const handleClose = () => {
    dispatch(setServerResponseMessage('')); // Reset error message.
    dispatch(setLoginModalStatus(false));
    setLoginUserName('');
    setLoginPassword('');
  }

  // Login related
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector(getAuth);
  const { serverMessage } = useSelector(getServerResponseMessage);

  const handleNameChange = (e) => {
    setLoginUserName(e.target.value);
  }
  const handlePassChange = (e) => {
    setLoginPassword(e.target.value);
  }
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent redirect on submit!

    const { username, password } = { username: loginUsername, password: loginPassword };
    setLoading(true);

    dispatch(loginAsync({ username, password }))
      .unwrap()
      .then(() => {
        // Login successful.
        handleClose();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const LoginButton = styled(Button)(({ theme }) => ({
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  }));

  const RegisterButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  }));

  return (
    <>
      <Modal
        keepMounted
        open={isLoginModalOpen}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={modal_style}>
          <Button className="closeButton" variant="contained" onClick={handleClose}>X</Button>
          <div className="login-container">
            <form onSubmit={handleLogin}>
              <Grid container spacing={2} columns={1}>
                <Grid item xs={12}>
                  <LoginButton variant="contained">Login</LoginButton><RegisterButton variant="contained">Register</RegisterButton>
                </Grid>
                <Grid item xs={12}>
                  {serverMessage && (
                    <Alert severity="error">
                      {serverMessage}
                    </Alert>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField size="small" label="User Name" name="username" required variant="outlined" value={loginUsername} onChange={handleNameChange} sx={{ width: 260 }} />
                </Grid>
                <Grid item xs={12}>
                  <FormControl size="small" variant="outlined">
                    <InputLabel required htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={handlePassChange}
                      required
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  {loading ? (
                    <LoadingButton loading variant="contained">...........</LoadingButton>
                  ) : (
                    <Button type="submit" variant="contained">Login</Button>
                  )}
                </Grid>
                <Grid item xs={12}>
                  Login to save all your orders.
                </Grid>
              </Grid>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Login;
