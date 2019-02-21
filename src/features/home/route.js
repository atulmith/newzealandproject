import {
  DefaultPage,
  ReceivablesPanel,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'default-page',
      name: 'Default page',
      component: DefaultPage,
      isIndex: true,
    },
    { path: 'receivablespanel', name: 'Receivables panel', component: ReceivablesPanel },
  ],
};
