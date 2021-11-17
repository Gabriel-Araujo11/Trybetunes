import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      nameArtist: '',
      loading: false,
      artist: [],
      inputAlbum: '',
    };
  }

  // Função genérica que seta o valor recebido pelo nameArtist;
  handleChange = ({ target }) => {
    this.setState({
      nameArtist: target.value,
    });
  }

  // Requisito feito com base no racicínio de Fernanda Andrade; Req 06;
  // Função que altera o valor quando feita a requisição/pesquisa do artista;
  // Loading se torna true enquanto procura a requisição feita do artista no método searchAlbumsAPI;
  // Se o tamanho da requisição for diferente de 0, retornará um valor booleano (true ou false). No caso, true pro 'inputAlbum: `Resultado de álbuns de: ${artistName} `' e false pro inputAlbum: 'Nenhum álbum foi encontrado';
  handleArtist = async (artistName) => {
    this.setState({ loading: true });
    const artist = await searchAlbumsAPI(artistName);
    if (artist.length !== 0) {
      return this.setState({
        loading: false,
        inputAlbum: `Resultado de álbuns de: ${artistName} `,
        nameArtist: '',
        artist,
      });
    }
    return this.setState({
      loading: false,
      inputAlbum: 'Nenhum álbum foi encontrado',
      nameArtist: '',
    });
  }

  render() {
    const { nameArtist, loading, artist, inputAlbum } = this.state;
    const minCharacterArtist = 2; // Req 05;
    const buttonDisabled = nameArtist.length < minCharacterArtist; // O botão ficará desabilitado se o nome digitado no campo artistName for menor que 2 caracteres; Req 05

    return (
      <div>
        <Header />
        {loading === true
          ? <Loading />
          : (
            <div data-testid="page-search">
              <input
                data-testid="search-artist-input"
                value={ nameArtist }
                placeholder="Nome do artista"
                onChange={ this.handleChange }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ buttonDisabled }
                onClick={ () => this.handleArtist(nameArtist) }
              >
                Pesquisar
              </button>
            </div>)}

        <div>
          <h3>{inputAlbum}</h3>
          <ul>
            {artist.map((i) => ( // Método map utilizado para renderizar os detalhes vindos da API, quando o que for digitado no nameArtist se 'transformar' na constante artist e, assim, trazer a resposta completa do artista na página;
              <li key="info.artistId">
                <p>{i.artistName}</p>
                <h4>{i.collectionName}</h4>
                <p>{i.collectionPrice}</p>
                <img src={ i.artworkUrl100 } alt={ i.collectionName } />
                <Link
                  data-testid={ `link-to-album-${i.collectionId}` }
                  to={ `/album/${i.collectionId}` }
                >
                  Album
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Search;
