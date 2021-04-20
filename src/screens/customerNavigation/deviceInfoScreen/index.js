import React, {useState} from 'react';
import {View, Text, Image, Dimensions, Modal} from 'react-native';
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
} from '../../../assets';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {StackedBarChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function DeviceInfoScreen({navigation: {goBack, navigate}}) {
  const [isModal, setModal] = useState(false);

  const data = {
    labels: ['2016', '2017', '2018', '2019', '2020'],
    legend: ['Solar Saving', 'Utility Saving'],
    data: [
      [10, 15],
      [15, 20],
      [20, 30],
      [30, 40],
      [40, 50],
    ],
    barColors: ['#839ACF', '#F5A266'],
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

  return (
    <ScrollView>
      <View style={Styles.container}>
        <View style={Styles.topSection}>
          <CustomHeader
            leftIcon={arrowBackIcon}
            leftIconAction={() => goBack()}
            centerText="Device Info"
            rightIcon={infoIcon}
            rightIconAction={() => navigate('dealerInstallationDetails')}
          />
        </View>

        <View style={Styles.bottomSection}>
          <CustomList
            customerName="customer Name"
            deviceName="iCON LV"
            deviceNickName="Device Nick Name"
            deviceId="A12XA1000005"
            bgColor="#F5F8FF"
            navigateNext={false}
          />
          <View style={Styles.secondaryListing}>
            <CustomSecondaryList
              text1="Solar"
              text2="Today"
              image={solarIcon}
              bgColor="#F3937E"
              value="100.97"
              params="kWh"
            />
            <CustomSecondaryList
              text1="Device"
              text2="Status"
              image={healthIcon}
              bgColor="#7AB78C"
              value="Live"
            />
          </View>

          <View style={Styles.secondaryListing}>
            <CustomSecondaryList
              text1="Last"
              text2="Update"
              image={timeIcon}
              bgColor="#5BBDC0"
              time="17:00:35"
              date="31/10/20"
            />
            <CustomSecondaryList
              text1="Battery"
              text2="Status"
              image={batteryIcon}
              bgColor="#77C5E4"
              value="Full"
              // time=""
              // date=""
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
              <Text style={Styles.pickerText}>Lifetime</Text>
              <Image source={arrowDownIcon} />
            </TouchableOpacity>
          </View>

          <View style={Styles.barChartContainer}>
            <Text style={Styles.barChartHeading}>Energy Statistics</Text>
            <StackedBarChart
              style={{
                backgroundColor: '#F5F8FF',
                marginVertical: 15,
              }}
              data={data}
              width={screenWidth - 15}
              height={180}
              chartConfig={chartConfig}
            />
          </View>

          <View style={Styles.secondaryListing}>
            <CustomSecondaryList
              text1="Total"
              text2="Savings"
              image={solarSavingIcon}
              bgColor="#F8AB9B"
              value="100.97"
              params="kWh"
            />
            <CustomSecondaryList
              text1="Co2"
              text2="Savings"
              image={co2Icon}
              bgColor="#6F6F6F"
              value="83.62"
              params="kg"
            />
          </View>

          <View style={[Styles.secondaryListing, {paddingBottom: 25}]}>
            <CustomSecondaryList
              text1="Trees"
              text2="Saved"
              image={treeIcon}
              bgColor="#F8AB9B"
              value="04"
              params="Trees"
            />
          </View>
        </View>
      </View>
      {isModal && <CustomModal showModal={isModal} handleModal={setModal} />}
    </ScrollView>
  );
}
