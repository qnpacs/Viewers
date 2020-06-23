import React, { Component } from 'react';
import JoditEditor from 'jodit-react';
import './variables.css';
import 'jodit';
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      api: 'ApiServer.URL',
      loading: false,
      reLoad: false,
      content: '',
      content2: '',
      content3: 'content3',
    };
  }

  componentDidMount() {
    this.getMauBaCao = this.getMauBaCao.bind(this);
    this.getMauBaCao();
  }
  updateContent(value) {
    this.setState({ content: value });
  }

  updateContent2(value) {
    this.setState({ content2: value }, () => {
      console.log('updated state value', this.state.content2);
    });
    var d = this.state.content2;
  }
  updateContent3(value) {
    this.setState({ content3: value });
  }
  render() {
    const config = {
      readonly: false, // all options from https://xdsoft.net/jodit/doc/
      minHeight: '50%',
      height: '300',
    };
    const config2 = {
      readonly: false, // all options from https://xdsoft.net/jodit/doc/
      minHeight: '10%',
      toolbar: false,
    };
    const config3 = {
      readonly: false, // all options from https://xdsoft.net/jodit/doc/
      minHeight: '10%',
      toolbar: false,
    };
    return (
      <div
        style={{
          padding: '20px',
        }}
      >
        <div className="card-body">
          <div className="container">
            <div className="row  justify-content-center ">
              <div className="col-12 col-md-12">
                <form>
                  <div className="form-group">
                    <div
                      className="form-group"
                      style={{
                        padding: '5px',
                      }}
                    >
                      <label className="lableColor">Mẫu báo cáo</label>
                    </div>
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
                    <table id="top-leader" className="Table-Normal">
                      <tbody>
                        <tr>
                          <td>
                            <div className="form-group">
                              <div
                                className="form-group"
                                style={{
                                  padding: '5px',
                                }}
                              >
                                <label className="lableColor">
                                  Bác sĩ đọc cùng
                                </label>
                              </div>
                              <div className="form-group ">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="userName"
                                  required
                                />
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="form-group">
                              <div
                                className="form-group"
                                style={{
                                  padding: '5px',
                                }}
                              >
                                <label className="lableColor">
                                  Kỹ thuật chụp
                                </label>
                              </div>
                              <div className="form-group ">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="userName"
                                  required
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="form-group">
                    <div
                      className="form-group"
                      style={{
                        padding: '5px',
                      }}
                    >
                      <label className="lableColor">Báo cáo chẩn đoán</label>
                    </div>
                    <JoditEditor
                      value={this.state.content}
                      config={config}
                      onChange={this.updateContent.bind(this)}
                    />
                  </div>
                  <div className="form-group">
                    <div
                      className="form-group"
                      style={{
                        padding: '5px',
                      }}
                    >
                      <label className="lableColor">Kết luận</label>
                    </div>
                    <JoditEditor
                      value={this.state.content2}
                      config={config2}
                      onChange={this.updateContent2.bind(this)}
                    />
                  </div>
                  <div className="form-group">
                    <div
                      className="form-group"
                      style={{
                        padding: '5px',
                      }}
                    >
                      <label className="lableColor">Đề nghị</label>
                    </div>
                    <JoditEditor
                      value={this.state.content3}
                      config={config3}
                      onChange={this.updateContent3.bind(this)}
                    />
                  </div>
                  <div
                    className="col-12 modal-title text-center"
                    style={{ marginTop: 30 }}
                  >
                    <table id="top-leader" className="Table-Normal">
                      <tbody>
                        <tr>
                          <td>
                            <button
                              type="submit"
                              className="btn btn-danger"
                              style={{
                                marginRight: 16,
                                backgroundColor: 'green',
                              }}
                            >
                              <div>Lưu báo cáo</div>
                            </button>
                            <button
                              type="submit"
                              className="btn"
                              style={{
                                marginRight: 16,
                              }}
                            >
                              Xác nhận
                            </button>
                          </td>
                          <td>
                            <button
                              type="submit"
                              className="btn btn-primary"
                              style={{ marginRight: 16 }}
                            >
                              In báo cáo
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getMauBaCao = async event => {
    this.updateContent2('ddasdsdsadsdsadsa');
  };
  submitReport = async event => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    await fetch(this.state.api + '/account/update', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({
        fullName: this.state.fullName,
        email: this.state.email,
        phone: this.state.phoneNumber,
      }),
    })
      .then(response => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(
        ([res, data]) => {
          if (res === 200) {
            this.setState({
              loading: false,
            });
            document.getElementById('profileModal').style.display = 'none';
            var all = document.getElementsByClassName('modal-backdrop');
            for (var i = 0; i < all.length; i++) {
              all[i].style.display = 'none';
            }
            sessionStorage.setItem('message', 'Update successful!');
            sessionStorage.setItem('isEnable', true);
            sessionStorage.setItem('state', 'success');
            window.location.reload();
          } else {
            this.setState({
              errorMessage: 'Error while update!',
              loading: false,
            });
          }
        },
        error => {
          this.setState({
            errorMessage: 'An error occurred at the server!',
            loading: false,
          });
        }
      );
  };
}

export default Login;
