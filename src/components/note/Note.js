import React from 'react';
import './Note.scss';
import ConsumerHoc from '../hocs/ConsumerHoc';

const Note = ({value, id, title}) => {
  const {openNote, openNoteEditor, deleteNote} = value;
  return (
    <div id={id} className="current-note">
      <div className="note-description">
        <span>{title}</span>
      </div>
      <div className="buttons">
        <button onClick={() => {openNote(id)}}>Open</button>
        <button onClick={() => {openNoteEditor(id)}}>Edit</button>
        <button onClick={() => {deleteNote(id)}}>Delete</button>
      </div>
    </div>
  )
}

export default ConsumerHoc(Note);