import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends Component {
  render() {
    const {
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    } = this.props;

    return (
      <div>
        <h1>{ collectionName }</h1>
        <p>{ collectionId }</p>
        Artista:
        <h2>{ artistName }</h2>
        <p>{ artistId }</p>
        Preço:
        <h3>{ collectionPrice }</h3>
        Lançamento
        <h3>{ releaseDate }</h3>
        <h4>{ artworkUrl100 }</h4>
        <h4>{ trackCount }</h4>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Ver album
        </Link>
      </div>
    );
  }
}

Card.propTypes = {
  artistId: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionPrice: PropTypes.number.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  trackCount: PropTypes.number.isRequired,
};

export default Card;
