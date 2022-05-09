import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      musics: [],
    };
  }

  componentDidMount() {
    this.requestSongs();
  }

  requestSongs = async () => {
    const response = await getFavoriteSongs();
    const arr = response.length > 0 ? response : [];

    this.setState({
      loading: !Array.isArray(response),
      musics: [...arr],
    });
  }

  clearList = async (music) => {
    const { musics } = this.state;
    const ARR = musics.filter((obj) => obj.trackName !== music);
    this.setState({ musics: ARR });
  }

  render() {
    const { loading, musics } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        { loading
          ? <Loading />
          : (
            <div>
              { musics.map((music, index) => (<MusicCard
                key={ music.trackId }
                music={ music.trackName }
                preview={ music.previewUrl }
                obj={ musics[index] }
                trackId={ music.trackId }
                clearList={ this.clearList }
              />)) }
            </div>
          )}
      </div>
    );
  }
}

export default Favorites;
