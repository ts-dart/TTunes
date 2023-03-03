import React from 'react';
import '../style/footer.css';

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <p>Made by Thiago</p>
        <div>
          <a href='https://github.com/ts-dart' target='_blank' rel="noreferrer"><img src='' alt=''/></a>
          <a href='https://www.linkedin.com/in/thiago-henrique-da-silva-souza-634162127/' target='_blank' rel="noreferrer"><img src='' alt=''/></a>
        </div>
      </footer>
    );
  }
}