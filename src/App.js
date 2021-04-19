import React, {useState} from 'react';
import {SplashScreen} from './screens';

import NavigationWrapper from './navigation/navigationWrapper';

const App = () => {
  const [isSplash, setSplash] = useState(true);

  if (isSplash) {
    setTimeout(() => {
      setSplash(false);
    }, 3000);
    return <SplashScreen />;
  } else {
    return <NavigationWrapper />;
  }
};

export default App;
