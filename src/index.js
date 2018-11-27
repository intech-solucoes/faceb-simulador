import React from 'react';
import ReactDOM from 'react-dom';
import MasterPage from './pages/MasterPage';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<MasterPage />, document.getElementById('root'));
serviceWorker.unregister();
