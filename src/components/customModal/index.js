import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity, Image, Alert} from 'react-native';
import {closeIcon, arrowBackIcon, arrowForwardIcon} from '../../assets';
import Styles from './styles';
import moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker';
import {CustomButton} from '..';

export default CustomModal = ({showMoadal, handleModal, selectedValue}) => {
  const [selectedPriod, setPeriod] = useState('');

  const handlePeriod = value => {
    if (value === 'Period') {
      setPeriod('Period');
    } else {
      // setPeriod(value);
      handleModal(false);
      selectedValue(value);
    }
  };
  return (
    <Modal transparent={true} visible={showMoadal} animationType={'slide'}>
      <View style={Styles.container}>
        {selectedPriod !== '' ? (
          <CalanderView handleModal={handleModal} handleDate={selectedValue} />
        ) : (
          <ListSection handlePeriod={handlePeriod} handleModal={handleModal} />
        )}
      </View>
    </Modal>
  );
};

const ListSection = ({handlePeriod, handleModal}) => {
  return (
    <View style={Styles.bottomSection}>
      <TouchableOpacity
        onPress={() => handleModal(false)}
        style={Styles.closeIconContainer}>
        <Image source={closeIcon} style={Styles.closeIcon} />
      </TouchableOpacity>
      <Text style={Styles.listHeading}>Select Option</Text>
      <ListData
        data={['Lifetime', 'Today', 'Last 7 days', 'Last 12 months', 'Period']}
        setPeriod={handlePeriod}
      />
    </View>
  );
};

const ListData = ({data, setPeriod}) => {
  console.log('data', data);

  return (
    <View style={{}}>
      {data && data.length
        ? data.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => setPeriod(item)} key={index}>
                <Text style={Styles.listText}>{item}</Text>
              </TouchableOpacity>
            );
          })
        : null}
    </View>
  );
};

const CalanderView = ({handleModal, handleDate}) => {
  const [selectedDay, setDay] = useState('');
  console.log('currentDay', selectedDay);

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const onDateChange = (date, type) => {
    //function to handle the date change
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(date);
    }

    console.log('date, type', date, type);
  };
  const handleSubmit = () => {
    let date = '';
    if (selectedStartDate === null && selectedEndDate !== null) {
      date = selectedEndDate;
    } else if (selectedStartDate !== null && selectedEndDate === null) {
      date = selectedEndDate;
    } else if (selectedStartDate !== null && selectedEndDate !== null) {
      date = selectedEndDate;
    }

    console.log('date ===>', date);
    if (date === '') {
      Alert.alert('Warning', 'please selesct a DATE');
    } else {
      if (date !== '' && date !== null) {
        handleDate(date);
        handleModal(false);
      } else {
        Alert.alert('Warning', 'please selesct a DATE');
      }
    }
  };
  return (
    <View
      style={{
        backgroundColor: '#fff',
        height: '90%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 24,
      }}>
      <TouchableOpacity
        onPress={() => handleModal(false)}
        style={Styles.closeIconContainer}>
        <Image source={closeIcon} style={[Styles.closeIcon, {right: 0}]} />
      </TouchableOpacity>
      <Text style={Styles.listHeading}>Select date range</Text>
      <CalendarPicker
        allowRangeSelection={true}
        minDate={new Date(2018, 1, 1)}
        maxDate={new Date(2050, 6, 3)}
        weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
        months={[
          'January',
          'Febraury',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ]}
        // previousTitle="Previous"
        previousComponent={
          <Image source={arrowBackIcon} style={{tintColor: '#E28534'}} />
        }
        nextComponent={
          <Image source={arrowForwardIcon} style={{tintColor: '#E28534'}} />
        }
        todayBackgroundColor="#7F91BB"
        selectedDayColor="#7F91BB"
        selectedDayTextColor="#fff"
        scaleFactor={375}
        textStyle={{
          fontFamily: 'Cochin',
          color: '#000000',
        }}
        onDateChange={onDateChange}
        selectedDayStyle={{
          backgroundColor: 'red',
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 25,
          width: '100%',
          alignSelf: 'center',
        }}>
        <CustomButton
          onpress={() => handleSubmit()}
          text="Done"
          textColor="#fff"
          backgroundStyle={{
            backgroundColor: '#E28534',
            height: 44,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',

            shadowColor: '#243A5E',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,

            elevation: 8,
          }}
          textStyle={{
            color: '#fff',
          }}
        />
      </View>
    </View>
  );
};
