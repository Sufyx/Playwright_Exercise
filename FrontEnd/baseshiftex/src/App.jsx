/**
 * 20/11/2022
 * Asaf Gilboa
 * Baseshift interview exercise 
 */

import { React } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import InfoPage from './pages/InfoPage';
import { Box } from '@chakra-ui/react';

function App() {

  const navigate = useNavigate();

  function loginSuccess() {
    navigate("/information_page");
  }

  return (
    <Box className='main-div' >
      <Routes >
        <Route path="/" element={<Login path="/" loginSuccess={loginSuccess} />} />
        <Route path="/information_page" element={<InfoPage />} />
      </Routes>
    </Box>

  );
}

export default App;
