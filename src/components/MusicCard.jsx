import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

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
      await getFavoriteSongs();
      this.setState({ favoriteSongChecked: true, loading: false });
    }
  }

  render() {
    const { musics } = this.props;
    const { loading, favoriteSongChecked } = this.state;
    return (
      loading ? <Loading /> : (
        <div>
          { musics.slice(1).map(({ trackId, trackName, previewUrl }) => ( //  .Slice retorna uma cópia de parte de um array a partir de um subarray criado entre as posições início e fim de um array original. O Array original não é modificado.
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