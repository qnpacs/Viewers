import MyComponent from './reportComponent';
import RoiContourMenu from './components/roiContourMenu/RoiContourMenu.js';
import './variables.css';
export default {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: 'report-extension',

  /**
   * LIFECYCLE HOOKS
   */

  /**
   * MODULE GETTERS
   */

  getPanelModule() {
    return panelModule;
  },
  getToolbarModule() {
    return toolBarModules;
  },
};

const panelModule = {
  definitions: [
    {
      id: 'report',
      icon: 'report',
      label: 'report',
      target: 'target-component-id',
    },
  ],
  menuOptions: [
    {
      from: 'right',
      icon: 'report',
      label: 'report',
      target: 'target-component-id',
    },
  ],
  components: [
    {
      from: 'right',
      id: 'target-component-id',
      component: RoiContourMenu,
    },
  ],

  defaultContext: ['VIEWER'],
};
const toolBarModules = {
  definitions: [
    { id: 'report', icon: 'report', label: 'report', target: 'segment-panel' },
  ],
  components: [
    {
      from: 'right',
      id: 'segment-panel',
      component: RoiContourMenu,
    },
  ],

  defaultContext: 'VIEWER',
};
