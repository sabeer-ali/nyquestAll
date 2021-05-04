import React, {useState} from 'react';
import {SplashScreen} from './screens';

import LottieView from 'lottie-react-native';
import NavigationWrapper from './navigation/navigationWrapper';

const App = () => {
  const [isSplash, setSplash] = useState(true);

  if (isSplash) {
    setTimeout(() => {
      setSplash(false);
    }, 2500);
    return (
      <LottieView
        source={require('./assets/NQ_splashscrenn.json')}
        autoPlay
        loop
      />
    );
    // <SplashScreen />;
  } else {
    return <NavigationWrapper />;
  }
};

export default App;
