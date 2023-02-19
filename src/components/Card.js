import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../style/card.css';

class Card extends Component {
  formatDate(date) {
    const arrayData = date.split('T')[0].split('-');
    const formatedDate = `${arrayData[2]}/${arrayData[1]}/${arrayData[0]}`;
    return formatedDate;
  }

  formatUrlImage(url) {
    const arr = url.split('/');
    arr.pop();
    return `${arr.join('/')}/1000x1000bb.jpg`;
  }

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

    const styles = { 
      backgroundImage: `url(${this.formatUrlImage(artworkUrl100)})`,
      backgroundSize: '100% auto', 
    }

    return (
      <div id="albumCard" style={styles}>
        <div id='album-card-info'>
          <h1 id='album-title'>{ collectionName }</h1>
          <div className='artist-component-album'>
            <h2>Artista: </h2>
            <h2>{ artistName }</h2>
          </div>
          <div className='artist-component-album'>
            <h2>Musicas: </h2>
            <h2>{ trackCount }</h2>
          </div>
          <div className='artist-component-album'>
            <h2>Lançamento: </h2>
            <h2>{ this.formatDate(releaseDate) }</h2>
          </div>
          <Link
            to={ `/album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
          >
            <button type="button" id="album-btn" /* className="btn btn-lg btn-success" */>
              Abrir Album
            </button>
          </Link>
        </div>
        {/* <p className="ghost">{ artistId }</p>
        <h3 className="ghost">{ collectionPrice }</h3> 
        <h4 className="ghost">{ artworkUrl100 }</h4>
        <p className="ghost">{ collectionId }</p>*/}
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
