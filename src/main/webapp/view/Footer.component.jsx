import React from 'react';
import counterpart from 'counterpart';

export default class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <span className="github">
          <a href="https://github.com/tohalla/isla">
            {counterpart.translate('general.footer.github')}
          </a>
        </span>
      </div>
    );
  }
}
