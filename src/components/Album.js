import React from 'react';
import PropType from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      nomeBanda: '',
      nomeAlbum: '',
      album: [],
    };
  }

  async componentDidMount() {
    await this.getIdAlbum();
    const { id } = this.state;
    const album = await getMusics(id);
    this.setState(() => ({
      nomeBanda: album[0].artistName,
      nomeAlbum: album[0].collectionName,
      album,
    }));
  }

  getIdAlbum = () => {
    const { match: { params: { id } } } = this.props;
    this.setState(() => ({
      id,
    }));
  };

  render() {
    const { nomeBanda, nomeAlbum, album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{ nomeBanda }</h1>
        <h1 data-testid="album-name">{ nomeAlbum }</h1>
        <MusicCard
          album={ album }
        />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropType.string.isRequired,
  params: PropType.string.isRequired,
  id: PropType.string.isRequired,
};

export default Album;
