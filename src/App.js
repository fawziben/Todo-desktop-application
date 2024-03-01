import './App.css';
import { blue, lightBlue, purple } from '@mui/material/colors';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import Don from './Components/don.js';
import Layout from './Components/Layout.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BasicCard from './Components/noteForm.js';
import NoteForm from './Components/noteForm.js';

const theme = createTheme({
  palette : {
    primary : blue,
    secondary : {
      main : '#fefefe'
    }
  },
  typography:{
    fontFamily : 'Poppins',
    fontWeightRegular : 400,
  }
})


function App() {
  return (
    <ThemeProvider theme = {theme}>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Don/>} />
            <Route path="/add" element={<NoteForm/>}/>
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
