import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, setLogingSuccess } from '../../actions/loginActions';
import { Header } from '../Shared/header';
import PropTypes from 'prop-types';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'admin@example.com',
      password: 'admin'
    };
  }

  componentWillReceiveProps(nextProps) {
    const { isLoginSuccess } = this.props;
    if (!isLoginSuccess && nextProps.isLoginSuccess) {
      this.props.history.push('/');
    }
  }

  render() {
    let { isLoginPending, isLoginSuccess, isLoginError } = this.props;

    return (
      <div className="col-md-6 col-md-offset-3" onSubmit={this.onSubmit}>
        <Header />
        <h3>Login</h3>
        <form name="LoginForm">
          <label htmlFor="email">Email:</label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={this.state.email}
            onChange={e => this.setEmail(e)}
          />
          <br />
          <label>Password:</label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={this.state.password}
            onChange={e => this.setPassword(e)}
          />
          <br />
          <input type="submit" value="Login" className="btn btn-primary" />

          {isLoginPending && <div>Please Wait...</div>}
          {isLoginSuccess && (
            <div>
              Logged-in successfully, please wait while we take you to home...
            </div>
          )}
          {isLoginError && <div>{isLoginError.message}</div>}
        </form>
      </div>
    );
  }

  goHome = function() {
    this.props.setLogingSuccess(false);
    this.props.history.push('/');
  };

  setEmail = function(e) {
    this.setState({
      email: e.target.value
    });
  };

  setPassword = function(e) {
    this.setState({
      password: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    let { email, password } = this.state;
    this.props.login(email, password);
  };
}
LoginForm.propTypes = {
  isLoginPending: PropTypes.bool,
  isLoginSuccess: PropTypes.bool,
  isLoginError: PropTypes.object,
  login: PropTypes.func,
  history: PropTypes.object,
  setLogingSuccess: PropTypes.func
};

const mapStateToProps = state => {
  return {
    isLoginPending: state.reducer.isLoginPending,
    isLoginSuccess: state.reducer.isLoginSuccess,
    isLoginError: state.reducer.isLoginError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password)),
    setLogingSuccess: status => dispatch(setLogingSuccess(status))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
