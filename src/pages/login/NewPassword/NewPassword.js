import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SmallContainer from '../../../components/SmallContainer/SmallContainer';
import loginService from '../../../services/loginService';
import loginActions from '../../../actions/loginActions';

class ForgotPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordConfirmation: '',
      submitting: false,
      submitted: false,
      error: null,
    };
    this.token = props.match.params.token;
  }

  passwordChangeHandler = event => {
    const password = event.target.value;
    let error = null;
    if (!password) {
      error = 'Empty password.';
    }
    this.setState({ password, error });
  };

  passwordConfirmationChangeHandler = event => {
    let error = null;
    const { password } = this.state;
    const passwordConfirmation = event.target.value;
    if (!passwordConfirmation) {
      error = 'Empty password confirmation.';
    } else if (passwordConfirmation !== password) {
      error = 'The passwords need to match.';
    }
    this.setState({ passwordConfirmation, error });
  };

  submitHandler = event => {
    event.preventDefault();
    this.setState({ submitting: true });

    loginService
      .changePassword({
        password: this.state.password,
        token: this.token,
      })
      .then(res => {
        if (!res.error) {
          this.props.dispatch(loginActions.login(res));
        } else {
          const newState = { submitting: false };
          if (res.code === 'OUTDATED_TOKEN') {
            newState.error =
              "Your new password's link have expired. Please start all over. Sorry about that.";
          } else {
            newState.error = res.message;
          }
          this.setState(newState);
        }
      });
  };

  renderForm() {
    const { password, passwordConfirmation, submitting, error } = this.state;
    const valid = password && passwordConfirmation && !error;
    return (
      <form className="ForgotPasswordPage__form" onSubmit={this.submitHandler}>
        <div className="field">
          <label className="label" htmlFor="password">
            Type your new password
            <input
              id="password"
              type="password"
              className="input"
              placeholder="New password"
              value={password}
              onChange={this.passwordChangeHandler}
            />
          </label>
        </div>
        <div className="field">
          <label className="label" htmlFor="passwordConfirmation">
            Confirm your new password
            <input
              id="passwordConfirmation"
              type="password"
              className="input"
              placeholder="Password confirmation"
              value={passwordConfirmation}
              onChange={this.passwordConfirmationChangeHandler}
            />
          </label>
        </div>
        {error && <p className="notification is-danger">{error}</p>}
        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              className={`button is-link ${submitting ? 'is-loading' : ''}`}
              disabled={!valid}
            >
              Submit
            </button>
          </div>
          <div className="control">
            <Link to="/login" className="button is-text">
              Login instead
            </Link>
          </div>
        </div>
      </form>
    );
  }

  renderSubmitted() {
    const { email } = this.state;
    return (
      <p className="notification is-success">
        Done! An email is on its way to {email}.
      </p>
    );
  }

  render() {
    const { submitted } = this.state;
    return (
      <SmallContainer>
        <section className="ForgotPasswordPage">
          <h2 className="title is-5">New password form</h2>
          {submitted ? this.renderSubmitted() : this.renderForm()}
        </section>
      </SmallContainer>
    );
  }
}
export default connect()(ForgotPasswordPage);