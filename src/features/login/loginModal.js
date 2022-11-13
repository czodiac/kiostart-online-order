import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from 'formik'

import { getAuth, loginAsync, registerAsync } from "../../slices/authSlice";
import { getServerResponseMessage, setServerResponseMessage } from "../../slices/serverResponseMessageSlice";
import { setModalWidth, getLoginModalStatus, setLoginModalStatus, getRegisterModalStatus, setRegisterModalStatus } from "../../slices/modalSlice";

// For modal style
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { green, purple } from '@mui/material/colors';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
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

export const LoginModal = () => {
  const dispatch = useDispatch();
  const [msgSeverity, setMsgSeverity] = useState('error');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { serverMessage } = useSelector(getServerResponseMessage);
  const isLoginModalOpen = useSelector(getLoginModalStatus);
  const isRegisterModalOpen = useSelector(getRegisterModalStatus);

  // Modal related
  useSelector(setModalWidth(modal_style)); // Change modal width dynamically.
  const handleClose = () => {
    dispatch(setServerResponseMessage('')); // Reset error message.
    dispatch(setLoginModalStatus(false));
    dispatch(setRegisterModalStatus(false));
    formik.values.loginUsername = '';
    formik.values.registerEmail = '';
    formik.values.loginPassword = '';
  }

  const handleTabChange = (e, newTabValue) => {
    if (newTabValue === 'loginTab') {
      dispatch(setServerResponseMessage('')); // Reset error message.
      dispatch(setLoginModalStatus(true));
      dispatch(setRegisterModalStatus(false));
    } else {
      dispatch(setServerResponseMessage('')); // Reset error message.
      dispatch(setLoginModalStatus(false));
      dispatch(setRegisterModalStatus(true));
    }
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

  const validate = (values) => {
    const errors = {}

    // Check email only if it's register modal.
    if (!isLoginModalOpen) {
      if (!values.registerEmail) {
        errors.registerEmail = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.registerEmail)) {
        errors.registerEmail = 'Invalid email'
      }
    }

    if (!values.loginUsername) {
      errors.loginUsername = 'Required'
    } else if (values.loginUsername.length < 3 || values.loginUsername.length > 20) {
      errors.loginUsername = 'Must be 3~20 characters.'
    }

    if (!values.loginPassword) {
      errors.loginPassword = 'Required'
    } else if (values.loginPassword.length < 6 || values.loginPassword.length > 40) {
      errors.loginPassword = 'Must be 6~40 characters.'
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      loginUsername: '',
      registerEmail: '',
      loginPassword: ''
    },
    validate,
    onSubmit: (values) => {
      setLoading(true);
      const { username, password, email } = { username: values.loginUsername, password: values.loginPassword, email: values.registerEmail };
      let toCall = registerAsync({ username, email, password });
      if (isLoginModalOpen) {
        toCall = loginAsync({ username, password });
      }

      dispatch(toCall)
        .unwrap()
        .then(() => {
          if (isLoginModalOpen) {
            handleClose();  // Login successful. Close modal.
          } else {
            setMsgSeverity('success'); // Registration was a success.
          }
          setLoading(false);
        })
        .catch(() => {
          setMsgSeverity('error');
          setLoading(false);
        });
    },
  })

  return (
    <>
      <Modal
        keepMounted
        open={isLoginModalOpen || isRegisterModalOpen}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={modal_style}>
          <Button className="closeButton" variant="contained" onClick={handleClose}>X</Button>
          <div className="login-container">
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2} columns={1}>
                <Grid item xs={12}>
                  <Tabs centered value={isLoginModalOpen ? "loginTab" : "registerTab"} onChange={handleTabChange}>
                    <Tab value="loginTab" label="Login" />
                    <Tab value="registerTab" label="Register" />
                  </Tabs>
                </Grid>
                <Grid item xs={12}>
                  {serverMessage && (
                    <Alert severity={msgSeverity}>
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
                  <TextField name="loginUsername" size="small" label="User Name" variant="outlined"
                    error={
                      Boolean(formik.errors.loginUsername && formik.touched.loginUsername)
                    }
                    helperText={
                      formik.errors.loginUsername &&
                      formik.touched.loginUsername &&
                      String(formik.errors.loginUsername)
                    }
                    value={formik.values.loginUsername}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange} sx={{ width: 260 }} />
                </Grid>
                {isLoginModalOpen ? '' :
                  <Grid item xs={12}>
                    <TextField
                      name="registerEmail" size="small" label="Email" variant="outlined"
                      error={
                        Boolean(formik.errors.registerEmail && formik.touched.registerEmail)
                      }
                      helperText={
                        formik.errors.registerEmail &&
                        formik.touched.registerEmail &&
                        String(formik.errors.registerEmail)
                      }
                      value={formik.values.registerEmail}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange} sx={{ width: 260 }} />
                  </Grid>}
                <Grid item xs={12}>
                  <TextField
                    name="loginPassword"
                    size="small" label="Password" variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    value={formik.values.loginPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      Boolean(formik.errors.loginPassword && formik.touched.loginPassword)
                    }
                    helperText={
                      formik.errors.loginPassword &&
                      formik.touched.loginPassword &&
                      String(formik.errors.loginPassword)
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  >Password</TextField>
                </Grid>
                <Grid item xs={12}>
                  {loading ? (
                    <LoadingButton loading variant="contained">...........</LoadingButton>
                  ) : (
                    isLoginModalOpen ?
                      <Button type="submit" variant="contained">Login</Button> :
                      <Button type="submit" variant="contained">Register</Button>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <hr />
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