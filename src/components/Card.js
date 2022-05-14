import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../style/card.css';

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
      <div id="albumCard">
        <h1>{ collectionName }</h1>
        <p className="ghost">{ collectionId }</p>
        Artista:
        <h2>{ artistName }</h2>
        <p className="ghost">{ artistId }</p>
        Preço:
        <h3>{ collectionPrice }</h3>
        Lançamento:
        <h3>{ releaseDate }</h3>
        <h4 className="ghost">{ artworkUrl100 }</h4>
        Musicas:
        <h4>{ trackCount }</h4>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <button type="button" id="album-btn" className="btn btn-lg btn-success">
            Ver album
          </button>
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
