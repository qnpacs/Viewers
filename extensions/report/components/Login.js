import React, { Component } from 'react';
import './Login.css';
import ApiServer from 'assets/ApiServer';
import { withRouter } from 'react-router-dom';
import Spinner from '../../layout/tools/Spinner';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: ApiServer.URL,
      userName: '',
      password: '',
      errorMessage: '',
      loading: false,
      reLoad: false,
    };
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
      errorMessage: '',
    });
  }

  closeModal() {
    document.getElementById('loginModal').style.display = 'none';
    var all = document.getElementsByClassName('modal-backdrop');
    for (var i = 0; i < all.length; i++) {
      all[i].style.display = 'none';
    }
  }

  render() {
    return (
      <div className="container">
        <Spinner loading={this.state.loading} />
        <div className="row  justify-content-center ">
          <div className="col-12 col-md-12">
            <form id="loginForm" onSubmit={this.login}>
              <div className="form-group">
                <label>User Name</label>
                <div className="left-inner-addon">
                  <i className="fas fa-user-edit"></i>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter user name"
                    name="userName"
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="left-inner-addon">
                  <i className="fas fa-key"></i>
                  <i
                    id="hide"
                    className="fas fa-eye-slash"
                    style={{ right: 0, pointerEvents: 'visible' }}
                    onClick={this.showPassword}
                    title="Show password"
                  ></i>
                  <i
                    id="show"
                    className="fas fa-eye"
                    style={{
                      right: 0,
                      pointerEvents: 'visible',
                      display: 'none',
                    }}
                    onClick={this.hidePassword}
                    title="Hide password"
                  ></i>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    name="password"
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
              <div
                className="col-12 modal-title text-center"
                style={{ marginTop: 30 }}
              >
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ marginRight: 16 }}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ marginLeft: 16 }}
                  onClick={this.closeModal}
                >
                  Close
                </button>
              </div>
              <div className="col-12 modal-title text-center">
                {this.state.errorMessage === '' ? (
                  <label style={{ display: 'none' }}></label>
                ) : (
                  <label style={{ marginTop: 8, color: 'red' }}>
                    {this.state.errorMessage}
                  </label>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  showPassword = () => {
    var show = document.getElementById('show');
    var hide = document.getElementById('hide');
    var password = document.getElementById('password');
    password.type = Text;
    show.style.display = 'block';
    hide.style.display = 'none';
  };

  hidePassword = () => {
    var show = document.getElementById('show');
    var hide = document.getElementById('hide');
    var password = document.getElementById('password');
    password.type = 'password';
    show.style.display = 'none';
    hide.style.display = 'block';
  };

  login = async event => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    var handleToUpdate = this.props.handleToUpdate;
    await fetch(this.state.api + '/account/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.userName,
        password: this.state.password,
      }),
    })
      .then(response => {
        const statusCode = response.status;
        if (statusCode === 403) {
          return Promise.all([statusCode, '']);
        } else {
          const data = response.json();
          return Promise.all([statusCode, data]);
        }
      })
      .then(
        ([res, data]) => {
          if (res >= 200 && res <= 300) {
            this.setState({
              loading: false,
            });
            localStorage.setItem('token', data.accessToken);
            document.getElementById('loginModal').style.display = 'none';
            var all = document.getElementsByClassName('modal-backdrop');
            for (var i = 0; i < all.length; i++) {
              all[i].style.display = 'none';
            }
            window.location.reload();

            this.setState({
              reLoad: true,
            });
            handleToUpdate(this.state.reLoad);
          } else {
            this.setState({
              errorMessage: data.message,
              loading: false,
            });
          }
        },
        error => {
          this.setState({
            errorMessage: 'Can not connect to server!',
            loading: false,
          });
        }
      );
  };
}

export default withRouter(Login);
