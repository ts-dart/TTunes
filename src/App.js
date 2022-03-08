import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { createUser } from './services/userAPI';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Loading from './pages/Loading';
import './index.css';

const MIN_LIMIT_CHAR_NAME = 3;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
	  	loading: true,
      name: '',
    };

    this.addUserByClickButton = this.addUserByClickButton.bind(this);
    this.validatorAndGetName = this.validatorAndGetName.bind(this);
  }

  validatorAndGetName({ target: { value } }) {
    this.setState({ name: value });

    if (value.length >= MIN_LIMIT_CHAR_NAME) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  async addUserByClickButton() {
    const { name } = this.state;

    const response = await createUser({ name });
    if (response === 'OK') {
      this.setState({
        loading: false,
        btnClicked: true,
      });
    }
  }

  render() {
    const {
      name,
	  	loading,
      disabled,
      btnClicked,
    } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          { btnClicked && loading
            ? <Redirect to="/loading" />
            : <Redirect to="/Search" /> }
          <Route path="/loading" render={ () => <Loading /> } />
          <Route path="/profile/edit" render={ () => <ProfileEdit /> } />
          <Route path="/profile" render={ () => <Profile /> } />
          <Route path="/favorites" render={ () => <Favorites /> } />
          <Route path="/album/:id" render={ () => <Album /> } />
          <Route path="/search" render={ () => <Search /> } />
          <Route
            exact
            path="/"
            render={ () => (<Login
              name={ name }
              disabled={ disabled }
              onChange={ this.validatorAndGetName }
              onClick={ this.addUserByClickButton }
            />) }
          />
          <Route path="*" render={ () => <NotFound /> } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
