import React from 'react';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
    };
  }

  // Função genérica que seta o valor recebido pelo artistName;
  handleChange = ({ target }) => {
    this.setState({
      artistName: target.value,
    });
  }

  render() {
    const { artistName } = this.state;
    const minCharacterArtist = 2; // Req 08;
    const buttonDisabled = artistName.length < minCharacterArtist; // O botão ficará desabilitado se o nome digitado no campo artistName for menor que 2 caracteres; Req 08

    return (
      <div data-testid="page-search">
        <Header />
        <input
          data-testid="search-artist-input"
          value={ artistName }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ buttonDisabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default ProfileEdit;
