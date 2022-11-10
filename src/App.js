import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Logo } from './features/header/Logo'
import { getMyStoreAsync } from './features/myStore/myStoreSlice'
import './App.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Fetch shop and item data')
    dispatch(getMyStoreAsync())
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <p>
          Online Order
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
