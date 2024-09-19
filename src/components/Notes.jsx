import React, { useState, useEffect } from "react";
import CreateArea from "./CreateArea";
import Note from "./Note";
import axios from "axios";

const protectedRoute = 'https://keeperappapi.onrender.com/protected';

function Notes() {
    const [notes, setNotes] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(protectedRoute, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setNotes(response.data);
            } catch (err) {
                setErrorMessage('You are not authorized');
            }
        };
        fetchProtectedData();
    }, []);

    function addNote(newNote) {
        setNotes((prevNotes) => [...prevNotes, newNote]);
    }

    function deleteNote(id) {
        setNotes((prevNotes) => prevNotes.filter((noteItem, index) => index !== id));
    }

    return (
        <div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <CreateArea onAdd={addNote} />
            {notes.map((noteItem, index) => (
                <Note
                    key={index}
                    _id={noteItem._id}
                    ind={index}
                    title={noteItem.title}
                    content={noteItem.content}
                    onDelete={deleteNote}
                />
            ))}
        </div>
    );
}

export default Notes;
