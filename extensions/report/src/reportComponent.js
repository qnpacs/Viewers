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
                    <label>Mẫu báo cáo</label>
                    <div className="form-group">
                      <select className="form-control">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Bác sĩ đọc cùng</label>
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
                    <label>Kỹ thuật chụp</label>
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

                  <div
                    className="col-12 modal-title text-center"
                    style={{ marginTop: 30 }}
                  >
                    <button
                      type="submit"
                      className="btn btn-success"
                      style={{ marginRight: 16 }}
                    >
                      Lưu báo cáo
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ marginRight: 16 }}
                    >
                      In báo cáo
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
