import React, { Component } from 'react';
import JoditEditor from 'jodit-react';
import './variables.css';
import 'jodit';
import Select from 'react-select';
import { String } from 'core-js';
var _Conclusion = '';
var _MedicalRecommend = '';
var ReportText = '';
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      api: 'http://192.168.1.200:8081/api/DiagnosticReport/',
      loading: false,
      reLoad: false,
      setConclusion: false,
      setReportText: false,
      setMedicalRecommend: false,
      conclusion: '',
      ReportText: '',
      MedicalRecommend: '',
      OperationTech: '',
      InternDoctor: '',
      selectedOption: null,
      defaultOption: '',
      guests: [],
      options: [],
    };
  }

  componentDidMount() {
    this.getMauBaCao = this.getMauBaCao.bind(this);
    this.submitReport = this.submitReport.bind(this);
    this.submitVeryReport = this.submitVeryReport.bind(this);
    this.getMauBaCao();
  }
  updateConclusion = value => {
    this.setState({
      conclusion: value,
      setConclusion: true,
    });

    _Conclusion = value;
  };
  updateInternDoctor = value => {
    this.setState({
      InternDoctor: value,
    });
  };
  updateOperationTech = value => {
    this.setState({
      OperationTech: value,
    });
  };
  updateReportText = value => {
    if (!this.state.setReportText) {
      this.setState({
        ReportText: value,
        setReportText: true,
      });
    }
    _Conclusion = value;
  };
  updateMedicalRecommend = value => {
    if (!this.state.setMedicalRecommend) {
      this.setState({
        MedicalRecommend: value,
        setMedicalRecommend: true,
      });
    }
    _Conclusion = value;
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };
  render() {
    const config = {
      readonly: false, // all options from https://xdsoft.net/jodit/doc/
      minHeight: '350',
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      addNewLine: false,
    };
    const config2 = {
      readonly: false, // all options from https://xdsoft.net/jodit/doc/
      minHeight: '10%',
      toolbar: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
    };
    const config3 = {
      readonly: false, // all options from https://xdsoft.net/jodit/doc/
      minHeight: '10%',
      toolbar: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
    };
    const { selectedOption } = this.state;
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
                <form onSubmit={this.submitReport}>
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
                      <Select
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={this.state.options}
                      />
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
                                  value={this.state.InternDoctor}
                                  onChange={this.updateInternDoctor}
                                  type="text"
                                  className="form-control"
                                  name="InternDoctor"
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
                                  value={this.state.OperationTech}
                                  onChange={this.updateOperationTech}
                                  type="text"
                                  className="form-control"
                                  name="OperationTech"
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
                      value={this.state.ReportText}
                      config={config}
                      onChange={this.updateReportText.bind(this)}
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
                      value={this.state.conclusion}
                      config={config2}
                      onChange={this.updateConclusion.bind(this)}
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
                      value={this.state.MedicalRecommend}
                      config={config3}
                      onChange={this.updateMedicalRecommend.bind(this)}
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
  submitReport = async event => {
    var a = this.state.OperationTech;
    var ad = this.state.InternDoctor;

    var t = this.state.selectedOption;
    var as = 'fsdfsdfdsf';
  };
  submitVeryReport = async event => {
    var a = this.state.OperationTech;
    var ad = this.state.InternDoctor;
    var as = 'fsdfsdfdsf';
  };
  GetReportTemplate = async id => {
    await fetch(this.state.api + '/GetReportTemplate?serviceId=' + id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
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
      .then(([res, data]) => {
        if (res >= 200 && res <= 300) {
          this.state.guests = data.map(v => ({
            label: v.TemplateName,
            value: v.Id,
          }));
          var v = this.state.guests;
          data.forEach(n =>
            this.state.options.push({
              label: n.TemplateName,
              value: n.Id,
            })
          );
          this.setState({
            defaultOption: data[0].Id,
          });

          var sds = this.state.options;
        }
      });
  };
  getMauBaCao = async event => {
    await fetch(
      this.state.api +
        '/GetDiagnosticReportByStudyUID?studyUID=4102.19911656.190608005031834963',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
      .then(response => {
        const statusCode = response.status;
        if (statusCode === 403) {
          return Promise.all([statusCode, '']);
        } else {
          const data = response.json();
          return Promise.all([statusCode, data]);
        }
      })
      .then(async ([res, data]) => {
        if (res >= 200 && res <= 300) {
          var a = data.ris_OrderSchedule.ris_ImagingService;
          this.updateConclusion(data.Conclusion);
          this.updateReportText(data.ReportText);
          this.updateMedicalRecommend(data.MedicalRecommend);
          this.setState({
            OperationTech: data.OperationTech,
            InternDoctor: data.InternDoctor,
            selectedOption: data.ris_ReportTemplateId,
          });
          await this.GetReportTemplate(data.ris_ReportTemplateId);
        }
      });
  };
}
export default Login;
