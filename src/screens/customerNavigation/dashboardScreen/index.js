// import React from 'react';
// import {
//   View,
//   Modal,
//   TouchableOpacity,
//   Image,
//   Text,
//   ScrollView,
// } from 'react-native';
// import {Button} from 'react-native-paper';
// import Styles from './styles';
// import {
//   PrimaryCommonLayout,
//   SecondaryCommonLayout,
//   CommonBottomNavigator,
//   CustomHeaderWithDesc,
//   TopBottomLayout,
//   CustomInput,
//   RowLine,
//   ColumnLine,
//   CustomTopBottomModalLayout,
//   CustomWrapper,
//   CustomHeader,
// } from '../../components';
// import {color, CommonStyles} from '../../utils/CommonStyles';
// import {
//   logoIcon,
//   plusIcon,
//   notificationIcon,
//   dashboardNoDeviceConfigImage,
// } from '../../assets';
// import {getLocalDB} from '../../utils/localDB';

// const BottomSection = ({navigation}) => {
//   return (
//     <CustomWrapper flex={0.8} ph2>
//       <CustomWrapper flex={8} center vCenter>
//         <Image source={dashboardNoDeviceConfigImage} />
//       </CustomWrapper>

//       <CustomWrapper flex={4}>
//         <CustomWrapper vCenter pv3>
//           <Text
//             style={[
//               CommonStyles.primaryFontStyle,
//               {color: color.grey, width: 150, textAlign: 'center'},
//             ]}>
//             Add your device to manage & view savings info
//           </Text>
//         </CustomWrapper>
//         <Button
//           uppercase={false}
//           mode="contained"
//           style={[
//             CommonStyles.buttonBgStyle,
//             {
//               backgroundColor: '#E28534',
//               width: '100%',
//               alignSelf: 'center',
//             },
//           ]}
//           labelStyle={CommonStyles.buttonLabel}
//           onPress={() => {
//             navigation.navigate('bottom navigator');
//           }}>
//           Add Device
//         </Button>
//       </CustomWrapper>
//     </CustomWrapper>
//   );
// };

// const TopSection = () => {
//   return (
//     <ColumnLine>
//       <RowLine spaceBetween ph2>
//         <Image source={logoIcon} />

//         <CustomWrapper>
//           <RowLine width={60} spaceBetween>
//             <Image source={plusIcon} />
//             <Image source={notificationIcon} />
//           </RowLine>
//         </CustomWrapper>
//       </RowLine>
//       <CustomWrapper ph2 mt3>
//         <CustomHeaderWithDesc
//           headerText="Welcome"
//           descText="Add your device"
//           white
//         />
//       </CustomWrapper>
//     </ColumnLine>
//   );
// };

// export default CustomerDashboardScreen = ({navigation}) => {
//   const [isModal, setModal] = React.useState(false);
//   const [isForgotPasswdMode, setForgotPasswdMode] = React.useState(false);
//   const [isOtpMode, setOtpMode] = React.useState(false);
//   const [isResetPassword, setResetPassword] = React.useState(false);

//   return (
//     <View style={{flex: 1}}>
//       <TopBottomLayout
//         topHeight={2.2}
//         bottomHeight={9.5}
//         topSection={<TopSection navigation={navigation} />}
//         bottomSection={<BottomSection navigation={navigation} />}
//       />
//     </View>
//   );
// };
