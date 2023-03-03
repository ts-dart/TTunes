import React from 'react';
import '../style/footer.css';

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <p>Made by Thiago</p>
        <div>
          <a href='https://github.com/ts-dart' target='_blank' rel="noreferrer">
            <img 
              id='imgGithubLogo'
              src='https://raw.githubusercontent.com/ts-dart/TTunes/main/public/images/icons8-github-96.png' 
              alt='GitHub logo'
            />
            </a>
          <a href='https://www.linkedin.com/in/thiago-henrique-da-silva-souza-634162127/' target='_blank' rel="noreferrer">
            <img 
              id='imgLinkedinLogo'
              src='https://raw.githubusercontent.com/ts-dart/TTunes/main/public/images/icons8-linkedin-50.png' 
              alt='Linkedin logo'
            />
          </a>
        </div>
      </footer>
    );
  }
}