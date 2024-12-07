import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/home/HomePage.jsx';
import Sidebar from "./components/sidebar/Sidebar.jsx";
import Chat from "./components/chat/Chat.jsx";
import AboutPage from './pages/AboutPage.jsx';


const App = () => {
    const isAuth = true;
    return (
        <Router>
            <Routes>
                <Route path='/home' element={<HomePage />} />
                <Route path='/chat' element={
                    isAuth ? <><Sidebar /><Chat /></> : <Navigate to="/home" replace />
                } />
                <Route path='/about' element={<AboutPage />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </Router>
    )
}

export default App;