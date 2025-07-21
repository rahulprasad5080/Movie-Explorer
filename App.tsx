import React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppNavigator />
    </PersistGate>
  </Provider>
);

export default App;
