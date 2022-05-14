import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import '../style/header.css';

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

    if (typeof response === 'object') {
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
      <header data-testid="header-component" id="header">
        <div id="links">
          <a href="https://icons8.com/icon/118990/música" target="__blank">
            <img
              src="https://img.icons8.com/cute-clipart/344/music.png"
              alt="icon"
              width="35px"
              height="35px"
            />
          </a>
          <Link to="/search" data-testid="link-to-search" className="link">
            Pesquisar
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites" className="link">
            Favoritas
          </Link>
          <Link to="/profile" data-testid="link-to-profile" className="link">
            Perfil
          </Link>
        </div>

        { loading ? <Loading /> : ''}
        { !loading ? <p data-testid="header-user-name" id="name">{ userName }</p> : ''}
      </header>
    );
  }
}

export default Header;
