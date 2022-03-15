import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      marked: false,
      loading: '',
    };

    this.checkValidation = this.checkValidation.bind(this);
    this.checkValidationFavSongs = this.checkValidationFavSongs.bind(this);
  }

  componentDidMount() {
    this.checkValidationFavSongs();
  }

  async checkValidation() {
    const { obj } = this.props;

    this.setState((prev) => ({
      marked: !prev.marked,
      loading: true,
    }));

    const response = await addSong(obj);

    if (response === 'OK') {
      this.setState({ loading: false });
    }
  }

  checkValidationFavSongs() {
    const {
      music,
      favSong,
    } = this.props;

    if (music === favSong.trackName) {
      this.setState((prev) => ({ marked: !prev.marked }));
    }
  }

  render() {
    const {
      music,
      preview,
      trackId,
    } = this.props;

    const {
      loading,
      marked,
    } = this.state;

    return (
      <div>
        { loading
          ? <Loading />
          : (
            <div>
              <p>{ music }</p>
              <audio data-testid="audio-component" src={ preview } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor="fav">
                Favorita
                <input
                  type="checkbox"
                  id="fav"
                  checked={ marked }
                  onChange={ this.checkValidation }
                  data-testid={ `checkbox-music-${trackId}` }
                />
              </label>
            </div>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  obj: PropTypes.objectOf(PropTypes.any).isRequired,
  favSong: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MusicCard;
