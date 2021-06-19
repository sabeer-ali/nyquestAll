import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {StackedBarChart} from 'react-native-chart-kit';
import Styles from './styles';
import {
  CustomHeader,
  CustomList,
  CustomSecondaryList,
  CustomModal,
} from '../../../components';
import {
  arrowBackIcon,
  infoIcon,
  solarIcon,
  healthIcon,
  timeIcon,
  batteryIcon,
  solarSavingIcon,
  co2Icon,
  treeIcon,
  arrowDownIcon,
  iconLVIcon,
} from '../../../assets';
import {getLocalDB, Loader, showToaster} from '../../../utils/commonUtils';
import {MiddleWareForAuth} from '../../../utils/apiServices';

const screenWidth = Dimensions.get('window').width;

export default function DeviceInfoScreen({
  route,
  navigation: {goBack, navigate},
}) {
  const [isModal, setModal] = useState(false);
  const [deviceDetails, setDeviceDetails] = useState(null);
  const [isLoading, setLoader] = useState(true);
  const [graphType, setGraphType] = useState('lifetime');
  const [graphDetails, setGraphDetails] = useState(null);
  const [graphData, setGraphData] = useState(null);

  React.useEffect(() => {
    deviceDetailsApi(() => {
      graphListApi();
    });
  }, []);

  const deviceDetailsApi = callback => {
    setLoader(true);
    let deviceId = route.params.deviceDetails.dev_id;
    console.log('101', deviceId);

    getLocalDB('@delaerLoginDetails', res => {
      let endPoints =
        '/getdevicestatusdtls/' +
        res.cust_id +
        '/' +
        deviceId +
        '/' +
        res.token;
      console.log('END Points', endPoints);

      MiddleWareForAuth('GET', endPoints, null, (res, err) => {
        if (err === null) {
          if (res !== null && res.data) {
            setLoader(false);
            if (res.data.code == '10') {
              console.log('res.data', res.data.data);
              setDeviceDetails(res.data.data[0]);
              console.log('in Details Screen ===> ', res.data.data[0]);
              if (callback) callback(res.data.data[0]);
            } else {
              if (res.data && res.data.message) {
                showToaster('error', res.data.message);
              }
            }
          }
        } else {
          setLoader(false);
          console.error('Device VAlidation API  Error', err);
          showToaster('error', 'Something went wrong');
        }
      });
    });
  };

  const graphListApi = async (type, date, callback) => {
    console.log('type', type);
    setLoader(true);
    let graph = type ? type : graphType;
    console.log('graph', date);
    let localUrl = date ? '/graphdatauser_date/' : '/graphdatauser_term/';

    getLocalDB('@delaerLoginDetails', res => {
      let endPoints = localUrl + res.cust_id + '/' + graph + '/' + res.token;

      MiddleWareForAuth('GET', endPoints, null, (res, err) => {
        setLoader(false);
        if (err === null) {
          if (res !== null && res.data) {
            if (res.data.code == '10') {
              console.log('res.data Graph', res.data.data);

              console.log(
                'in Details Screen Graph ===> ',
                res.data.data.summarydata,
              );
              setGraphDetails(res.data.data.summarydata);

              if (res.data && res.data.data && res.data.data.summarydata) {
                const {result, total} = generateCombineArray(
                  res.data.data.summarydata.solarsav.y,
                  res.data.data.summarydata.utilitysav.y,
                );
                console.log('TOTAL ===> ', result, total);

                if (result && total > 0) {
                  let data = {
                    labels: res.data.data.summarydata.utilitysav.x,
                    // legend: ['Solar Saving', 'Utility Saving'],
                    // datasets: [0, 50, 150, 200, 250, 300, 350],
                    data: result,
                    barColors: ['#839ACF', '#F5A266'],
                  };
                  setGraphData(data);
                }
              }
            } else {
              if (res.data && res.data.message) {
                // showToaster('error', res.data.message);
                console.error(
                  'in Details Screen NOT "10" => 2 API  Error',
                  res.data.message,
                );
                console.error(
                  'in Details Screen NOT "10" API  Error',
                  err.response.data,
                );
              }
            }
          }
        } else {
          console.error('Device VAlidation API Graph Error', err);
          if (err) {
            console.error(
              'Device VAlidation API Graph Error 2222222222222',
              err,
            );
          }
          // showToaster('error', 'Something went wrong');
        }
      });
    });
  };

  const generateCombineArray = (data1, data2) => {
    console.log(data1, data2);
    let result = [];
    let total = 0;
    for (let i = 0; i < data1.length; i++) {
      result.push([Number(data1[i]), Number(data2[i])]);
      total = total + Number(data1[i]) + Number(data2[i]);
    }
    return {result, total};
  };

  const handleSelectedValue = value => {
    console.log('value', value);

    let type = '';
    let isDate = false;
    if (value === 'Lifetime') {
      type = 'lifetime';
    } else if (value === 'Today') {
      type = 'today';
    } else if (value === 'Last 7 days') {
      type = 'week';
    } else if (value === 'Last 12 months') {
      type = 'month';
    } else {
      type = moment(value).format('YYYY-MM-DD');
      isDate = true;
    }

    setGraphType(type);
    graphListApi(type, isDate);
  };

  const chartConfig = {
    backgroundColor: '#F5F8FF',
    backgroundGradientFrom: '#F5F8FF',
    // backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#F5F8FF',
    // backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(189,189,189, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.8,
    useShadowColorFromDataset: false, // optional
  };

  if (deviceDetails !== null) {
    console.log('deviceDetails', deviceDetails);
  }

  return (
    <ScrollView style={{flex: 1}}>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={Styles.container}>
          <View style={Styles.topSection}>
            <CustomHeader
              leftIcon={arrowBackIcon}
              leftIconAction={() => goBack()}
              centerText="Device Info"
              rightIcon={infoIcon}
              rightIconAction={() =>
                navigate('dealerInstallationDetails', {
                  deviceDetails: route.params,
                })
              }
            />
          </View>

          <View style={Styles.bottomSection}>
            {
              <CustomList
                customerName={
                  deviceDetails !== null ? deviceDetails.username : 'N.A'
                }
                deviceName={
                  deviceDetails !== null ? deviceDetails.devname : 'N.A'
                }
                deviceNickName={
                  deviceDetails !== null ? deviceDetails.nick_name : 'N.A'
                }
                deviceId={deviceDetails !== null ? deviceDetails.dev_id : 'N.A'}
                bgColor="#F5F8FF"
                navigateNext={false}
                icon={iconLVIcon}
                iconBgColor={'#DBD3EB'} //item.dev_category === 'L' ? '#DBD3EB' : '#C4C4C4'}
              />
            }

            <View style={Styles.secondaryListing}>
              {deviceDetails !== null && (
                <CustomSecondaryList
                  text1="Solar"
                  text2="Today"
                  image={solarIcon}
                  bgColor="#F3937E"
                  value={
                    deviceDetails !== null
                      ? deviceDetails.solartoday && deviceDetails.solartoday
                      : '0'
                  }
                  // params="kWh"
                />
              )}
              {deviceDetails !== null && (
                <CustomSecondaryList
                  text1="Device"
                  text2="Status"
                  image={healthIcon}
                  bgColor="#7AB78C"
                  value={
                    deviceDetails !== null ? deviceDetails.dev_state : 'N.A'
                  }
                />
              )}
            </View>

            <View style={Styles.secondaryListing}>
              <CustomSecondaryList
                text1="Last"
                text2="Update"
                image={timeIcon}
                bgColor="#5BBDC0"
                time={
                  deviceDetails !== null
                    ? deviceDetails.last_log_date !== null &&
                      deviceDetails.last_log_date.split(' ')[1]
                    : 'N.A'
                }
                date={
                  deviceDetails !== null
                    ? deviceDetails.last_log_date !== null &&
                      deviceDetails.last_log_date.split(' ')[0]
                    : 'N.A'
                }
              />
              <CustomSecondaryList
                text1="Battery"
                text2="Status"
                image={batteryIcon}
                bgColor="#77C5E4"
                value={
                  deviceDetails !== null ? deviceDetails.batterystatus : 'N.A'
                }
              />
            </View>

            {/* modal */}
            <View style={Styles.pickerSection}>
              <Text style={Styles.pickerDescription}>
                Showing Savings info for
              </Text>
              <TouchableOpacity
                onPress={() => setModal(true)}
                style={Styles.pickerContainer}>
                <Text style={Styles.pickerText}>
                  {graphType.charAt(0).toUpperCase() + '' + graphType.slice(1)}
                </Text>
                <Image source={arrowDownIcon} />
              </TouchableOpacity>
            </View>

            <View style={Styles.barChartContainer}>
              <Text style={Styles.barChartHeading}>Energy Statistics</Text>
              <ScrollView horizontal nestedScrollEnabled>
                {graphData !== null ? (
                  <StackedBarChart
                    style={{
                      backgroundColor: '#F5F8FF',
                      marginVertical: 15,
                    }}
                    data={graphData}
                    width={
                      graphData && graphData.data && graphData.data.length * 80
                    }
                    height={200}
                    chartConfig={chartConfig}
                  />
                ) : (
                  <View
                    style={{
                      justifyContent: 'center',
                      width: screenWidth,
                      paddingVertical: 50,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                      }}>
                      NO DATA AVAILABLE
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>

            <View style={Styles.secondaryListing}>
              {graphDetails !== null && (
                <CustomSecondaryList
                  text1="Total"
                  text2="Savings"
                  image={solarSavingIcon}
                  bgColor="#F8AB9B"
                  value={graphDetails.totalsav.toString()}
                  // params="kWh"
                />
              )}
              {graphDetails !== null && (
                <CustomSecondaryList
                  text1="Co2"
                  text2="Savings"
                  image={co2Icon}
                  bgColor="#6F6F6F"
                  value={graphDetails.co2save.toString()}
                  // params="kg"
                />
              )}
            </View>

            <View style={[Styles.secondaryListing, {paddingBottom: 25}]}>
              {graphDetails !== null && (
                <CustomSecondaryList
                  text1="Trees"
                  text2="Saved"
                  image={treeIcon}
                  bgColor="#F8AB9B"
                  value={graphDetails.treesav.toString()}
                  // params="Trees"
                />
              )}
            </View>
          </View>
        </View>
      )}
      {isModal && (
        <CustomModal
          showModal={isModal}
          handleModal={setModal}
          selectedValue={text => handleSelectedValue(text)}
        />
      )}
    </ScrollView>
  );
}
