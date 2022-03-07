import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import './index.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/profile/edit" render={ () => <ProfileEdit /> } />
          <Route path="/profile" render={ () => <Profile /> } />
          <Route path="/favorites" render={ () => <Favorites /> } />
          <Route path="/album/:id" render={ () => <Album /> } />
          <Route path="/search" render={ () => <Search /> } />
          <Route exact path="/" render={ () => <Login /> } />
          <Route path="*" render={ () => <NotFound /> } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
