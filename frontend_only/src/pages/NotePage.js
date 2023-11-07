import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-back.svg';
import AuthContext from '../context/AuthContext'; // Import the AuthContext

const NotePage = () => {
  let { id } = useParams();
  let history = useNavigate();
  let [note, setNote] = useState({ title: '', content: '' });

  // Get the authTokens from the AuthContext
  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    const getNote = async () => {
      try {
        if (id === 'new') return;
        let response = await fetch(`/notes/${id}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.access}`,
          },
        });
        if (response.ok) {
          let data = await response.json();
          setNote(data);
        } else {
          console.error(`Failed to fetch note with ID ${id}`);
        }
      } catch (error) {
        console.error('Error fetching note:', error);
      }
    };

    getNote();
  }, [id, authTokens]);

  let createNote = async () => {
    try {
      let response = await fetch(`/notes/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.access}`,
        },
        body: JSON.stringify(note),
      });

      if (response.ok) {
        // Handle successful creation
      } else {
        // Handle errors
      }
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  let updateNote = async () => {
    try {
      let response = await fetch(`/notes/${id}/`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.access}`,
        },
        body: JSON.stringify(note),
      });

      if (response.ok) {
        
      } else {
        
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  let deleteNote = async () => {
    try {
      let response = await fetch(`/notes/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.access}`,
        },
      });

      if (response.ok) {
        // Handle successful deletion
        history('/user-notes');
      } else {
        // Handle errors
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  let handleSubmit = async () => {
    if (id === 'new' && note.title && note.content) {
      await createNote();
    } else if (id !== 'new' && (note.title || note.content)) {
      await updateNote();
    } else if (id !== 'new') {
      deleteNote();
    }

    history('/user-notes');
  };

  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {id !== 'new' ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <input
        type="text"
        placeholder="Note Title"
        value={note.title}
        onChange={(e) => {
          setNote({ ...note, title: e.target.value });
        }}
      />
      <textarea
        placeholder="Note Content"
        value={note.content}
        onChange={(e) => {
          setNote({ ...note, content: e.target.value });
        }}
      ></textarea>
    </div>
  );
};

export default NotePage;
