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
    console.log(favorites);
  }

  handleOnClick = async () => {
    const { album } = this.props;
    this.setState(() => ({
      carregando: true,
    }));
    await addSong(album);
    this.setState(() => ({
      carregando: false,
    }));
  };

  render() {
    const { album } = this.props;
    const { carregando, favorites } = this.state;
    if (favorites.length === 0) {
      return <p>Carregando favoritos...</p>;
    }
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
                    onClick={ this.handleOnClick }
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
