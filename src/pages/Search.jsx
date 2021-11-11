import React from 'react';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <input data-testid="search-artist-input" />
        <button type="button" data-testid="search-artist-button">
          Pesquisar
        </button>
      </div>
    );
  }
}

export default ProfileEdit;
