
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NoteList = ({ token }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (token) {
      axios.get('https://not-tutma-sitesi.onrender.com/notes', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => setNotes(response.data.data))
      .catch((error) => console.error('Error fetching notes:', error));
    }
  }, [token]);

  const handleDelete = (id) => {
    axios.delete(`https://not-tutma-sitesi.onrender.com/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      setNotes(notes.filter(note => note._id !== id));
      alert(response.data.message);
    })
    .catch((error) => console.error('Error deleting note:', error));
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.text}</p>
            <button onClick={() => handleDelete(note._id)}>Delete</button>
            <Link to={`/notes/${note._id}/edit`}>
              <button>Edit</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
