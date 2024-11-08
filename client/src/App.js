import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login setToken={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notes" element={<NoteList token={token} />} />
          <Route path="/notes/new" element={<NoteForm token={token} />} />
          <Route path="/notes/:id/edit" element={<NoteForm token={token} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
