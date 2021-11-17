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

  // Função que adiciona a musica como favorita. Req 08 primeira parte;
  addToFavorites = async ({ target }) => {
    const { music } = this.props;
    this.setState({ loading: true });
    if (target.checked) {
      await addSong(music);
      this.setState({ favoriteSongChecked: true, loading: false });
    } else {
      this.setState({ favoriteSongChecked: false });
    }
  }

  render() {
    const { trackId, trackName, previewUrl } = this.props;
    const { loading, favoriteSongChecked } = this.state;
    return (
      loading ? <Loading /> : (
        <div>
          <h4>{ trackName }</h4>
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label
            htmlFor={ trackId }
          >
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              id={ trackId }
              checked={ favoriteSongChecked }
              onChange={ this.addToFavorites }
            />
          </label>
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
