import React, { useEffect, useState } from 'react';


const AllNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        console.log("Fetching notes")
        console.log("My backend url: " + process.env.REACT_APP_BACKEND_URL)
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/notes`);
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
        ALL NOTES
      {notes.map((note) => (
        <div key={note.id}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
};

export default AllNotes;
