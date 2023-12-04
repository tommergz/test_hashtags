import React from 'react';
import './App.scss';
import Header from '../header/Header';
import Notes from '../notes/Notes';
import NoteEditor from '../note-editor/NoteEditor';
import FilterByTags from '../tools/filter-by-tags/FilterByTags';

class App extends React.Component {
  render() {
    return (
      <div id="common-wrapper" className="common-wrapper">
        <Header />
        <FilterByTags />
        <Notes />
        <NoteEditor />
      </div>  
    )
  }
}

export default App;
