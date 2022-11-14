import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { getAuth } from "../../slices/authSlice";

export const Profile = () => {
  const { user: currentUser } = useSelector(getAuth);

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{ marginLeft: 40 }}>
      <header>
        <h2>My Profile
        </h2>
      </header>
      <p><strong>User Name:</strong> {currentUser.username}</p>
      <p>
        <strong>JWT Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>User ID:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};
