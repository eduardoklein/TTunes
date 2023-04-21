import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
