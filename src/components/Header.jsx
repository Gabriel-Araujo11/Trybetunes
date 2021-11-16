import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.learnUser = this.learnUser.bind(this);

    this.state = {
      loading: false,
      user: '',
    };
  }

  componentDidMount() {
    this.learnUser();
  }

  // Método que recupera o nome do usuário logado e altera o estado de loading para que apareça, enquanto loga, a frase 'carregando...';
  // Após a pessoa logar colocando o seu nome, o loading se torna falso, visto que não há a necessidade da mensagem, já que a mesma foi carregada, atualizando, assim, o nome e retirando a mensagem; - Req. 03.
  async learnUser() {
    this.setState({ loading: true });
    const user = await getUser();
    const { name } = user;
    this.setState({ name, loading: false });
  }

  render() {
    const { loading, user, name } = this.state;
    return (
      // Se loading for true, renderizará o componente Loading, senão, renderizará o estado atual do usuário;
      <header data-testid="header-component">
        { loading ? <Loading /> : user }
        Header Component
        <nav>
          <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </nav>
        <span data-testid="header-user-name">
          { name }
        </span>
      </header>
    );
  }
}

export default Header;
