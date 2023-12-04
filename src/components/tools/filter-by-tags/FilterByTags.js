import React, { Component } from 'react';
import './FilterByTags.scss';
import ConsumerHoc from '../../hocs/ConsumerHoc';

class FilterByTags extends Component {

  state = {
    tags: []
  }

  addNewTag = (e) => {
    e.preventDefault();
    let tag = e.target[0].value;
    const index = tag.indexOf(' ')
    if (index >= 0) {
      tag = tag.slice(0, index)
    }
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
    tags.push(tag.toLowerCase());
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

  reset = () => {
    this.setState({
      tags: []
    })
    this.props.value.resetFilterByTagsFunction()
  }

  render() {
    const {tags} = this.state;
    const {filterByTagsFunction} = this.props.value;
    const allTags = tags.map(tag => {
      return ( 
        <div 
          key={tag} className="tag"
          onClick={() => this.deleteTag(tag)}
        >
          <span>{tag}</span>
        </div>
      ) 
    })
    return (
      <div className="tag-block">
      <form 
        className="tags-form"
        onSubmit={this.addNewTag}
      >          
        <h4 className="filter-by-tags-header">
          FILTER BY TAGS
        </h4>
        <div className="filter-by-tags-setting">
          <input 
            type="text" 
            placeholder="Tag" 
            className="input tag-input" 
          />
          <button className="tag-button">
            Add new tag
          </button>     
        </div>
      </form>
      <div className="filter-by-tags-setting">
        <button
          className="tag-button"
          onClick={() => filterByTagsFunction(tags)}
        >
          Filter by tags
        </button> 
        <button 
          className="tag-button"
          onClick={this.reset}
        >
          Reset
        </button> 
      </div>
      <div className="tags filter-tags">
        {allTags}
      </div>
    </div>
    )
  }
}

export default ConsumerHoc(FilterByTags);