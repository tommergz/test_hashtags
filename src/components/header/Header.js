import React from 'react';
import './Header.scss';
import ConsumerHoc from '../hocs/ConsumerHoc';

const Header = ({value}) => {
  const {openNoteCreator} = value;
  return (
    <div className="header">
      <h1 className="title">Notes</h1>
      <button 
        className="open-note-editor-button"
        onClick={openNoteCreator}
      >
        New note
      </button>
    </div>
  );
};

export default ConsumerHoc(Header);