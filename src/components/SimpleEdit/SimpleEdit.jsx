import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '../Loading/Loading';
import IconButton from '../IconButton/IconButton';

class SimpleEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areWeEditing: false,
      value: this.props.value,
    };
  }

  handleStartEditing = () => {
    this.setState({
      areWeEditing: true,
    });
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.props.isLoading) {
      return;
    }
    if (this.state.value) {
      this.props.callback(this.state.value);
    }
    this.setState({
      value: null,
      areWeEditing: false,
    });
  };

  render() {
    const value = this.state.value || this.props.value;
    return (
      <div>
        {this.state.areWeEditing ? (
          <form onSubmit={this.handleSubmit}>
            <input value={value} onChange={this.handleChange} />{' '}
            <IconButton type="submit" icon="check" />
          </form>
        ) : (
          <span>
            {value}{' '}
            {this.props.isLoading ? (
              <Loading small />
            ) : (
              <IconButton icon="pencil-alt" onClick={this.handleStartEditing} />
            )}
          </span>
        )}
      </div>
    );
  }
}
export default SimpleEdit;
