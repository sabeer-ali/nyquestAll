import React from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import {List} from 'react-native-paper';
import {PrimaryCommonLayout, CommonBottomNavigator} from '../../../components';
import Styles from './styles';
import primaryCommonLayout from '../../../components/primaryCommonLayout';

import {iconLVIcon, playIcon} from '../../../assets';

const FocusedView = props => {
  return (
    <View
      style={
        props.isFocused
          ? Styles.focusedView
          : {
              backgroundColor: 'transparent',
            }
      }>
      {props.children}
    </View>
  );
};

const FAQScreen = ({navigation, route}) => {
  const [expanded1, setExpanded1] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);

  const handlePress1 = () => setExpanded1(!expanded1);
  const handlePress2 = () => setExpanded2(!expanded2);
  const handlePress3 = () => setExpanded3(!expanded3);

  return (
    <View style={{flex: 1}}>
      <PrimaryCommonLayout
        leftIconAction={() => navigation.navigate('dealerSupport')}
        centerText={route.params.data}>
        <List.Section style={{paddingHorizontal: 20}}>
          <FocusedView isFocused={expanded1}>
            <List.Accordion
              title="About Solar Inverter"
              titleStyle={[
                Styles.accordionTitle,
                expanded1 && {fontWeight: '600'},
              ]}
              expanded={expanded1}
              onPress={handlePress1}>
              <List.Item
                titleNumberOfLines={10}
                titleStyle={Styles.accordionDesc}
                title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              />
            </List.Accordion>
          </FocusedView>

          <FocusedView isFocused={expanded2}>
            <List.Accordion
              title="About Solar Panel"
              titleStyle={[
                Styles.accordionTitle,
                expanded2 && {fontWeight: '600'},
              ]}
              expanded={expanded2}
              onPress={handlePress2}>
              <List.Item
                title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                titleStyle={Styles.accordionDesc}
                titleNumberOfLines={10}
              />
            </List.Accordion>
          </FocusedView>

          <FocusedView isFocused={expanded3}>
            <List.Accordion
              title="About Battery"
              titleStyle={[
                Styles.accordionTitle,
                expanded3 && {fontWeight: '600'},
              ]}
              expanded={expanded3}
              onPress={handlePress3}>
              <List.Item
                title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                titleStyle={Styles.accordionDesc}
                titleNumberOfLines={10}
              />
            </List.Accordion>
          </FocusedView>
        </List.Section>
      </PrimaryCommonLayout>
      <View style={{backgroundColor: '#F5F8FF'}}>
        <CommonBottomNavigator navigation={navigation} state="supportScreen" />
      </View>
    </View>
  );
};

export default FAQScreen;
