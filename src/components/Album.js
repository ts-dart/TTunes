import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from './MusicCard';
import Loading from '../pages/Loading';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class AlbumComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      musicsObj: [],
      musics: [],
      preview: [],
      trackId: [],
      favSongs: [],
      artist: '',
      collection: '',
      numObjSongs: '',
      loading: true,
    };

    this.getResponseFromApi = this.getResponseFromApi.bind(this);
    this.getValues = this.getValues.bind(this);
    this.getSongsFromApi = this.getSongsFromApi.bind(this);
  }

  componentDidMount() {
    this.getResponseFromApi();
    this.getSongsFromApi();
  }

  async getSongsFromApi() {
    const response = await getFavoriteSongs();

    if (typeof response === 'object') {
      this.setState({
        loading: false,
        favSongs: [...response],
      });
    }
  }

  async getResponseFromApi() {
    const { id } = this.props;
    const response = await getMusics(id);
    this.setState({ musicsObj: [...response] }, this.getValues);
  }

  getValues() {
    const { musicsObj } = this.state;
    const { artistName } = musicsObj[0];
    const { collectionName } = musicsObj[0];

    const musicsList = [];
    const previewList = [];
    const trackId = [];

    musicsObj.forEach((curr) => {
      if (curr.trackName) {
        musicsList.push(curr.trackName);
        previewList.push(curr.previewUrl);
        trackId.push(curr.trackId);
      }
    });

    this.setState({
      artist: artistName,
      collection: collectionName,
      numObjSongs: musicsObj.length,
      trackId: [...trackId],
      musics: [...musicsList],
      preview: [...previewList],
    });
  }

  render() {
    const {
      musics,
      artist,
      collection,
      preview,
      loading,
      musicsObj,
      trackId,
      favSongs,
      numObjSongs,
    } = this.state;

    if (musicsObj.length === numObjSongs) {
      musicsObj.shift();
    }
    console.log(musicsObj);
    return (
      <div>
        { loading
          ? <Loading />
          : (
            <div>
              <h1 data-testid="artist-name">{ artist }</h1>
              <h2 data-testid="album-name">{ collection }</h2>
              <div>
                { musics.map((music, index) => (<MusicCard
                  key={ music }
                  music={ music }
                  preview={ preview[index] }
                  obj={ musicsObj[index] }
                  trackId={ trackId[index] }
                  favSong={ favSongs[index] !== undefined
                    ? favSongs[index]
                    : '' }
                />)) }
              </div>
            </div>
          )}
      </div>
    );
  }
}

AlbumComponent.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AlbumComponent;
