import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginCard from "./components/login/LoginCard.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import Chat from "./components/chat/Chat.jsx";


const App = () => {
    const isAuth = true;
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<LoginCard />} />
                <Route path='/chat' element={
                    isAuth ? <><Sidebar /><Chat /></> : <Navigate to="/login" replace />
                } />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    )
}

export default App;