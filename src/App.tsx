import React from 'react';
import { ToastContainer } from 'react-toastify';
import Home from './pages/home';

function App() {
  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar
        limit={1}
        newestOnTop={false}
        />
        <Home/>
    </>
  );
}

export default App;
