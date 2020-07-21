import './variables.css';
import MyComponent from './reportComponent';

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
};

const panelModule = {
  definitions: [
    {
      id: 'report',
      icon: 'report',
      label: 'Báo cáo',
      target: 'target-component-id',
    },
  ],
  menuOptions: [
    {
      from: 'right',
      icon: 'report',
      label: 'Báo cáo',
      target: 'target-component-id',
    },
  ],
  components: [
    {
      from: 'right',
      id: 'target-component-id',
      component: MyComponent,
    },
  ],

  defaultContext: ['VIEWER'],
};
const toolBarModules = {
  definitions: [
    { id: 'report', icon: 'report', label: 'Báo cáo', target: 'segment-panel' },
  ],
  components: [
    {
      from: 'right',
      id: 'segment-panel',
      component: MyComponent,
    },
  ],

  defaultContext: 'VIEWER',
};
