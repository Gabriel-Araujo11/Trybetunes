import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();

    // Estado inicial onde o usuário é identificado com seu nome. Loading falso pois não há a necessidade do carregamento no estado inicial e o método redirectVar também, visto que é usado quando clicado no botão "Entrar", tornando-se true.

    this.state = {
      name: '',
      loading: false,
      redirectVar: false,
    };
  }

  // Função padrão que muda/'seta' o estado do nome quando o campo é preenchido;
  handleChange = ({ target }) => {
    this.setState({
      name: target.value,
    });
  }

  // https://codesource.io/how-to-use-this-props-history-push-on-your-react-project/

  render() {
    const limitMinCharacter = 3;
    const { name, loading, redirectVar } = this.state;

    return (
      <div data-testid="page-login">
        <div>
          {loading ? <Loading /> : (
            <form>
              <label htmlFor="login-name-input">
                Nome
                <input
                  type="text"
                  placeholder="Digite seu nome"
                  data-testid="login-name-input"
                  onChange={ this.handleChange }
                />
              </label>

              <div>
                <button
                  type="submit"
                  data-testid="login-submit-button"
                  disabled={ name.length < limitMinCharacter } // O nome deverá ter no mín. 3 caracteres. Se for menor, o botão manterá 'disabled', ou seja, desativado. - Req 02.
                  onClick={ async () => {
                    this.setState({ loading: true });
                    await createUser({ name });
                    this.setState({ loading: false });
                    this.setState({ redirectVar: true });
                  } }
                >
                  Entrar
                </button>
                {redirectVar && <Redirect to="/search" />}
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default Login;
