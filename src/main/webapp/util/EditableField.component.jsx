import React from 'react';

export default class EditableField extends React.Component {
  static propTypes = {
    allowChanges: React.PropTypes.bool,
    displayValue: React.PropTypes.object.isRequired,
    editField: React.PropTypes.object.isRequired
  };
  static defaultProps = {
    allowChanges: true
  }
  constructor(props, context) {
    super(props, context);
    this.state = {editing: false};
    this.startEdit = this.startEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
  }
  startEdit() {
    this.setState({editing: true});
  }
  cancelEdit() {
    const props = this.props.editField.props;
    if (props.onChange) {
      props.onChange(props.initialValue);
    } else {
      for (let key in props) {
        if (Object.hasOwnProperty.call(props, key) && props[key].onChange) {
          props[key].onChange(props[key].initialValue);
        }
      }
    }
    this.setState({editing: false});
  }
  finishEdit() {
    this.setState({editing: false});
  }
  render() {
    const {displayValue, editField, allowChanges} = this.props;
    if (this.state.editing) {
      return (
        <div className="block editable-toggle">
          <div className="block">
            {editField}
          </div>
          <div className="block">
            <button
                className="material-icons icon-submit icon-20"
                disabled={!allowChanges}
                onClick={this.finishEdit}
                type="button"
            >
              {'check'}
            </button>
            <button
                className="material-icons icon-cancel icon-20"
                onClick={this.cancelEdit}
                type="button"
            >
              {'clear'}
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="editable-toggle">
        {React.cloneElement(
          displayValue,
          {},
          <span>
            {displayValue.props.children}
            <button
                className="material-icons icon-gray icon-20"
                onClick={this.startEdit}
            >
              {'edit'}
            </button>
          </span>
        )}
      </div>
    );
  }
}
