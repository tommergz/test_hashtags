import React from 'react';
import { MainConsumer } from '../../context';

const ConsumerHoc = (Wrapped) => {
  return (props) => {
    return (
      <MainConsumer>
        {
          (value) => {
            return <Wrapped {...props} value={value} />
          }
        }
      </MainConsumer>
    )
  }
}

export default ConsumerHoc;