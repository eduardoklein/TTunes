import React from 'react';
import { useHistory } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      name: '',
      carregando: false,
    };
  }

  handleOnChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(() => ({ [name]: value }), () => {
      this.btnEnable();
    });
  };

  handleClick = async () => {
    this.setState(() => ({
      carregando: true,
    }));
    const { name } = this.state;
    await createUser({ name });
    const { history } = this.props;
    history.push('/search');
    this.setState(() => ({
      carregando: false,
    }));
  };

  btnEnable = () => {
    const { name } = this.state;
    const lenghtToEnable = 3;
    if (name.length >= lenghtToEnable) {
      this.setState(() => ({
        buttonDisabled: false,
      }));
    } else {
      this.setState(() => ({
        buttonDisabled: true,
      }));
    }
  };

  handleCarregando = () => {
    const { carregando } = this.state;
    if (carregando) {
      return <div>Carregando...</div>;
    }
  };

  render() {
    const { buttonDisabled, carregando } = this.state;
    return (
      <div data-testid="page-login">
        <label htmlFor="name">
          { 'Insira seu nome: ' }
          <input
            data-testid="login-name-input"
            id="name"
            name="name"
            type="text"
            onChange={ this.handleOnChange }
          />
        </label>
        { carregando ? <p>Carregando...</p> : (
          <button
            data-testid="login-submit-button"
            disabled={ buttonDisabled }
            onChange={ this.btnEnable }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        )}
      </div>
    );
  }
}

export default Login;
