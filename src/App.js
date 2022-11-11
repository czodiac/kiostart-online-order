import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMyStoreAsync } from './features/myStore/myStoreSlice'
import { getMyStoreItemAsync } from './features/myStore/myStoreItemSlice'

import './App.css';
import { MyStoreItemGrid } from './features/myStore/myStoreItemGrid';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { setDevice } from './features/global/deviceInfoSlice';

function App() {
  // Get store/item data.
  const dispatch = useDispatch();
  dispatch(getMyStoreAsync())
  dispatch(getMyStoreItemAsync())

  // Find user's viewport.
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), { noSsr: true });
  const isTablet = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
  const isMobile = useMediaQuery(theme.breakpoints.up('xs'), { noSsr: true });
  if (isDesktop) {
    dispatch(setDevice('Desktop')) // 1264px > < 1904px
    console.log('Desktop')
  } else if (isTablet) {
    dispatch(setDevice('Tablet')) // 600px > < 1264px
    console.log('Tablet')
  } else if (isMobile) {
    dispatch(setDevice('Mobile')) // < 600px 
    console.log('Mobile')
  }

  return (
    <div className="App">
      <header className="App-header">
        <MyStoreItemGrid />
        <Button variant="contained">Order</Button>
        <br />
      </header>
    </div>
  );
}

export default App;
