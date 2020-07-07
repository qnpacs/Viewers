import React, { Component } from 'react';
import './variables.css';
import Select from 'react-select';
import './react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { ServicesManager, UINotificationService } from '@ohif/core';
const servicesManager = new ServicesManager();

servicesManager.registerService(UINotificationService);

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      api: 'http://192.168.1.200:8081/api/DiagnosticReport/',
      loading: false,
      reLoad: false,
      Conclusion: EditorState.createEmpty(),
      ReportText: EditorState.createEmpty(),
      MedicalRecommend: EditorState.createEmpty(),
      OperationTech: '',
      InternDoctor: '',
      selectedOption: null,
      defaultOption: '',
      options: [],
      ris_OrderScheduleId: '',
      ris_ReportTemplateId: '',
      reportId: '',
      value: 'ÁDSADSAD',
    };
    this.getMauBaCao = this.getMauBaCao.bind(this);
    this.submitReport = this.submitReport.bind(this);
    this.submitVeryReport = this.submitVeryReport.bind(this);
    this.printReport = this.printReport.bind(this);
    this.updateInternDoctor = this.updateInternDoctor.bind(this);
    this.updateOperationTech = this.updateOperationTech.bind(this);

    this.getMauBaCao();
  }
  handleChange(value) {
    this.setState({ selectedOption: value });
  }
  onConclusionChange = Conclusion => {
    this.setState({
      Conclusion,
    });
  };
  onReportTextChange = ReportText => {
    this.setState({
      ReportText,
    });
  };
  onMedicalRecommendChange = MedicalRecommend => {
    this.setState({
      MedicalRecommend,
    });
  };
  updateInternDoctor(event) {
    this.setState({ InternDoctor: event.target.value });
  }
  updateOperationTech(event) {
    this.setState({ OperationTech: event.target.value });
  }

  render() {
    const { Conclusion, ReportText, MedicalRecommend } = this.state;
    const { UINotificationService } = servicesManager.services;

    return (
      <div
        style={{
          padding: '20px',
          // backgroundColor: 'white',
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
                    <div className="form-group">{this.SelectComBobox()}</div>
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
                                  value={this.state.InternDoctor}
                                  onChange={this.updateInternDoctor}
                                  name="InternDoctor"
                                  className="form-control"
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
                    <Editor
                      editorState={ReportText}
                      wrapperClassName="demo-wrapper"
                      editorClassName="demo-editor"
                      onEditorStateChange={this.onReportTextChange}
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
                    <Editor
                      toolbarHidden
                      editorState={Conclusion}
                      wrapperClassName="demo-wrapper"
                      editorClassName="demo-editor"
                      onEditorStateChange={this.onConclusionChange}
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
                    <Editor
                      toolbarHidden
                      editorState={MedicalRecommend}
                      wrapperClassName="demo-wrapper"
                      editorClassName="demo-editor"
                      onEditorStateChange={this.onMedicalRecommendChange}
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
                              id="btnSaveReport"
                              type="button"
                              onClick={this.submitReport}
                              className="btn btn-danger"
                              style={{
                                display: 'none',
                                marginRight: 16,
                                backgroundColor: 'green',
                              }}
                            >
                              <div>Lưu báo cáo</div>
                            </button>

                            <button
                              id="btnVeryReport"
                              type="button"
                              onClick={this.submitVeryReport}
                              className="btn btn-primary"
                              style={{
                                marginRight: 16,
                                display: 'none',
                                color: 'black',
                                backgroundColor: 'white',
                              }}
                            >
                              Xác nhận
                            </button>
                          </td>
                          <td>
                            <button
                              id="btnPrintReport"
                              type="button"
                              className="btn btn-primary"
                              style={{ marginRight: 16, display: 'none' }}
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
  SelectComBobox = Group => {
    return (
      <React.Fragment>
        <Select
          options={this.state.options}
          value={this.state.selectedOption}
          onChange={value => this.handleChange(value)}
        />
      </React.Fragment>
    );
  };

  editorStateReportText(text) {
    if (text != null) {
      const regex = /<p><br><\/p>/g;

      const myString = text.replace(regex, '');
      const blocksReportText = htmlToDraft(myString);
      const { contentBlocks, entityMap } = blocksReportText;
      const contentStateReportText = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const editorStateReportText = EditorState.createWithContent(
        contentStateReportText
      );
      this.setState({
        ReportText: editorStateReportText,
      });
    }
  }

  editorStateConclusion(text) {
    if (text != null) {
      const blocksConclusion = htmlToDraft(text);
      const contentStateConclusion = ContentState.createFromBlockArray(
        blocksConclusion.contentBlocks,
        blocksConclusion.entityMap
      );
      const editorStateConclusion = EditorState.createWithContent(
        contentStateConclusion
      );
      this.setState({
        Conclusion: editorStateConclusion,
      });
    }
  }

  editorStateMedicalRecommendt(text) {
    if (text != null) {
      const blocksMedicalRecommend = htmlToDraft(text);
      const contentStateMedicalRecommend = ContentState.createFromBlockArray(
        blocksMedicalRecommend.contentBlocks,
        blocksMedicalRecommend.entityMap
      );
      const editorStateMedicalRecommendt = EditorState.createWithContent(
        contentStateMedicalRecommend
      );
      this.setState({
        MedicalRecommend: editorStateMedicalRecommendt,
      });
    }
  }
  submitReport = async event => {
    var Conclusion = draftToHtml(
      convertToRaw(this.state.Conclusion.getCurrentContent())
    );
    var ReportText = draftToHtml(
      convertToRaw(this.state.ReportText.getCurrentContent())
    );
    var MedicalRecommend = draftToHtml(
      convertToRaw(this.state.MedicalRecommend.getCurrentContent())
    );
    await fetch(this.state.api + '/SaveDiagnosticReport', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ris_OrderScheduleId: this.state.ris_OrderScheduleId,
        ReportText: ReportText,
        Conclusion: Conclusion,
        ReportDateTime: '2020-06-27T04:11:04.091Z',
        ReportDoctor: this.state.ReportDoctor,
        InternDoctor: this.state.InternDoctor,
        VerificationDoctor: 'string',
        VerificationDateTime: '2020-06-27T04:11:04.091Z',
        ris_ReportTemplateId: this.state.ris_ReportTemplateId,
        UserCreated: 'ductinh',
        IsCancel: true,
        UserCancel: 'string',

        CancelDateTime: '2020-06-27T04:11:04.092Z',
        ReportUpdateDate: '2020-06-27T04:11:04.092Z',
        ReportNo: 0,
        ProcessFlag: 'N',
        MedicalRecommend: MedicalRecommend,
        OperationTech: this.state.OperationTech,
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
            servicesManager.services.UINotificationService.show({
              title: 'Thông báo',
              message: 'Lưu báo cáo chuẩn đoán thành công',
              type: 'success',
              autoClose: true,
            });
            document.getElementById('btnSaveReport').style.display =
              'inline-block';
            document.getElementById('btnVeryReport').style.display =
              'inline-block';
            document.getElementById('btnPrintReport').style.display =
              'inline-block';
            this.setState({
              OperationTech: data.OperationTech,
              InternDoctor: data.InternDoctor,
              ris_OrderScheduleId: data.ris_OrderScheduleId,
              ris_ReportTemplateId: data.ris_ReportTemplateId,
              reportId: data.Id,
            });
          } else {
            this.setState({
              errorMessage: data.message,
              loading: false,
            });
            servicesManager.services.UINotificationService.show({
              title: 'Thông báo',
              message: 'Lưu báo cáo thất bại, vui lòng liên hệ kỹ thuật viên',
              type: 'error',
              autoClose: false,
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
  printReport = async event => {};
  submitVeryReport = async event => {
    await fetch(
      this.state.api +
        'VerifyReport?reportId=' +
        this.state.reportId +
        '&verifyDoctor=' +
        'ductinh',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
      .then(response => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(
        ([res, data]) => {
          if (res === 200) {
            servicesManager.services.UINotificationService.show({
              title: 'Thông báo',
              message: 'Xác nhận báo cáo chuẩn đoán thành công',
              type: 'success',
              autoClose: true,
            });
            document.getElementById('btnSaveReport').style.display = 'none';
            document.getElementById('btnVeryReport').style.display = 'none';
            document.getElementById('btnPrintReport').style.display =
              'inline-block';
          } else {
            this.setState({
              errorMessage: data.message,
              loading: false,
            });
            servicesManager.services.UINotificationService.show({
              title: 'Thông báo',
              message:
                'Xác nhận báo cáo chuẩn đoán thất bại, vui lòng liên hệ kỹ thuật viên',
              type: 'error',
              autoClose: false,
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
          this.setState({
            selectedOption: {
              label: data[0].TemplateName,
              value: data[0].Id,
            },
          });
          data.forEach(n =>
            this.state.options.push({
              label: n.TemplateName,
              value: n.Id,
            })
          );
        }
      });
  };
  getMauBaCao = async event => {
    await fetch(
      this.state.api +
        '/GetDiagnosticReportByStudyUID?studyUID=1846.17020596.190601100226430611',
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
          this.editorStateConclusion(data.Conclusion);
          this.editorStateMedicalRecommendt(data.MedicalRecommend);
          this.editorStateReportText(data.ReportText);
          this.setState({
            OperationTech: data.OperationTech,
            InternDoctor: data.InternDoctor,
            ris_OrderScheduleId: data.ris_OrderScheduleId,
            ris_ReportTemplateId: data.ris_ReportTemplateId,
            reportId: data.Id,
          });
          // selectedOption: {
          //   label: data.ris_OrderSchedule.ris_ImagingService.ServiceName,
          //   value: data.ris_ReportTemplateId,
          // },
          if (data.ris_OrderSchedule == null) {
            document.getElementById('btnSaveReport').style.display =
              'inline-block';
          } else {
            if (data.ris_OrderSchedule.IsReportVerified) {
              document.getElementById('btnPrintReport').style.display =
                'inline-block';
            }
            if (
              data.ris_OrderSchedule.IsReported &&
              !data.ris_OrderSchedule.IsReportVerified
            ) {
              document.getElementById('btnSaveReport').style.display =
                'inline-block';
              document.getElementById('btnVeryReport').style.display =
                'inline-block';
              document.getElementById('btnPrintReport').style.display =
                'inline-block';
            }
          }
          await this.GetReportTemplate(data.ServiceId);
        }
      });
  };
}

export default Login;
