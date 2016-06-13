import React from 'react';
import counterpart from 'counterpart';

import ActiveLectures from '../lecture/ActiveLectures.component';
import Article from '../containers/Article.component';

export default class Frontpage extends React.Component {
  render() {
    return (
      <div>
        <Article
            content={counterpart.translate('general.intro.content')}
            title={counterpart.translate('general.intro.title')}
        />
        <ActiveLectures />
      </div>
    );
  }
}
