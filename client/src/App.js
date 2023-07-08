import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserSessionProvider } from './components/UserSession';  // Import the UserSessionProvider
import Navigation from './components/navbar.js';
import Carousel from './components/carousel.js';
import CreateAccount from './components/createAccount.js';
import LoginForm from "./components/loginForm";
import AboutPage from "./components/aboutPage";
import UserProfile from "./components/UserProfile";
import CompetitionInfoPage from "./components/CompetitionInfoPage";
import './App.css';
import React from "react";
import FindEventsPage from "./components/FindEventsPage";

function App(){
    return (
        <UserSessionProvider>
            <Router>
                <Navigation/>
                <Routes>
                    <Route path="/" element={<Carousel/>} />
                    <Route path="/createAccount" element={<CreateAccount/>} />
                    <Route path="/eventsPage" element={<FindEventsPage/>}/>
                    <Route path="/profile" element={<UserProfile/>} />
                    <Route path="/login" element={<LoginForm/>} />
                    <Route path="/about" element={<AboutPage/>} />
                    <Route path="/competition/:id" element={<CompetitionInfoPage/>} />
                </Routes>
            </Router>
        </UserSessionProvider>
    );
}

export default App;

