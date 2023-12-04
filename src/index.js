import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { MainProvider } from './context';
import data from './data.json';

ReactDOM.render(
    <MainProvider>
      {data}
    </MainProvider>,
  document.getElementById('root')
);
