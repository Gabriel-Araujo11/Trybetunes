import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false, // Loading começa no estado 'desativado';
      favoriteSongChecked: false, // Estado de checked do 'Favoritos' inicial começa desativado;
    };
  }

  addToFavorites = async ({ target }) => {
    const { music } = this.props;
    this.setState({ loading: true });
    if (target.checked) {
      await addSong(music);
      this.setState({ favoriteSongChecked: true, loading: false });
    }
  }

  render() {
    const { musics } = this.props;
    const { loading, favoriteSongChecked } = this.state;
    return (
      loading ? <Loading /> : (
        <div>
          { musics.map(({ trackId, trackName, previewUrl }) => (
            <div key={ trackId }>
              <span>{ trackName }</span>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
              <label htmlFor={ trackId }>
                Favorita
                <input
                  type="checkbox"
                  id={ trackId }
                  data-testid={ `checkbox-music-${trackId}` }
                  checked={ favoriteSongChecked }
                  onChange={ this.addToFavorites }
                />
              </label>
            </div>
          ))}
        </div>
      )
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(PropTypes.object),
  music: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    trackId: PropTypes.string,
  }),
}.isRequired;

export default MusicCard;
