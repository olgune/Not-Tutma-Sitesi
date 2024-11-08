
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const NoteForm = ({ token }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`https://not-tutma-sitesi.onrender.com/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        setTitle(response.data.title);
        setText(response.data.text);
      })
      .catch((error) => console.error('Error fetching note:', error));
    }
  }, [id, token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const noteData = { title, text };

    if (id) {
      axios.put(`https://not-tutma-sitesi.onrender.com/notes/${id}`, noteData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        alert(response.data.message);
        navigate('/notes'); 
      })
      .catch((error) => console.error('Error editing note:', error));
    } else {
      axios.post('https://not-tutma-sitesi.onrender.com/notes', noteData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        alert('Note created successfully');
        navigate('/notes'); 
      })
      .catch((error) => console.error('Error creating note:', error));
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Note' : 'Create Note'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">{id ? 'Update' : 'Create'} Note</button>
      </form>
    </div>
  );
};

export default NoteForm;

