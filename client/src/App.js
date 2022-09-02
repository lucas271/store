import Routes from './Routes'

import store from './services/store.js'
import {Provider} from 'react-redux';


function App() {

  

  return (
    <Provider store={store}>
      <Routes/>
    </Provider>
  );
}

export default App;
