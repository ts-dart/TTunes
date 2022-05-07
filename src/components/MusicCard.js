import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';

import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      marked: false,
      loading: '',
    };

    this.checkValidation = this.checkValidation.bind(this);
    this.getSongsFromApi = this.getSongsFromApi.bind(this);
    this.convertValue = this.convertValue.bind(this);
  }

  componentDidMount() {
    this.getSongsFromApi();
  }

  async getSongsFromApi() {
    const { music } = this.props;
    const response = await getFavoriteSongs();
    const arr = response.length > 0 ? response : [];

    if (arr.some((obj) => obj.trackName === music)) {
      this.setState((prev) => ({ marked: !prev.marked }));
    }
  }

  async convertValue(func, obj) {
    this.setState((prev) => ({
      marked: !prev.marked,
      loading: true,
    }));

    const response = await func(obj);

    if (response === 'OK') {
      this.setState({ loading: false });
    }
  }

  checkValidation() {
    const { marked } = this.state;
    const { obj } = this.props;

    if (marked === false) this.convertValue(addSong, obj);
    else this.convertValue(removeSong, obj);

    /* this.setState((prev) => ({
      marked: !prev.marked,
      loading: true,
    }));

    const response = await addSong(obj);
    const responseTwo = await removeSong(obj);

    if (response === 'OK') {
      this.setState({ loading: false });
    } */
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
  /* favSong: PropTypes.objectOf(PropTypes.any).isRequired, */
};

export default MusicCard;
