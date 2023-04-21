import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: true,
      user: '',
    };
  }

  async componentDidMount() {
    await this.handleGetUser();
  }

  handleGetUser = async () => {
    this.setState(() => ({
      carregando: true,
    }));
    const user = await getUser();
    this.setState(() => ({
      carregando: false,
      user,
    }));
  };

  render() {
    const { carregando, user } = this.state;
    return (
      <header data-testid="header-component">
        {carregando
          ? <p>Carregando...</p> : <h1 data-testid="header-user-name">{ user.name }</h1>}
      </header>
    );
  }
}

export default Header;
