import React from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {
  logoIcon,
  notificationIcon,
  navigateNextIcon,
  homeIcon,
  dashboardIcon,
  plusIcon,
  contactSupportIcon,
  customerIcon,
} from '../../assets';
import {CustomHeader, CustomInput} from '../../components';
import Styles from './styles';

export default CustomList = ({
  customerName,
  deviceName,
  deviceNickName,
  deviceId,
  onpress,
  bgColor,
  navigateNext,
  icon,
  iconBgColor,
  defaultList,
  defaultText,
  deviceInfo,
  deviceConfigStatus,
  config,
  colorChanged,
}) => (
  <TouchableOpacity
    onPress={() => onpress && onpress()}
    style={
      bgColor
        ? [Styles.deviceListContainer, {backgroundColor: bgColor}]
        : defaultList && !bgColor
        ? [Styles.deviceListContainer, {backgroundColor: 'transparent'}]
        : Styles.deviceListContainer
    }>
    <View
      style={defaultList ? Styles.imageSectionDefault : Styles.imageSection}>
      <View
        style={
          defaultList
            ? Styles.imageContainerDefault
            : [Styles.imageContainer, {backgroundColor: iconBgColor}]
        }>
        {icon && <Image source={icon} />}
      </View>
    </View>

    {defaultList ? (
      <View style={Styles.contentSectionDefault}>
        <View>
          <Text style={Styles.defaultText}>{defaultText && defaultText}</Text>
        </View>
      </View>
    ) : deviceInfo ? (
      <View style={Styles.contentSection}>
        <View style={Styles.deviceInfoNameContainer}>
          <Text style={Styles.deviceInfoName}>{deviceName && deviceName} </Text>
        </View>
        <Text style={[Styles.deviceId, {color: '#4F4F4F'}]}>
          Device Id : {deviceId && deviceId}
        </Text>
        <Text
          style={[
            Styles.deviceId,
            {color: colorChanged ? colorChanged : '#F3937E'},
          ]}>
          {deviceConfigStatus && deviceConfigStatus}
        </Text>
      </View>
    ) : config ? (
      <View style={Styles.contentSection}>
        <View style={Styles.deviceInfoNameContainer}>
          <Text style={Styles.deviceInfoName}>{deviceName && deviceName} </Text>
        </View>
        <Text style={[Styles.deviceId, {color: '#4F4F4F'}]}>
          {deviceId && deviceId}
        </Text>
      </View>
    ) : (
      <View style={Styles.contentSection}>
        <View>
          <Text style={Styles.customerName}>
            {customerName && customerName}
          </Text>
        </View>

        <View>
          <View style={Styles.deviceNameContainer}>
            <Text style={Styles.deviceName}>{deviceName && deviceName} </Text>
            {deviceNickName && (
              <Text style={[Styles.deviceName, {fontWeight: '400'}]}>
                | {deviceNickName}
              </Text>
            )}
          </View>
          <Text style={Styles.deviceId}>
            Device Id : {deviceId && deviceId}
          </Text>
        </View>
      </View>
    )}

    {navigateNext && (
      <View
        style={
          defaultList
            ? Styles.navigateImageSectionDefault
            : Styles.navigateImageSection
        }>
        <Image source={navigateNextIcon} />
      </View>
    )}
  </TouchableOpacity>
);
