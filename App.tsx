import React from 'react';
import {Provider} from 'react-redux';

import {persistor, store} from './src/redux/store/store';
import {TaskScreen} from './src/screens/TaskScreen/TaskScreen';
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from './src/theme/theme';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <TaskScreen />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
