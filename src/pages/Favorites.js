import React from 'react';
import Header from '../components/Header';
/* import { getFavoriteSongs } from '../services/favoriteSongsAPI'; */

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <div>Musicas favoritas</div>
      </div>
    );
  }
}

export default Favorites;
