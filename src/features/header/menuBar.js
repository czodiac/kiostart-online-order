import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { LoginModal } from '../login/loginModal';
import { logoutAsync } from '../../slices/authSlice';
import { openLoginModal, openRegisterModal } from "../../slices/modalSlice";

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import StoreIcon from '@mui/icons-material/Store';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Home } from "@mui/icons-material";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export const MenuBar = () => {
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);

    const logOut = useCallback(() => {
        dispatch(logoutAsync());
        handleMobileMenuClose();
    }, [dispatch]);

    const showLoginModal = () => {
        dispatch(openLoginModal());
        handleMobileMenuClose();
    }

    const showRegisterModal = () => {
        dispatch(openRegisterModal());
        handleMobileMenuClose();
    }

    // Menu bar related
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {currentUser ? (
                <>
                    <MenuItem divider='true' onClick={handleMobileMenuClose}>
                        <Button color="inherit" component={Link} to={'/'}>Home</Button>
                    </MenuItem>
                    <MenuItem divider='true' onClick={handleMobileMenuClose}>
                        <Button color="inherit" component={Link} to={'/profile'}>Profile</Button>
                    </MenuItem>
                    <MenuItem onClick={logOut}>
                        <Button color="inherit" component={Link}>Logout</Button>
                    </MenuItem>
                </>
            ) : (
                <>
                    <MenuItem divider='true' onClick={handleMobileMenuClose}>
                        <Button color="inherit" component={Link} to={'/'}>Home</Button>
                    </MenuItem>
                    <MenuItem divider='true' onClick={showLoginModal}>
                        <Button color="inherit">Login</Button>
                    </MenuItem>
                    <MenuItem onClick={showRegisterModal}>
                        <Button color="inherit">Register</Button>
                    </MenuItem>
                </>
            )}
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <LoginModal />
            <AppBar >
                <Toolbar>
                    <IconButton color="inherit" component={Link} to="/">
                        Iltae's Store
                    </IconButton>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ textAlign: 'right', flex: 1, display: { xs: 'none', md: 'block' } }}>
                        {currentUser ? (
                            <>
                                <Button color="inherit" component={Link} to={'/'}>Home</Button>
                                <Button color="inherit" component={Link} to={'/profile'}>Profile</Button>
                                <Button color="inherit" onClick={logOut}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Button color="inherit" component={Link} to={'/'}>Home</Button>
                                <Button color="inherit" onClick={showLoginModal}>Login</Button>
                                <Button color="inherit" onClick={showRegisterModal}>Register</Button>
                            </>
                        )}
                    </Box>
                    <Box sx={{ textAlign: 'right', flex: 1, display: { xs: 'block', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </Box>
    );
}
