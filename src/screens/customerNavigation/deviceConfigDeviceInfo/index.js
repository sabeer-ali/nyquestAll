import React, {useState} from 'react';
import {View, Text, Image, Modal} from 'react-native';
import Styles from './styles';
import {
  TopBottomLayout,
  CustomList,
  CustomHeaderWithDesc,
  CustomHeader,
  CustomWrapper,
} from '../../../components';
import {color, CommonStyles} from '../../../utils/CommonStyles';
import {iconLVIcon, closeIcon, successCircleIcon} from '../../../assets';
import {Button} from 'react-native-paper';

const ReconfigRedeployComponent = ({
  setModal,
  setReConfig,
  setStepsDetsils,
  isReDeploy,
  navigation,
}) => {
  const [isReDeployConfirm, setReDeployConfirm] = useState(false);
  return (
    <View style={{flex: 1, marginTop: 40}}>
      <CustomHeaderWithDesc
        headerText={isReDeploy ? 'Redeploy' : 'Reconfigure'}
        descText={
          isReDeployConfirm
            ? 'Scan the QR Code of the new device to continue '
            : isReDeploy
            ? 'Are you sure? Do you want to redeploy this device ?'
            : 'Are you sure? Do you want to reconfigure this device ?'
        }
      />

      {isReDeployConfirm ? (
        <View style={{paddingTop: 35}}>
          <Button
            uppercase={false}
            mode="contained"
            style={[
              CommonStyles.halfmodalButton,
              {
                backgroundColor: '#E28534',
                width: '90%',
                alignSelf: 'center',
              },
            ]}
            labelStyle={Styles.modalButtonLabel}
            onPress={() => {
              setModal(false);
              navigation.navigate('deviceConfig');
            }}>
            Scan QR Code
          </Button>
        </View>
      ) : (
        <View style={[CommonStyles.buttonWrapperWithtwo, {marginTop: 25}]}>
          <Button
            uppercase={false}
            mode="contained"
            style={[CommonStyles.halfmodalButton, {backgroundColor: '#7F91BB'}]}
            labelStyle={Styles.modalButtonLabel}
            onPress={() => {
              setModal(false);
            }}>
            No
          </Button>

          <Button
            uppercase={false}
            mode="contained"
            style={[CommonStyles.halfmodalButton, {backgroundColor: '#E28534'}]}
            labelStyle={Styles.modalButtonLabel}
            onPress={() => {
              if (isReDeploy) {
                setReDeployConfirm(true);
              } else {
                setReConfig(false);
                setStepsDetsils(true);
              }
            }}>
            Yes
          </Button>
        </View>
      )}
    </View>
  );
};

const CustomerForm = ({setCustomerDetails, setStepsDetsils}) => {
  return (
    <View style={{paddingHorizontal: 25, marginTop: 40}}>
      <View>
        <CustomHeaderWithDesc
          headerText="Customer Details"
          descText="Enter customer details"
        />
      </View>
      <View style={Styles.inputContainer}>
        <CustomInput form placeholder="Name" />
      </View>
      <View style={Styles.inputContainer}>
        <CustomInput form placeholder="Mobile" />
      </View>
      <View style={Styles.inputContainer}>
        <CustomInput form placeholder="Email" />
      </View>
      <View style={Styles.inputContainer}>
        <CustomInput form placeholder="Location" />
      </View>
      <View style={CommonStyles.buttonWrapper}>
        <CustomButton
          text="Configure"
          backgroundStyle={CommonStyles.buttonBgStyle}
          textStyle={CommonStyles.buttonTextStyle}
          onpress={() => {
            setCustomerDetails(false);
            setStepsDetsils(true);
          }}
        />
      </View>
    </View>
  );
};

const ConnectionStatus = ({
  setCustomerDetails,
  setStepsDetsils,
  setConnectionStatus,
  setModal,
  navigation,
}) => {
  setTimeout(() => {
    setCustomerDetails(false);
    setStepsDetsils(false);
    setConnectionStatus(false);
    setModal(false);
    navigation.navigate('dealerDeviceConfigMenu');
  }, 1000);
  return (
    <View>
      <CustomHeader rightIcon={closeIcon} />
      <CustomHeaderWithDesc
        headerText="Steps to follow"
        descText="Waiting for connection"
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 30,
          marginLeft: 10,
        }}>
        <Image source={successCircleIcon} />
        <Text>Connected</Text>
      </View>
    </View>
  );
};

const Steps = ({setCustomerDetails, setStepsDetsils, setConnectionStatus}) => {
  return (
    <View style={{paddingHorizontal: 25}}>
      <CustomHeader rightIcon={closeIcon} />
      <View style={Styles.headerSection}>
        <CustomHeaderWithDesc headerText="Steps to follow" />
      </View>
      <View style={{paddingHorizontal: 25}}>
        <CustomSteps
          header="Step 01"
          desc="Double press on the pushbutton inside the LED ring."
        />
        <CustomSteps
          header="Step 02"
          desc="LED start flashes magenta followed by a beep sound. LED colour become stable magenta after a few seconds. Now iCON becomes a master & created a hotspot."
        />
        <CustomSteps
          header="Step 03"
          desc="Go to Phone Settings > WiFi & connect to Wi-Fi network SOLICON. (Password - solicon123 )"
        />
        <CustomSteps
          header="Step 04"
          desc="Return to app for configuring your device."
        />
      </View>

      <View style={CommonStyles.buttonWrapper}>
        <CustomButton
          text="Configure"
          backgroundStyle={CommonStyles.buttonBgStyle}
          textStyle={CommonStyles.buttonTextStyle}
          onpress={() => {
            setCustomerDetails(false);
            setStepsDetsils(false);
            setConnectionStatus(true);
          }}
        />
      </View>
    </View>
  );
};

const CustomSteps = ({header, desc}) => {
  return (
    <View style={Styles.stepsContainer}>
      <Text style={Styles.headerStep}>{header}</Text>
      <Text style={Styles.descStep}>{desc}</Text>
    </View>
  );
};

const ImagePreview = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={require('../../../assets/demo/iCONprecise1.png')} />
    </View>
  );
};

const DeviceInfo = ({
  setCustomerDetails,
  setModal,
  isData,
  setReConfig,
  setReDeploy,
}) => {
  return (
    <CustomWrapper>
      <View style={Styles.deviceInfoContainer}>
        <Text style={Styles.heading}>Device Info</Text>
        <Text style={Styles.desc}>
          {isData
            ? 'Device is already configured'
            : 'Device need to be configured'}
        </Text>
      </View>
      <View style={Styles.deviceDetailsContainer}>
        <CustomList
          deviceInfo
          deviceName="iCON LV"
          deviceId="A12XA1000005"
          deviceConfigStatus={isData ? 'CONFIGURED' : 'NOT CONFIGURED'}
          colorChanged="#7AB78C"
          onpress={() => navigation.navigate('deviceInfo')}
          icon={iconLVIcon}
          iconBgColor={isData ? '#7AB78C' : '#e746451a'}
        />
      </View>

      <View
        style={
          isData
            ? CommonStyles.buttonWrapperWithtwo
            : CommonStyles.buttonWrapper
        }>
        <CustomButton
          text="Configure"
          backgroundStyle={CommonStyles.buttonBgStyle}
          textStyle={CommonStyles.buttonTextStyle}
          onpress={() => {
            setCustomerDetails(true);
            setModal(true);
          }}
        />
      </View>
    </CustomWrapper>
  );
};

const DeviceConfigDeviceInfoScreen = ({navigation}) => {
  const [isModal, setModal] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(false);
  const [stepsDetsils, setStepsDetsils] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [isData, setDataLocal] = useState(true);

  const [isReConfig, setReConfig] = useState(false);
  const [isReDeploy, setReDeploy] = useState(false);
  return (
    <View style={{flex: 1}}>
      <TopBottomLayout
        topHeight={0.6}
        bottomHeight={1}
        backButtonType="backArrow"
        backButtonAction={() => navigation.goBack()}
        topSection={<ImagePreview />}
        bottomSection={
          <DeviceInfo
            setCustomerDetails={setCustomerDetails}
            setModal={setModal}
            isData={isData}
            setReConfig={setReConfig}
            setReDeploy={setReDeploy}
          />
        }
      />
      {isModal && (
        <Modal visible={true} animationType="fade" transparent={true}>
          <View style={{flex: 1, backgroundColor: '#000000a6'}}>
            <View
              style={{
                flex: customerDetails || stepsDetsils ? 0.15 : 1,
                backgroundColor: '#000000a6',
              }}></View>
            <View
              style={{
                flex: customerDetails || stepsDetsils ? 1 : 0.5,
                backgroundColor: '#000000a6',
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  borderTopLeftRadius: 25,
                  borderTopRightRadius: 25,
                }}>
                {customerDetails && (
                  <CustomerForm
                    setCustomerDetails={setCustomerDetails}
                    setStepsDetsils={setStepsDetsils}
                  />
                )}
                {stepsDetsils && (
                  <Steps
                    setCustomerDetails={setCustomerDetails}
                    setStepsDetsils={setStepsDetsils}
                    setConnectionStatus={setConnectionStatus}
                  />
                )}
                {connectionStatus && (
                  <ConnectionStatus
                    setCustomerDetails={setCustomerDetails}
                    setStepsDetsils={setStepsDetsils}
                    setConnectionStatus={setConnectionStatus}
                    setModal={setModal}
                    navigation={navigation}
                  />
                )}
                {isReConfig ||
                  (isReDeploy && (
                    <ReconfigRedeployComponent
                      setModal={setModal}
                      setReConfig={setReConfig}
                      setStepsDetsils={setStepsDetsils}
                      isReDeploy={isReDeploy}
                      navigation={navigation}
                    />
                  ))}
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default DeviceConfigDeviceInfoScreen;
