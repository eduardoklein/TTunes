import React from 'react';
import PropType from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { album } = this.props;
    console.log(album);
    return (
      <div>
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
