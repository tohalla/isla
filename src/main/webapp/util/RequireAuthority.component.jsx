import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  auth: state.get('auth')
});
class RequireAuthority extends React.Component {
  static propTypes = {
    alternativeItem: React.PropTypes.object,
    authorities: React.PropTypes.array,
    authority: React.PropTypes.string,
    item: React.PropTypes.object.isRequired,
    oneOf: React.PropTypes.array
  }
  render() {
    const {authority, oneOf, item, alternativeItem} = this.props;
    // if passed as property, will override
    const authorities = this.props.authorities ||
      (this.props.auth.get('user') ?
        this.props.auth.getIn(['user', 'authorities']).toJS() : null
      );
    if (authorities) {
      if (
        typeof authority !== 'undefined' &&
        authorities.indexOf(authority) === -1
      ) {
        return alternativeItem || null;
      }
      if (
        typeof oneOf !== 'undefined' &&
        authorities.filter(auth => oneOf.indexOf(auth) > -1).length === 0
      ) {
        return alternativeItem || null;
      }
    } else if (authority || oneOf) {
      return alternativeItem || null;
    }
    return item;
  }
}

export default connect(
  mapStateToProps,
  {}
)(RequireAuthority);
