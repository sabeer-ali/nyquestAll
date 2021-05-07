import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  BackHandler,
  Alert,
  Modal,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {NativeModules} from 'react-native';
// const {SocketConnection, WifiConnectivity} = NativeModules;
import {
  logoIcon,
  notificationIcon,
  iconLVIcon,
  logoutIcon,
} from '../../../assets';
import {
  CustomHeader,
  CustomInput,
  CustomList,
  CommonBottomNavigator,
  TopBottomLayout,
  CustomWrapper,
} from '../../../components';
import Styles from './styles';
import {
  MiddleWareForAuth,
  DEALER_DEVICE_LIST,
  DEALER_SEARCH,
} from '../../../utils/apiServices';
import {
  getLocalDB,
  Loader,
  showToaster,
  StoreLocalDB,
  logOut,
} from '../../../utils/commonUtils';

const TopSection = ({handleSearchApi}) => {
  return (
    <View style={{flex: 1}}>
      <CustomWrapper ph25>
        <CustomInput onChange={value => handleSearchApi(value)} />
      </CustomWrapper>
    </View>
  );
};

const BottomSection = ({searchResult, navigation, isLoading}) => {
  return (
    <View style={{flex: 1}}>
      {searchResult.length > 0
        ? searchResult.map((item, index) => {
            return (
              <CustomWrapper key={index} ph2>
                {isLoading ? (
                  <Loader />
                ) : (
                  <CustomList
                    customerName={item.customer}
                    deviceName={
                      item.dev_category === 'L' ? 'ICON LV' : 'ICON HV'
                    }
                    deviceNickName={item.nick_name}
                    deviceId={item.dev_id}
                    onpress={() =>
                      navigation.push('dealerDeviceInfo', {deviceDetails: item})
                    }
                    navigateNext
                    icon={iconLVIcon}
                    iconBgColor={
                      item.dev_category === 'L' ? '#DBD3EB' : '#C4C4C4'
                    }
                  />
                )}
              </CustomWrapper>
            );
          })
        : null}
    </View>
  );
};

const HomeScreen = ({navigation}) => {
  const [deviceList, setDeviceList] = React.useState([]);
  const [deviceCount, setDeviceCount] = React.useState(0);
  const [isLoading, setLoader] = React.useState(false);
  const [pageNum, setPageNum] = React.useState(0);
  const [isPaginationEnd, setPaginationEnd] = React.useState(false);
  const [searchModal, setSearchModal] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState([]);
  const flatListRef = React.useRef();

  React.useEffect(() => {
    console.log('navigation.isFocused()', navigation.isFocused());
    setSearchModal(false);
    if (!searchModal) {
      setSearchResult([]);
    }
    if (navigation.isFocused()) {
      handleGetListAPI();
    }
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
    return () => {
      backHandler.remove();
      console.log('Unmounted HOME');
    };
  }, []);

  const handleLogout = () => {
    logOut('@delaerLoginDetails', () => {
      navigation.navigate('dealerlogin');
    });
  };

  const handleGetListAPI = async (isPagination, callback) => {
    if (isPagination) setPageNum(pageNum + 1);
    getLocalDB('@delaerLoginDetails', resLogin => {
      const endPoints =
        DEALER_DEVICE_LIST +
        '/' +
        resLogin.cust_id +
        '/' +
        pageNum +
        '0' +
        '/' +
        resLogin.token;

      console.log('Home Details endPoints', endPoints);
      setLoader(true);

      MiddleWareForAuth('GET', endPoints, null, (res, err) => {
        setLoader(false);
        if (err === null) {
          console.log('LOG for HOME ==>', res.data, err);
          if (res !== null && err === null && res.data) {
            if (res.data && res.data.status && res.data.status === 'error') {
              showToaster('error', res.data.message);
              if (res.data.message === 'Invalid Token') {
                handleLogout();
              }
            } else {
              console.log('res.data.devlst', res.data, res.data.data.length);

              if (res && res.data && res.data.data && res.data.data.length) {
                let data;
                if (isPagination) {
                  data = [...deviceList, ...res.data.data];
                } else {
                  data = res.data.data;
                }

                setDeviceList(data);
                setDeviceCount(res.data.devicecnt);
                if (callback) callback();
              } else {
                Alert.alert('No More Data Available');
                setPaginationEnd(true);
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

  const handleSearchApi = async (data, isPagination, callback) => {
    // if (isPagination) setPageNum(pageNum + 1);
    getLocalDB('@delaerLoginDetails', resLogin => {
      const endPoints =
        DEALER_SEARCH +
        '/' +
        resLogin.cust_id +
        '/' +
        pageNum +
        '0' +
        '/' +
        data +
        '/' +
        resLogin.token;

      console.log('Home SEARCH endPoints', endPoints);
      setLoader(true);

      MiddleWareForAuth('GET', endPoints, null, (res, err) => {
        setLoader(false);
        if (err === null) {
          console.log('DEALER_SEARCH HOME ==>', res.data, err);
          if (res !== null && err === null && res.data) {
            if (res.data && res.data.status && res.data.status === 'error') {
              showToaster('error', res.data.message);
              if (res.data.message === 'Invalid Token') {
                handleLogout();
              }
            } else {
              console.log(
                'res.data  DEALER_SEARCH',
                res.data,
                res.data.data.length,
              );

              if (res && res.data && res.data.data && res.data.data.length) {
                // let data;
                // if (isPagination) {
                //   data = [...deviceList, ...res.data.data];
                // } else {
                // }
                data = res.data.data;

                setSearchResult(data);
                if (callback) callback();
              } else {
                Alert.alert('No More Data Available');
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
    handleGetListAPI(true, () => {
      if (isPaginationEnd) {
        flatListRef.current.scrollToIndex({
          animated: true,
          index: deviceList.length - 5,
        });
      } else {
        flatListRef.current.scrollToIndex({
          animated: true,
          index: deviceList.length - pageNum * 10 - 5,
        });
      }

      console.log(
        'deviceList.length - pageNum',
        deviceList.length - 10,
        deviceList.length,
      );
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
        <View style={[Styles.inputContainer]}>
          <CustomInput onfocus={() => setSearchModal(true)} />
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
            onEndReached={() => deviceList.length > 9 && handlePagination()}
            onEndReachedThreshold={0}
            onScrollToIndexFailed={info => {
              const wait = new Promise(resolve => setTimeout(resolve, 700));
              wait.then(() => {
                if (isPaginationEnd) {
                  flatListRef.current?.scrollToIndex({
                    index: deviceList - 5,
                    animated: true,
                  });
                } else {
                  flatListRef.current?.scrollToIndex({
                    index: pageNum * 10,
                    animated: true,
                  });
                }
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
      {searchModal && (
        <Modal
          visible={searchModal}
          animationType={'slide'}
          transparent={false}>
          <View style={{flex: 1}}>
            <TopBottomLayout
              topHeight={1.5}
              bottomHeight={10.5}
              backButtonType="backArrow"
              backButtonAction={() => setSearchModal(false)}
              topSection={<TopSection handleSearchApi={handleSearchApi} />}
              bottomSection={
                <BottomSection
                  searchResult={searchResult}
                  navigation={navigation}
                  isLoading={isLoading}
                />
              }
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

export default HomeScreen;
