import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserSessionProvider } from './components/UserSession';  // Import the UserSessionProvider
import Navigation from './components/navbar.js';
import Carousel from './components/carousel.js';
import CreateAccount from './components/createAccount.js';
import LoginForm from "./components/loginForm";
import AboutPage from "./components/aboutPage";
import './App.css';
import React from "react";

function App(){
    return (
        <UserSessionProvider>
            <Router>
                <Navigation/>
                <Routes>
                    <Route path="/" element={<Carousel/>} />
                    <Route path="/createAccount" element={<CreateAccount/>} />
                    <Route path="/login" element={<LoginForm/>} />
                    <Route path="/about" element={<AboutPage/>} />
                </Routes>
            </Router>
        </UserSessionProvider>
    );
}

export default App;

