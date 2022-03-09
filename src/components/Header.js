import React from 'react';
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
        { loading ? <Loading /> : ''}
        { !loading ? <h1 data-testid="header-user-name">{ userName }</h1> : ''}
      </header>
    );
  }
}

export default Header;
