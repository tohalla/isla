import React from 'react';
import DevTools from './DevTools';

const App = class extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
        {process.env.NODE_ENV === 'production' ? null : <DevTools />}
      </div>
    );
  }
};

export default App;

// translations
require('./i18n/translations');
// styles
require('normalize.css/normalize.css');
require('./styles/main.scss');