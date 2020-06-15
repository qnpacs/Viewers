import React, { Component } from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="sweet-loading d-flex justify-content-center d-flex align-items-center">
        <ClipLoader
          css={override}
          sizeUnit={'px'}
          size={20}
          color={'#1AA7B6'}
          loading={this.props.loading}
        />
      </div>
    );
  }
}

export default Spinner;
