import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';

const deleteNoteRoute='https://keeperappapi.onrender.com/deleteNote'

function Note(props) {
  function handleClick() {
    const token = localStorage.getItem('token');
    fetch(deleteNoteRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: new URLSearchParams({
        noteId: props._id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response;
      })
      .then((data) => {
        console.log("Delete successful:", data);
      })
      .catch((error) => {
        console.error("There was a problem with the delete operation:", error);
      });
    props.onDelete(props.ind);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <Fab onClick={handleClick}>
        <DeleteIcon />
      </Fab>
    </div>
  );
}

export default Note;
