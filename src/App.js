import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMyStoreAsync } from './features/myStore/myStoreSlice'
import { getMyStoreItemAsync } from './features/myStore/myStoreItemSlice'

import './App.css';
import { Logo } from './features/header/Logo'
import { MyStoreItem, myStoreItem } from './features/myStore/myStoreItem'

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
        <p>
          Online Order
          <MyStoreItem />

          <button
            onClick={() => dispatch(getMyStoreAsync())}
          >
            Get Async
          </button>
        </p>
      </header>
    </div>
  );
}

export default App;
