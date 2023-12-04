import React, { Component } from 'react';
import './data.json';
import App from './components/app/App';

const MainContext = React.createContext();

class MainProvider extends Component {

  static getDerivedStateFromProps(props, state){
    const data = props.children;
    if (props.children !== state.reicievedContent){
      const newData = {...data};
      const notes = [];
      for (let prop in newData) {
        notes.push(newData[prop])
      }
      return {
        ...state, ...{reicievedContent: data, data: notes}
      }
    }
    return null;
  }

  state = {
    reicievedContent: [],
    data: [],
    sort: false,
    filterByTags: [],
    note: false,
    noteCreator: false,
    noteEditor: false,
    currentNote: null,
    newId: 4
  }

  deleteNote = (id) => {
    const items = [...this.state.data];
    const newData = items.filter(item => item.id !== id);
    this.setState(() => {
      return { data: newData };
    })
  }

  openNote = (id) => {
    const notes = [...this.state.data];
    const currentNote = this.getCurrentNote(id, notes);
    this.setState({
      note: true,
      currentNote: currentNote
    })
  }

  openNoteCreator = () => {
    this.setState({
      noteCreator: true
    })
  }

  closeNoteEditor = () => {
    this.setState({
      note: false,
      noteCreator: false,
      noteEditor: false
    })
  }

  getCurrentNote = (id, notes) => {
    const index = notes.findIndex((note) => note.id === id);
    const currentNote = notes[index];  
    return currentNote;
  }

  openNoteEditor = (id) => {
    const notes = [...this.state.data];
    const currentNote = this.getCurrentNote(id, notes);
    this.setState({
      noteEditor: true,
      currentNote: currentNote
    })
  }

  createNote = (title, description, tags) => {
    const newNote = {};
    newNote.title = title;
    newNote.description = description;
    newNote.tags = tags;
    this.setState(({data, newId}) => {
      newNote.id = newId;
      const newData = [...data];
      newData.push(newNote);
      return {
        data: newData,
        note: false,
        noteCreator: false,
        noteEditor: false,
        newId: newId + 1
      }
    })
  }

  editNote = (id, title, description, tags) => {
    const notes = [...this.state.data];
    const currentNote = this.getCurrentNote(id, notes);
    currentNote.title = title;
    currentNote.description = description;
    currentNote.tags = tags;
    this.setState({
      data: notes,
      note: false,
      noteCreator: false,
      noteEditor: false,
    })
  }

  filterByTagsFunction = (tags) => {
    this.setState({
      filterByTags: tags
    })
  }

  resetFilterByTagsFunction = () => {
    this.setState({
      filterByTags: []
    })
  }

  render() {
    return (
      <MainContext.Provider 
        value={{
          ...this.state,
          deleteNote: this.deleteNote,
          openNoteCreator: this.openNoteCreator,
          closeNoteEditor: this.closeNoteEditor,
          openNoteEditor: this.openNoteEditor,
          createNote: this.createNote,
          editNote: this.editNote,
          openNote: this.openNote,
          filterByTagsFunction: this.filterByTagsFunction,
          resetFilterByTagsFunction: this.resetFilterByTagsFunction
        }}
      > 
        <App />
      </MainContext.Provider>
    )
  }
}
 
const MainConsumer = MainContext.Consumer;

export { MainProvider, MainConsumer }