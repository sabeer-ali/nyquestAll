import React from 'react';
import {View, Modal, TouchableOpacity, Image, Text} from 'react-native';
import {Button} from 'react-native-paper';
import Styles from './styles';
import {
  SecondaryCommonLayout,
  CommonBottomNavigator,
  CustomList,
  CustomHeaderWithDesc,
} from '../../../components';
import {
  contactSupportIcon,
  infoSqureIcon,
  supportAgentIcon,
  helpSupportIcon,
  closeIcon,
  agentIcon,
} from '../../../assets';

const CustomerSupportContent = props => {
  return (
    <View style={{flex: 12, backgroundColor: '#fff'}}>
      {props.children}
      <CustomHeaderWithDesc
        headerText="Customer Care"
        descText="We are at your service 24 x 7"
      />
      <View style={{marginVertical: 20, paddingHorizontal: 20}}>
        <Image source={agentIcon} />
      </View>
      <View style={{marginVertical: 20, paddingHorizontal: 20}}>
        <Text style={Styles.tollFree}>TOLL FREE</Text>
        <Text style={Styles.customerCareNumber}>1800 100 100</Text>
        <Button
          mode="contained"
          style={Styles.modalButton}
          labelStyle={Styles.modalButtonLabel}
          onPress={() => console.log('Pressed')}>
          Call Now
        </Button>
      </View>
    </View>
  );
};
export default SupportScreen = ({navigation}) => {
  const [isModal, setModal] = React.useState(false);
  return (
    <View style={{flex: 1}}>
      <SecondaryCommonLayout
        topHeaderIcon={contactSupportIcon}
        headerText="Support"
        headerDes="We are always here to serve  you">
        <CustomList
          defaultList
          onpress={() =>
            navigation.navigate('supportDetails', {
              data: 'Information Center',
            })
          }
          navigateNext
          icon={infoSqureIcon}
          defaultText="Information Center"
        />
        <CustomList
          defaultList
          onpress={() =>
            navigation.navigate('FAQ', {
              data: 'FAQ',
            })
          }
          navigateNext
          icon={helpSupportIcon}
          defaultText="FAQ"
        />
        <CustomList
          defaultList
          onpress={() => setModal(true)}
          navigateNext
          icon={supportAgentIcon}
          defaultText="Customer Care"
        />

        {isModal ? (
          <Modal visible={isModal} transparent={true} animationType="slide">
            <View style={Styles.modalContainer}>
              <View style={{flex: 6}}></View>
              <View style={{flex: 11}}>
                <View style={Styles.modalwrapper}>
                  <TouchableOpacity
                    onPress={() => setModal(false)}
                    style={Styles.modalClose}>
                    <Image source={closeIcon} />
                  </TouchableOpacity>
                </View>
                <CustomerSupportContent></CustomerSupportContent>
              </View>
            </View>
          </Modal>
        ) : null}
      </SecondaryCommonLayout>

      {/* <View style={{backgroundColor: '#F5F8FF'}}>
        <CommonBottomNavigator navigation={navigation} state="supportScreen" />
      </View> */}
    </View>
  );
};
