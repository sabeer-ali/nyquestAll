import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {arrowDownIcon, arrowUpIcon, locationIcon} from '../../assets';
import Styles from './styles';

export default collapsableComponent = ({icon, text, data}) => {
  const [isCollapse, setCollapse] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => setCollapse(!isCollapse)}
      style={
        isCollapse
          ? [Styles.container, {backgroundColor: '#fff'}]
          : Styles.container
      }>
      <View
        style={
          isCollapse
            ? [Styles.boxContainer, {paddingHorizontal: 20}]
            : Styles.boxContainer
        }>
        <View style={Styles.firstContainer}>
          <View style={Styles.firstImage}>
            <Image source={icon} />
          </View>
        </View>

        <View style={Styles.secondContainer}>
          <Text style={Styles.textStyle}>{text}</Text>
        </View>
        <View style={Styles.thirdContainer}>
          <Image source={isCollapse ? arrowUpIcon : arrowDownIcon} />
        </View>
      </View>

      {isCollapse && (
        <View style={Styles.boxContainerCollapse}>
          {data && data.length
            ? data.map((item, index) => {
                return (
                  <View style={Styles.boxDetailsContainer} key={index}>
                    <Text style={Styles.textleft}>{item.name}</Text>
                    <Text style={Styles.textRight}>{item.value}</Text>
                  </View>
                );
              })
            : null}
        </View>
      )}
    </TouchableOpacity>
  );
};
