import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      loading: true,
    };

    this.resolveApi = this.resolveApi.bind(this);
  }

  componentDidMount() {
    this.resolveApi();
  }

  async resolveApi() {
    const response = await getUser();
    const { name } = response;

    if (typeof name === 'string') {
      this.setState({
        userName: name,
        loading: false,
      });
    }
  }

  render() {
    const {
      userName,
      loading,
    } = this.state;

    return (
      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search">
          Pesquisar
        </Link>
        <Link to="/favorites" data-testid="link-to-favorites">
          Favoritas
        </Link>
        <Link to="/profile" data-testid="link-to-profile">
          Perfil
        </Link>

        { loading ? <Loading /> : ''}
        { !loading ? <h1 data-testid="header-user-name">{ userName }</h1> : ''}
      </header>
    );
  }
}

export default Header;
