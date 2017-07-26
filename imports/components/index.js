import React from 'react';
import {Link} from 'react-router';

import Signin from './signin';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Short Link App</h1>
        <Signin/>
        <Link to="/signup">Have an account?</Link>
      </div>
    );
  }
}
