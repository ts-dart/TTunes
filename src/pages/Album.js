import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import AlbumComponent from '../components/Album';

class Album extends Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        <h1 data-testid="page-album">
          <Header />
        </h1>
        <AlbumComponent id={ data.match.params.id } />
      </div>
    );
  }
}

Album.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  params: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.string.isRequired,
};

export default Album;
