import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  BackHandler,
  Alert,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {NativeModules} from 'react-native';
// const {SocketConnection, WifiConnectivity} = NativeModules;
import {logoIcon, notificationIcon, iconLVIcon} from '../../../assets';
import {
  CustomHeader,
  CustomInput,
  CustomList,
  CommonBottomNavigator,
} from '../../../components';
import Styles from './styles';
import {
  MiddleWareForAuth,
  DEALER_DEVICE_LIST,
} from '../../../utils/apiServices';
import {getLocalDB, Loader, showToaster} from '../../../utils/commonUtils';

const HomeScreen = ({navigation}) => {
  const [deviceList, setDeviceList] = React.useState([]);
  const [deviceCount, setDeviceCount] = React.useState(0);
  const [isLoading, setLoader] = React.useState(false);
  const [pageNum, setPageNum] = React.useState(0);
  const flatListRef = React.useRef();

  React.useEffect(() => {
    handleGetListAPI();
    const backAction = () => {
      if (navigation.isFocused()) {
        Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const handleGetListAPI = async (isPagination, callback) => {
    getLocalDB('@delaerLoginDetails', resLogin => {
      console.log('@delaerLoginDetails', resLogin);
      const endPoints =
        DEALER_DEVICE_LIST +
        '/' +
        resLogin.cust_id +
        '/' +
        pageNum +
        '/' +
        resLogin.token;

      setLoader(true);

      MiddleWareForAuth('GET', endPoints, null, (res, err) => {
        setLoader(false);
        if (err === null) {
          if (res !== null && err === null && res.data) {
            if (res.data && res.data.status && res.data.status === 'error') {
              showToaster('error', res.data.message);
            } else {
              console.log('res.data.devlst', res.data);

              if (res && res.data && res.data.data) {
                let data;
                if (isPagination) {
                  data = [...deviceList, ...res.data.data];
                } else {
                  data = res.data.data;
                }

                setDeviceList(data);
                setDeviceCount(res.data.devicecnt);
                if (callback) callback();
              }
            }
          }
        } else {
          console.error('Device List in Home API Error', err);
          showToaster('error', 'Somthing went wrong');
        }
      });
    });
  };

  const handlePagination = async () => {
    await setPageNum(pageNum + 1);
    handleGetListAPI(true, () => {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: deviceList.length - 5,
      });
    });
  };

  const renderItem = ({item, index}) => {
    return (
      <CustomList
        customerName={item.customer}
        deviceName={item.dev_category === 'L' ? 'ICON LV' : 'ICON HV'}
        deviceNickName={item.nick_name}
        deviceId={item.dev_id}
        onpress={() =>
          navigation.push('dealerDeviceInfo', {deviceDetails: item})
        }
        navigateNext
        icon={iconLVIcon}
        iconBgColor={item.dev_category === 'L' ? '#DBD3EB' : '#C4C4C4'}
      />
    );
  };

  return (
    <View style={Styles.container}>
      <Toast ref={ref => Toast.setRef(ref)} />
      <View style={Styles.topSection}>
        <CustomHeader
          leftIcon={logoIcon}
          rightIcon={notificationIcon}
          rightIconAction={() => navigation.navigate('notification')}
        />
        <Text style={Styles.welcomeText}>Welcome</Text>
        <Text style={Styles.descriptionText}>Here is your device list</Text>
        <View style={Styles.inputContainer}>
          <CustomInput />
        </View>
      </View>

      <View style={Styles.bottomSection}>
        <View style={Styles.configDeviceContainer}>
          <Text style={Styles.configDevice}>Configured Devices</Text>

          <View style={Styles.deviceCountContainer}>
            <Text style={Styles.deviceCount}>
              {deviceCount.toString().length < 2
                ? '0' + deviceCount
                : deviceCount}{' '}
              Devices
            </Text>
          </View>
        </View>
        {isLoading ? (
          <Loader />
        ) : deviceList && deviceList !== null && deviceList.length ? (
          <FlatList
            ref={flatListRef}
            data={deviceList}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            onEndReached={() => deviceList.length > 8 && handlePagination()}
            onEndReachedThreshold={0}
            onScrollToIndexFailed={info => {
              const wait = new Promise(resolve => setTimeout(resolve, 700));
              wait.then(() => {
                flatListRef.current?.scrollToIndex({
                  index: deviceList.length - 5,
                  animated: true,
                });
              });
            }}
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>NO DATA FOUND</Text>
          </View>
        )}
      </View>

      <View style={{backgroundColor: '#F5F8FF'}}>
        <CommonBottomNavigator navigation={navigation} state="homeScreen" />
      </View>
    </View>
  );
};

export default HomeScreen;
