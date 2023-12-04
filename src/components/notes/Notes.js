import React from 'react';
import './Notes.scss'
import Note from  '../note/Note';
import ConsumerHoc from '../hocs/ConsumerHoc';

const Notes = ({value}) => {
  const {
    data, 
    filterByTags
  } = value; 
  let items = [...data];

  if (filterByTags.length) {
    items = items.filter(item => {
      const filteredItem = item.tags.filter(i => filterByTags.includes(i.toLowerCase()));
      return filteredItem.length;
    });
  }

  const notes = items.map(item => {
    const { id, title, tags } = item;
    return ( 
      <li key={id} className="note-wrapper">
        <Note 
          id = {id}
          title = {title}
          tags = {tags}
        />
      </li>
    ) 
  })

  return <ul className="notes">{notes}</ul>
}

export default ConsumerHoc(Notes);