import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import CreateNewForm from './components/CreateNewForm';
import PreviewForm from './components/PreviewForm';


function App() {


  return (
    <>

    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/form/create' element={<CreateNewForm />} />
        <Route path='/form/preview' element={<PreviewForm />} />
      </Routes>
    </Router>


    </>
  )
}

export default App
