import React, { useState, useEffect } from "react";
import CreateArea from "./CreateArea";
import Note from "./Note";

const notesRoute = "https://threebdojapi.onrender.com/notes";

function Notes() {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        console.log("fetching");
        fetch(notesRoute)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setNotes(data);
            });
    }, []);
    function addNote(newNote) {
        setNotes((prevNotes) => {
            return [...prevNotes, newNote];
        });
    }

    function deleteNote(id) {
        setNotes((prevNotes) => {
            return prevNotes.filter((noteItem, index) => {
                return index !== id;
            });
        });
    }
    console.log(notes);
    return (<div>
        <CreateArea onAdd={addNote} />
        {notes.map((noteItem, index) => {
            return (
                <Note
                    key={index}
                    id={noteItem._id}
                    ind={index}
                    title={noteItem.title}
                    content={noteItem.content}
                    onDelete={deleteNote}
                />
            );
        })}
    </div>);
}

export default Notes;