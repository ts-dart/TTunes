import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import '../style/musicCard.css';

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

    const { clearList, music } = this.props;
    clearList(music);
  }

  checkValidation() {
    const { marked } = this.state;
    const { obj } = this.props;

    if (marked === false) this.convertValue(addSong, obj);
    else this.convertValue(removeSong, obj);
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
      <div className="div-player">
        { loading
          ? <Loading typeLoadingClass={'loading-music-card'}/>
          : (
            <>
              <div className="favbox-infos">
                <div id="fav">
                  <p className="favP" id='titleMusic'>{ music }</p>
                  <label htmlFor="fav" id="labelFav">
                    <p className="favP">Favoritar</p>
                    <input
                      type="checkbox"
                      checked={ marked }
                      onChange={ this.checkValidation }
                      data-testid={ `checkbox-music-${trackId}` }
                    />
                  </label>
                </div>
                <img src='https://raw.githubusercontent.com/ts-dart/TTunes/main/public/images/icons8-cd-64%20(1).png'/>
              </div>
              <div id='player-content'>
                <audio
                  data-testid="audio-component"
                  src={ preview }
                  id="audio-component"
                  controls
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>
              </div>
            </>
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
  clearList: PropTypes.func.isRequired,
};

export default MusicCard;
