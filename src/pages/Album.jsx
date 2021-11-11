import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import musicsAPI from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

// Arquivo que gera o Album dentro do App.
class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      resolve: false,
    };
  }

  // compnentDidMount é utilizado pra renderizar o método que é colocado nele, por ultimo. Ou seja, após a renderização do componente, o getMusics vai ser executado.
  // https://linguinecode.com/post/understanding-react-componentdidmount
  componentDidMount() {
    this.getMusics();
  }

  // Função que pega as músicas do arquivo 'musicsAPI'.
  async getMusics() {
    const { match: { params: { id } } } = this.props;
    const getMusicss = await musicsAPI(id);
    this.setState({
      musics: getMusicss,
      resolve: true,
    });
  }

  // Função que pega os albuns dos artistas e lista-os conforme serão vindo da API; Req. 07;
  getArtistsAlbums() {
    const { musics, resolve } = this.state;
    if (resolve) {
      const { artistName, collectionName } = musics[0];
      return (
        <div>
          <h2 data-testid="album-name">{collectionName}</h2>
          <p data-testid="artist-name">{artistName}</p>
        </div>
      );
    }
  }

  render() {
    const { musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {this.getArtistsAlbums()}
        <MusicCard musics={ musics } />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
