import React from 'react';
import PropType from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: false,
      favorites: [],
    };
  }

  async componentDidMount() {
    const favorites = await getFavoriteSongs();
    this.setState(() => ({
      favorites,
    }));
  }

  handleClick = async (music) => {
    const { favorites } = this.state;
    const isFavorite = favorites.some((fav) => fav.trackId === music.trackId);
    const newFavorites = isFavorite
      ? favorites.filter((fav) => fav.trackId !== music.trackId)
      : [...favorites, music];
    this.setState({ favorites: newFavorites });
    this.toggleFavorite(music);
    this.setState(() => ({
      carregando: true,
    }));
    await addSong(music);
    this.setState(() => ({
      carregando: false,
    }));
  };

  toggleFavorite = (music) => {
    const { favorites } = this.state;
    const isFavorite = favorites.some((fav) => fav.trackId === music.trackId);
    const newFavorites = isFavorite
      ? favorites.filter((fav) => fav.trackId !== music.trackId)
      : [...favorites, music];
    this.setState({ favorites: newFavorites });
  };

  render() {
    const { album } = this.props;
    const { carregando, favorites } = this.state;
    return (
      <div>
        {carregando && <p>Carregando...</p>}
        { album.map((music, index) => (
          index === 0
            ? null
            : (
              <div key={ music.trackId }>
                <p>{ music.trackCensoredName }</p>
                <audio
                  data-testid="audio-component"
                  src={ music.previewUrl }
                  controls
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label
                  data-testid={ `checkbox-music-${music.trackId}` }
                >
                  Favorita
                  <input
                    type="checkbox"
                    onClick={ () => this.handleClick(music) }
                    checked={ favorites.some((fav) => fav.trackId === music.trackId) }
                  />
                </label>
              </div>
            ))) }
      </div>
    );
  }
}

MusicCard.propTypes = {
  album: PropType.string.isRequired,
};

export default MusicCard;
