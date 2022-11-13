import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./menuBar.css";

import Login from '../login/loginModal';
import Profile from '../login/profile';
/*
import Home from "./components/Home";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
*/
import { logoutAsync } from '../../slices/authSlice';
import eventBus from "../../common/eventBus";
import { openLoginModal, openRegisterModal } from "../../slices/modalSlice";

export const MenuBar = () => {
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);

    const logOut = useCallback(() => {
        dispatch(logoutAsync());
    }, [dispatch]);

    const showLoginModal = () => {
        dispatch(openLoginModal());
    }

    const showRegisterModal = () => {
        dispatch(openRegisterModal());
    }

    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" onClick={logOut}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" onClick={showLoginModal}>
                                    Login</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" onClick={showRegisterModal}>
                                    Register</a>
                            </li>
                        </div>
                    )}
                </nav>
                <Login />
            </div>
        </Router>
    );
}