import React, { Component } from 'react';
import Header from '../components/Header';

class Album extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="page-album">
          <Header />
          Album
        </h1>
      </div>
    );
  }
}

export default Album;
