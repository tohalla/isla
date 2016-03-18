import React from 'react';

import {AuthenticationContainer} from '../auth/Authentication.component';

export default class TopBar extends React.Component {
  render() {
    return (
      <nav>
        <AuthenticationContainer />
      </nav>
    );
  }
}
