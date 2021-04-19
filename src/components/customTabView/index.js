import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: '#E28534', color: '#E28534'}}
    style={{
      backgroundColor: ' #F5F8FF',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      minHeight: 60,
      justifyContent: 'center',
    }}
    labelStyle={{color: '#E28534'}}
  />
);

CustomTabView = ({routes, renderScene}) => {
  const [index, setIndex] = React.useState(0);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: Dimensions.get('window').width}}
      renderTabBar={renderTabBar}
    />
  );
};

export default CustomTabView;
