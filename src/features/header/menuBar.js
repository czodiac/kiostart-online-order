import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./menuBar.css";

import Login from '../login/loginModal';
import Register from '../login/registerModal';
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
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);

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

    useEffect(() => {
        if (currentUser) {
            setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
        } else {
            setShowModeratorBoard(false);
            setShowAdminBoard(false);
        }

        eventBus.on("logout", () => {
            logOut();
        });

        return () => {
            eventBus.remove("logout");
        };
    }, [currentUser, logOut]);

    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        Root
                    </Link>
                    <div className="navbar-nav mr-auto">
                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link">
                                    Admin Board
                                </Link>
                            </li>
                        )}
                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                    User
                                </Link>
                            </li>
                        )}
                    </div>
                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={logOut}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => { showLoginModal() }}>
                                    Login</a>
                            </li>

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>

                <div className="container mt-3">
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        {/*
                        <Route path="/home" element={<Home />} />
                        <Route path="/user" element={<BoardUser />} />
                        <Route path="/mod" element={<BoardModerator />} />
                        <Route path="/admin" element={<BoardAdmin />} />
                    */}
                    </Routes>
                </div>
                <Login />
            </div>
        </Router>
    );
}