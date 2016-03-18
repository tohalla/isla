import React from 'react';
import DevTools from './DevTools.component';

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
