import React, { Component } from 'react';
class MyComponent extends Component {
  render() {
    return (
      <div
        style={{
          padding: '20px',
          backgroundColor: 'lightblue',
        }}
      >
        <div className="card-body">
          <div className="container">
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
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyComponent;
