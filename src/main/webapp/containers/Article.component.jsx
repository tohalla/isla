import React from 'react';

export default class Article extends React.Component {
  static propTypes = {
    content: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired
  }
  render() {
    const {title, content} = this.props;
    return (
      <div className="container article">
        <h1 className="article-title">{title}</h1>
        <div className="article-content">
          {content}
        </div>
      </div>
    );
  }
}
