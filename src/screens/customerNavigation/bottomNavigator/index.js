// import React from 'react';
// import {View, Text} from 'react-native';
// import {BottomNavigation} from 'react-native-paper';
// import {color, CommonStyles} from '../../../utils/CommonStyles';
// import {
//   dashboardIcon,
//   singleSettingsIcon,
//   customer2Icon,
// } from '../../../assets';

// import {
//   CustomerDashboardScreen,
//   SupportScreen,
//   MyAccountScreen,
// } from '../index';

// const AlbumsRoute = () => <Text>Albums</Text>;

// const RecentsRoute = () => <Text>Recents</Text>;

// BottomNavigator = ({navigation}) => {
//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     {key: 'dashboard', icon: dashboardIcon},
//     // {key: 'settings', icon: singleSettingsIcon},
//     // {key: 'myAccount', icon: customer2Icon},
//   ]);

//   const renderScene = BottomNavigation.SceneMap({
//     dashboard: CustomerDashboardScreen,
//     // settings: SupportScreen,
//     // myAccount: MyAccountScreen,
//   });

//   return (
//     <BottomNavigation
//       navigationState={{index, routes}}
//       onIndexChange={setIndex}
//       renderScene={renderScene}
//       activeColor={'#51648B'}
//       inactiveColor="#BDBDBD"
//       barStyle={{
//         backgroundColor: '#fff',
//         borderColor: '#fff',
//         borderTopLeftRadius: 15,
//         borderLeftWidth: 10,
//         borderRightWidth: 10,
//         borderTopRightRadius: 15,
//         height: 60,
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//       style={{}}
//     />
//   );
// };

// export default BottomNavigator;
