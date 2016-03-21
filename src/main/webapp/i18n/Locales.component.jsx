import React from 'react';
import counterpart from 'counterpart';

export default class Locales extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string
  };
  static defaultValues = {
    value: counterpart.getLocale()
  };
  render() {
    const locales = [];
    const translations = counterpart._registry.translations;
    for (let key in translations) {
      if (Object.hasOwnProperty.call(translations, key)) {
        locales.push(
          <option active={key === this.props.value} key={key}>
            {key}
          </option>
        );
      }
    }
    return (
      <select onChange={this.props.onChange}>
        {locales}
      </select>
    );
  }
}
