import './OHIFLogo.css';

import { Icon } from '@ohif/ui';
import React from 'react';

function OHIFLogo() {
  return (
    <a rel="noopener noreferrer" className="header-brand" href="/">
      <Icon name="qnpacs-logo" className="header-logo-image" />
      {/* Logo text would fit smaller displays at two lines:
       *
       * Open Health
       * Imaging Foundation
       *
       * Or as `OHIF` on really small displays
       */}
      <Icon name="qnpacs-text-logo" className="header-logo-text" />
    </a>
  );
}

export default OHIFLogo;
