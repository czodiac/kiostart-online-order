import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMyStoreAsync } from './features/myStore/myStoreSlice'
import { getMyStoreItemAsync } from './features/myStore/myStoreItemSlice'

import './App.css';
import { Logo } from './features/header/Logo'
import { MyStoreItem, myStoreItem } from './features/myStore/myStoreItem'
import { MyStoreItemGrid } from './features/myStore/myStoreItemGrid';
import { Button } from '@mui/material';

function App() {
  const dispatch = useDispatch();
  dispatch(getMyStoreAsync())
  dispatch(getMyStoreItemAsync())
  useEffect(() => {
    console.log('Fetch shop and item data')
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <MyStoreItemGrid />
        <Button variant="contained">Order</Button>
        <br />
      </header>
    </div>
  );
}

export default App;
