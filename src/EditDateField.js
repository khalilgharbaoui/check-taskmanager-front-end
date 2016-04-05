import React from 'react';
import { Link } from 'react-router';

class EditDateField extends React.Component {
  constructor() {
    super();

    this.props = {
      isEditable: true
    };

    this.state = {
      editing: false,
      value: ""
    };
  }

  dateChanged(event) {
    console.log(this.refs.input.value);

    this.props.onChange(this.refs.input.value);

    this.setState({
      editing: false
    });
  }

  handleKeyPress(event) {
    if (event.key === "Enter" || event.keyCode == 27) {
      event.target.blur();
    }
  }

  setEditable(event) {
    if (!this.props.isEditable) {
      return;
    }

    this.setState({
      editing: true
    });
  }

  render() {
    if (this.state.editing) {
      return (
        <div className="form-group">
          <input type="date" className="form-control" ref="input" onBlur={this.dateChanged.bind(this)} onKeyUp={this.handleKeyPress.bind(this)} defaultValue={this.props.value} />
        </div>
      );
    } else {
      return(
        <span onClick={this.setEditable.bind(this)}>{this.props.value}</span>
      );
    }
  }
}

export default EditDateField;
