import React, { Component } from 'react';
import './NoteEditor.scss';
import ConsumerHoc from '../hocs/ConsumerHoc';
import ContentEditable from 'react-contenteditable';

class NoteEditor extends Component {
  state = {
    title: '',
    description: '',
    tags: [],
    id: null,
    textareaFocus: false,
    rangeCount: 0,
    selection: 0
  }

  textareaRef = React.createRef();

  componentDidUpdate(prevProps) {
    if (this.props.value.noteCreator !== prevProps.value.noteCreator) {
      this.setState({
        title: '',
        description: '',
        tags: []
      })
    } 
    if (
        this.props.value.noteEditor !== prevProps.value.noteEditor || 
        this.props.value.note !== prevProps.value.note
      ) {
      const currentNote = this.props.value.currentNote;
      const {id, title, description, tags} = currentNote;
      this.setState({
        title: title,
        description: description,
        tags: tags,
        id: id
      })
    } 
  }

  titleInputFocus = (e) => {
    this.setState({
      textareaFocus: false 
    })
  }

  titleChange = (e) => {
    const newValue = e.target.value;
    this.setState({
      title: newValue 
    })
  }

  descriptionChange = (e) => {

    let newValue = e.target.innerText;
    newValue = newValue.replace(/(#\w+)/g, '<span class="hashtag">$1</span>');
    let text = e.target.innerText;
    let words = text.split(/\b/)
    let newTags = []
    words.forEach((item, index) => {
      let symbol = item.slice(-1)
      if (symbol === '#' && words[index+2]) newTags.push('#' + words[index+1])
    })
    newTags = newTags.map(tag => tag.toLowerCase());

    this.setState(({tags}) => {
      newTags = newTags.filter(tag => {
        return !tags.includes(tag)
      });
      let allTags = [...tags];
      if (newTags.length) {
        allTags = allTags.concat(newTags)
      }
      return {
        description: newValue,
        tags: allTags,
        textareaFocus: true
      }
    })
  }

  addNewTag = (e) => {
    e.preventDefault();
    let tag = e.target[0].value;
    if (tag[1] === '#' || (tag.length === 1 && tag[0] === '#')) {
      return
    } else if (tag[0] !== '#') {
      tag = '#' + tag
    }
    tag = tag.toLowerCase();
    const tags = [...this.state.tags];
    if (tags.includes(tag)) {
      return
    }
    tags.push(tag);
    this.setState({
      tags: tags 
    })
  }
  
  deleteTag = (tag) => {
    this.setState(({tags}) => {
      let allTags = [...tags];
      let newTags = allTags.filter(item => item !== tag);
      return {
        tags: newTags
      }
    })
  }

  render() {
    const {noteCreator, noteEditor, note, closeNoteEditor, createNote, editNote} = this.props.value;
    const {id, title, description, tags} = this.state;
    const deleteTagStyle = !note ? 'delete-tag' : ''
    const allTags = tags.map(tag => {
      return ( 
        <div 
          key={tag} 
          className={"tag " + deleteTagStyle}
          onClick = {!note ? () => this.deleteTag(tag) : null}
        >
          <span>{tag}</span>
        </div>
      ) 
    })
    if (noteCreator || noteEditor || note) {
      const invisible = note ? ' invisible' : '';
      const noteTitle = note ? ' disabled-title' : '';
      const noteDescription = note ? ' disabled-description' : '';
      const button = noteCreator ? 
      <button 
        className="note-button add-note-button"
        onClick={() => createNote(title, description, tags)} 
      >
        Create note
      </button> : 
      <button 
        className={"note-button add-note-button" + invisible}
        onClick={() => editNote(id, title, description, tags)} 
      >
        Edit note
      </button>

      return (
        <div className="note-creator-wrapper">
          <div className="note-creator">
            <div className="close-block">
              <i 
                className="close far fa-window-close"
                onClick={
                  () => {
                    closeNoteEditor()
                  }
                }
              ></i>
            </div>
            <div className="forms">
              <form className="form">
                <input 
                  type="text" 
                  placeholder="Title" 
                  className={"input title-input" + noteTitle}
                  value={this.state.title}
                  onClick={this.titleInputFocus}
                  onChange={this.titleChange}
                  disabled={note}
                />
                <ContentEditable 
                  className={"input description-area" + noteDescription}
                  ref={this.textareaRef}
                  html={this.state.description}
                  disabled={note}
                  onKeyUp={this.descriptionChange}
                  style={{ "height": "200px" }}
                />
                <div className="note-button-wrapper">
                  {button}
                </div>
              </form>
              <div className="tag-block">
                <form 
                  className={"tag-form" + invisible} 
                  onSubmit={this.addNewTag}
                >
                  <input 
                    type="text" 
                    placeholder="Tag" 
                    className="input tag-input" 
                  />
                  <button 
                    className="tag-button" 
                  >
                    Add new tag
                  </button>   
                </form>
                <div className="tags">
                  {allTags}
                </div>
              </div>
            </div>
          </div>
        </div>  
      )
    } else {
      return null
    }
  }

};

export default ConsumerHoc(NoteEditor);