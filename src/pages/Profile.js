import React from 'react';
import Header from '../components/Header';
import ProfileComponent from '../components/Profile';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <ProfileComponent />
      </div>
    );
  }
}

export default Profile;
