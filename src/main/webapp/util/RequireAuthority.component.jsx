import React from 'react';

export default class RequireAuthority extends React.Component {
  static propTypes = {
    authorities: React.PropTypes.array,
    authority: React.PropTypes.string,
    item: React.PropTypes.object.isRequired,
    oneOf: React.PropTypes.array
  }
  render() {
    const {authority, oneOf, authorities, item} = this.props;
    if (authorities) {
      if (
        typeof authority !== 'undefined' &&
        authorities.indexOf(authority) === -1
      ) {
        return null;
      }
      if (
        typeof oneOf !== 'undefined' &&
        authorities.filter(auth => oneOf.indexOf(auth) > -1).length === 0
      ) {
        return null;
      }
    } else if (authority || oneOf) {
      return null;
    }
    return item;
  }
}
