/* eslint-disable react/sort-comp */
import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../pages/Loading';
import Card from './Card';
import '../style/search.css';

const MIN_LIMIT_CHAR_NAME = 2;

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artist: '',
      message: '',
      disabled: true,
      loading: false,
      requested: false,
      artists: [],
    };

    this.validatorArtist = this.validatorArtist.bind(this);
    this.requestApi = this.requestApi.bind(this);
  }

  validatorArtist({ target: { value } }) {
    this.setState({ artist: value });

    if (value.length >= MIN_LIMIT_CHAR_NAME) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState(() => ({
        disabled: true,
      }));
    }
  }

  async requestApi() {
    const { artist } = this.state;
    this.setState({ loading: true });

    const response = await searchAlbumsAPI(artist);
    if (typeof response === 'object') {
      this.setState({
        loading: false,
        artists: [...response],
        requested: true,
        message: `Resultado de álbuns de: ${artist}`,
      });
    }

    this.setState({ artist: '' });
  }

  genAnswer = (
    loading,
    requested,
    message,
    artists,
  ) => {
    if (loading === true && requested === true) {
      return <Loading />;
    }

    if (artists.length <= 0 && requested === true) {
      return <p id="message">Nenhum álbum foi encontrado</p>;
    }

    if (loading === false && requested === true) {
      return (
        <>
          <p id="message">{ message }</p>
          { artists.map((curr, index) => (<Card
            key={ index }
            artistId={ curr.artistId }
            artistName={ curr.artistName }
            collectionId={ curr.collectionId }
            collectionName={ curr.collectionName }
            collectionPrice={ curr.collectionPrice }
            artworkUrl100={ curr.artworkUrl100 }
            releaseDate={ curr.releaseDate }
            trackCount={ curr.trackCount }
          />)) }
        </>
      );
    }
  }

  render() {
    const {
      disabled,
      artist,
      loading,
      requested,
      message,
      artists,
    } = this.state;

    return (
      <>
        { loading === false
          ? (
            <form id="form-search">
              <input
                name={ artist }
                value={ artist }
                data-testid="search-artist-input"
                placeholder="Pesquisar artista"
                onChange={ this.validatorArtist }
                className="form-control"
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ disabled }
                onClick={ this.requestApi }
                className="btn btn-lg btn-success"
              >
                Pesquisar
              </button>
            </form>
          )
          : ''}

        { this.genAnswer(
          loading,
          requested,
          message,
          artists,
        ) }
      </>
    );
  }
}

export default SearchForm;
