import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../_input.scss';

export default class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      condition: false
    };
  }
  
  handleChange = ({ target: { checked }}) => {
    const { onChange } = this.props;
    this.setState({
      condition: checked
    });
    onChange(checked.toString());
  }

  render() {
    const { name } = this.props;
    const { condition } = this.state;
    return (
      <label htmlFor="checkbox" className="container">
        Require file attachment
        <input
          type="checkbox"
          id="checkbox"
          name={name}
          checked={condition}
          onChange={this.handleChange}
        />
        <span className="checkmark" />
      </label>
    );
  }
}

CheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
