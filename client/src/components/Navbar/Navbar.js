import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import memories from '../../images/memories.png';
import * as actionType from '../../constants/actionTypes';

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
  const logout = () => {
    dispatch({type:'LOGOUT'});
    setUser(null);
    navigate('/auth');
  };
  useEffect(() => {
    const token = user?.token;

    if(token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
   },[location]);

  return (
    <AppBar sx={{borderRadius: 15,margin: '30px 0',display: 'flex',flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',padding: '10px 50px',}} position="static" color="inherit">
      <div style={{display: 'flex',alignItems: 'center',}} >
        <Typography sx={{color: 'rgba(0,183,255, 1)',textDecoration: 'none',}} component={Link} to="/"  variant="h2" align="center">Memories</Typography>
        <img style={{marginLeft: '15px',}}  src={memories} alt="icon" height="60" />
      </div>
      <Toolbar sx={{display: 'flex',justifyContent: 'flex-end',width: '400px',}} >
        {user ? (
          <div style={{display: 'flex',justifyContent: 'space-between',width: '400px',}} >
            <Avatar alt={user?.result.name} src={user?.result.picture}>{user?.result.name.charAt(0)}</Avatar>
            <Typography sx={{display: 'flex',alignItems: 'center',ml:'10px'}} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained"  color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;