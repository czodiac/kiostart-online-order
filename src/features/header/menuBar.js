import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { LoginModal } from '../login/loginModal';
import { logoutAsync } from '../../slices/authSlice';
import { openLoginModal, openRegisterModal } from "../../slices/modalSlice";
import { selectMyStoreInitialItems, setMyStoreItems } from "../../slices/myStoreItemSlice";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

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
    display: 'inherit'
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
            minWidth: '220px',
        },
    },
}));

export const MenuBar = () => {
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const initialItems = useSelector(selectMyStoreInitialItems);

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
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

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
                <div>
                    <MenuItem divider='true' onClick={handleMobileMenuClose}>
                        <Button color="inherit" component={Link} to={'/'}>Home</Button>
                    </MenuItem>
                    <MenuItem divider='true' onClick={handleMobileMenuClose}>
                        <Button color="inherit" component={Link} to={'/profile'}>Profile</Button>
                    </MenuItem>
                    <MenuItem onClick={logOut}>
                        <Button color="inherit" component={Link}>Logout</Button>
                    </MenuItem>
                </div>
            ) : (
                <div>
                    <MenuItem divider='true' onClick={handleMobileMenuClose}>
                        <Button color="inherit" component={Link} to={'/'}>Home</Button>
                    </MenuItem>
                    <MenuItem divider='true' onClick={showLoginModal}>
                        <Button color="inherit">Login</Button>
                    </MenuItem>
                    <MenuItem onClick={showRegisterModal}>
                        <Button color="inherit">Register</Button>
                    </MenuItem>
                </div>
            )}
        </Menu>
    );

    const searchOnChange = (e) => {
        // Perform case insensitive search.
        const searchString = e.target.value.toLowerCase();
        let filtered = initialItems.filter((el) => {
            const foundInName = (el.name == null) ? false : el.name.toLowerCase().includes(searchString);
            const foundInDesc = (el.description == null) ? false : el.description.toLowerCase().includes(searchString);
            return foundInName || foundInDesc;
        });
        if (filtered === null || filtered.length === 0) {
            filtered = null;
        }
        dispatch(setMyStoreItems(filtered));
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <LoginModal />
            <AppBar >
                <Toolbar>
                    <IconButton color="inherit" component={Link} to="/">
                        Iltae's Store
                    </IconButton>
                    <Search className='minWidth0'>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            sx={{ minWidth: { xs: '0' } }}
                            placeholder="Search name or description"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={searchOnChange}
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
