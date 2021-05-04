import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  BackHandler,
  Alert,
  FlatList,
} from 'react-native';
import {Button} from 'react-native-paper';
import Styles from './styles';
import {
  PrimaryCommonLayout,
  SecondaryCommonLayout,
  CommonBottomNavigator,
  CustomHeaderWithDesc,
  TopBottomLayout,
  CustomInput,
  RowLine,
  ColumnLine,
  CustomTopBottomModalLayout,
  CustomWrapper,
  CustomHeader,
  CustomList,
} from '../../../components';
import {color, CommonStyles} from '../../../utils/CommonStyles';
import {
  logoIcon,
  plusIcon,
  notificationIcon,
  dashboardNoDeviceConfigImage,
  iconLVIcon,
} from '../../../assets';
import {getLocalDB, Loader, logOut} from '../../../utils/commonUtils';
import {
  MiddleWareForAuth,
  GET_DEVICE_FOR_CUSTOMER,
} from '../../../utils/apiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const NoData = ({navigation}) => {
  return (
    <>
      <CustomWrapper flex={7} center vCenter>
        <Image source={dashboardNoDeviceConfigImage} />
      </CustomWrapper>

      <CustomWrapper flex={5}>
        <CustomWrapper vCenter pv2>
          <Text
            style={[
              CommonStyles.primaryFontStyle,
              {color: color.grey, width: 150, textAlign: 'center'},
            ]}>
            Add your device to manage & view savings info
          </Text>
        </CustomWrapper>
        <Button
          uppercase={false}
          mode="contained"
          style={[
            CommonStyles.buttonBgStyle,
            {
              backgroundColor: '#E28534',
              width: '100%',
              alignSelf: 'center',
            },
          ]}
          labelStyle={CommonStyles.buttonLabel}
          onPress={() => {
            navigation.navigate('deviceConfig');
          }}>
          Add Device
        </Button>
      </CustomWrapper>
    </>
  );
};

const BottomSection = ({navigation, setData}) => {
  const [deviceList, setDeviceList] = React.useState([]);
  const [isLoading, setLoader] = React.useState(false);
  const [deviceCount, setDeviceCount] = React.useState(0);
  const [pageNum, setPageNum] = React.useState(0);

  const flatListRef = React.useRef();

  React.useEffect(() => {
    getDeviceListApi();
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

  const handlePagination = async () => {
    await setPageNum(pageNum + 1);
    handleGetListAPI(true, () => {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: deviceList.length - 5,
      });
    });
  };

  const getDeviceListApi = (isPagination, callback) => {
    AsyncStorage.getAllKeys().then(resKey => console.log('Keyzzz', resKey));
    getLocalDB('@customerLoginDetails', resLogin => {
      const endPoints = `${GET_DEVICE_FOR_CUSTOMER}${'/'}${
        resLogin.cust_id
      }${'/'}${resLogin.token}`;
      setLoader(true);

      MiddleWareForAuth('GET', endPoints, null, (res, err) => {
        setLoader(false);
        if (err === null) {
          console.log('res.data.devlst', res.data);
          if (res !== null && err === null && res.data) {
            if (res.data && res.data.code !== 10) {
              // showToaster('error', res.data.message);
              Alert.alert('Warning', res.data.message);
              logOut('@customerLoginDetails', () => {
                navigation.navigate('customerLogin');
              });
            } else {
              if (res && res.data && res.data.data) {
                let data;
                if (isPagination) {
                  data = [...deviceList, ...res.data.data];
                } else {
                  data = res.data.data;
                }
                setDeviceList(data);
                setData(data.length ? true : false);
                // setDeviceCount(res.data.devicecnt);
                if (callback) callback();
              }
            }
          }
        } else {
          console.error('Device List in Home API Error', err);
          // showToaster('error', 'Somthing went wrong');
        }
      });
    });
  };

  const renderItem = data => {
    const {item} = data;
    return (
      <CustomList
        customerName={item.nick_name}
        deviceName={item.dev_category === 'L' ? 'ICON LV' : 'ICON HV'}
        deviceNickName={item.nick_name}
        deviceId={item.dev_id}
        onpress={() => navigation.push('deviceDetails', {deviceDetails: item})}
        navigateNext
        icon={iconLVIcon}
        iconBgColor={item.dev_category === 'L' ? '#DBD3EB' : '#C4C4C4'}
      />
    );
  };

  return (
    <CustomWrapper flex={1}>
      <View style={Styles.configDeviceContainer}>
        <Text style={Styles.configDevice}>Configured Devices</Text>

        <View style={Styles.deviceCountContainer}>
          <Text style={Styles.deviceCount}>
            {deviceList.length.toString().length < 2
              ? '0' + deviceList.length
              : deviceList.length}{' '}
            Devices
          </Text>
        </View>
      </View>
      {isLoading ? (
        <Loader />
      ) : deviceList.length ? (
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
        <NoData navigation={navigation} />
      )}
    </CustomWrapper>
  );
};

const TopSection = ({navigation, isData}) => {
  return (
    <ColumnLine>
      <RowLine spaceBetween ph2>
        <Image source={logoIcon} />
        <CustomWrapper>
          <RowLine width={60} spaceBetween>
            <TouchableOpacity
              style={{padding: 8}}
              onPress={() => navigation.navigate('deviceConfig')}>
              <Image source={plusIcon} />
            </TouchableOpacity>
            <Image source={notificationIcon} />
          </RowLine>
        </CustomWrapper>
      </RowLine>
      <CustomWrapper ph2 mt2>
        <CustomHeaderWithDesc
          headerText="Welcome"
          descText={isData ? 'Your Device' : 'Add Your Device'}
          white
        />
      </CustomWrapper>
    </ColumnLine>
  );
};

export default CustomerDashboardScreen = () => {
  const navigation = useNavigation();
  const [isData, setData] = React.useState(false);
  return (
    <View style={{flex: 1}}>
      <TopBottomLayout
        topHeight={2.5}
        bottomHeight={9.5}
        topSection={<TopSection navigation={navigation} isData={isData} />}
        bottomSection={
          <BottomSection navigation={navigation} setData={setData} />
        }
      />
    </View>
  );
};
