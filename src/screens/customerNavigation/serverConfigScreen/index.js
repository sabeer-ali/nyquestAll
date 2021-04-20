import React, {useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import Styles from './styles';
import {
  TopBottomLayout,
  CustomList,
  CustomHeaderWithDesc,
  CustomInput,
  LabelValuePair,
  CustomCounter,
} from '../../../components';
import {color, CommonStyles} from '../../../utils/CommonStyles';
import {
  processCompleteIcon,
  processCompletedBarIcon,
  processPendingIcon,
  processPendingBarIcon,
  inProgressIcon,
} from '../../../assets';

const StepsPreview = ({step}) => {
  const [stepHeaderValue, setstepHeaderValue] = useState([
    {
      header: 'Server Configuration',
      value: 'Enter server configuration details',
    },
    {
      header: 'Battery Configuration',
      value: 'Enter battery configuration details',
    },
    {header: 'UPS Configuration', value: 'Enter UPS configuration details'},
    {header: 'Solar Configuration', value: 'Enter solar configuration details'},
    {
      header: 'Threshold Configuration',
      value: 'Enter Threshold configuration details',
    },
  ]);

  const [stepProcess, setStepsProcess] = useState({
    1: [
      inProgressIcon,
      processPendingBarIcon,
      processPendingIcon,
      processPendingBarIcon,
      processPendingIcon,
      processPendingBarIcon,
      processPendingIcon,
      processPendingBarIcon,
      processPendingIcon,
    ],
    2: [
      processCompleteIcon,
      processCompletedBarIcon,
      inProgressIcon,
      processPendingBarIcon,
      processPendingIcon,
      processPendingBarIcon,
      processPendingIcon,
      processPendingBarIcon,
      processPendingIcon,
    ],
    3: [
      processCompleteIcon,
      processCompletedBarIcon,
      processCompleteIcon,
      processCompletedBarIcon,
      inProgressIcon,
      processPendingBarIcon,
      processPendingIcon,
      processPendingBarIcon,
      processPendingIcon,
    ],
    4: [
      processCompleteIcon,
      processCompletedBarIcon,
      processCompleteIcon,
      processCompletedBarIcon,
      processCompleteIcon,
      processCompletedBarIcon,
      inProgressIcon,
      processPendingBarIcon,
      processPendingIcon,
    ],
    5: [
      processCompleteIcon,
      processCompletedBarIcon,
      processCompleteIcon,
      processCompletedBarIcon,
      processCompleteIcon,
      processCompletedBarIcon,
      processCompleteIcon,
      processCompletedBarIcon,
      inProgressIcon,
    ],
  });

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 40,
        }}>
        {stepProcess[step].map(item => {
          return <Image source={item} />;
        })}
      </View>
      <View>
        <CustomHeaderWithDesc
          white
          headerText={stepHeaderValue[step - 1].header}
          descText={stepHeaderValue[step - 1].value}
        />
      </View>
    </View>
  );
};

const Form5 = ({navigation, setStep}) => {
  return (
    <View style={Styles.InputContainer}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <View style={Styles.wrappper}>
          <CustomInput
            form
            labelValuePair
            placeholder="30"
            label="Equalization Interval (In Days)"
            validation="Valid entry between 7 to 30."
          />
        </View>
        <View style={Styles.wrappper}>
          <CustomInput
            form
            labelValuePair
            placeholder="6"
            label="Equalization Duration (In Hours)"
            validation="Valid entry  between 1 to 12."
          />
        </View>
        <View style={Styles.wrappper}>
          <CustomInput
            form
            labelValuePair
            placeholder="5"
            label="Absorption Interval (In Days)"
            validation="Valid entry  between 1 to 7."
          />
        </View>

        <CustomCounter label="Modules in series" value="01 No" />

        <CustomCounter label="Modules in paralell" value="01 No" />
        <View style={Styles.wrappper}>
          <LabelValuePair label="Total Solar Capacity" value="00.00 kW" />
        </View>
      </ScrollView>
      <View style={{flex: 0.3}}>
        <View style={CommonStyles.buttonWrapper}>
          <CustomButton
            text="Done"
            backgroundStyle={CommonStyles.buttonBgStyle}
            textStyle={CommonStyles.buttonTextStyle}
            onpress={() => navigation.navigate('deviceConfigMenu')}
          />
        </View>
      </View>
    </View>
  );
};

const Form4 = ({setStep}) => {
  return (
    <View style={Styles.InputContainer}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <View style={Styles.wrappper}>
          <CustomInput form placeholder="Solar Module Make" />
        </View>
        <View style={Styles.wrappper}>
          <CustomInput form placeholder="Solar Module Model" />
        </View>
        <View style={Styles.wrappper}>
          <CustomInput form placeholder="Solar Module Wattage (kW)" />
        </View>

        <CustomCounter label="Modules in series" value="01 No" />

        <CustomCounter label="Modules in paralell" value="01 No" />
        <View style={Styles.wrappper}>
          <LabelValuePair label="Total Solar Capacity" value="00.00 kW" />
        </View>
      </ScrollView>
      <View style={{flex: 0.4}}>
        <View style={CommonStyles.buttonWrapper}>
          <CustomButton
            text="Continue"
            backgroundStyle={CommonStyles.buttonBgStyle}
            textStyle={CommonStyles.buttonTextStyle}
            onpress={() => setStep(5)}
          />
        </View>
      </View>
    </View>
  );
};

const Form3 = ({setStep}) => {
  return (
    <View style={Styles.InputContainer}>
      <View style={{flex: 1}}>
        <View style={Styles.wrappper}>
          <CustomInput form placeholder="UPS Make" />
        </View>
        <View style={Styles.wrappper}>
          <CustomInput form placeholder="UPS Model" />
        </View>
        <View style={Styles.wrappper}>
          <CustomInput form placeholder="UPS VA" />
        </View>
        <Text style={Styles.form3desc}>
          Value range for iCON 12V - 600 to 1100 & for iCON 24V - 1200 to 2000.
        </Text>
      </View>
      <View style={{flex: 0.4}}>
        <View style={CommonStyles.buttonWrapper}>
          <CustomButton
            text="Continue"
            backgroundStyle={CommonStyles.buttonBgStyle}
            textStyle={CommonStyles.buttonTextStyle}
            onpress={() => setStep(4)}
          />
        </View>
      </View>
    </View>
  );
};

const Form2 = ({setStep}) => {
  return (
    <View style={Styles.InputContainer}>
      <ScrollView style={{flex: 1}}>
        <View style={Styles.wrappper}>
          <CustomInput form placeholder="Battery Make" />
        </View>
        <View style={Styles.wrappper}>
          <CustomInput form placeholder="Battery Model" />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 25,
          }}>
          <LabelValuePair label="Max Volt" value="00.00 V" />
          <LabelValuePair label="Min Volt" value="00.00 V" />
        </View>

        <CustomCounter label="Battery Age" value="0 Year" />

        <View style={Styles.wrappper}>
          <CustomInput form placeholder="Battery Capacity (Ah)" />
        </View>
        <CustomCounter label="Numbers in paralell" value="01 No" />
        <View style={Styles.wrappper}>
          <LabelValuePair label="Total Battery Capacity" value="00.00 Ah" />
        </View>
      </ScrollView>

      <View style={{flex: 0.3}}>
        <View style={CommonStyles.buttonWrapper}>
          <CustomButton
            text="Continue"
            backgroundStyle={CommonStyles.buttonBgStyle}
            textStyle={CommonStyles.buttonTextStyle}
            onpress={() => setStep(3)}
          />
        </View>
      </View>
    </View>
  );
};

const Form1 = ({setStep}) => {
  return (
    <View style={Styles.InputContainer}>
      <View style={{flex: 1}}>
        <View style={Styles.wrappper}>
          <CustomInput form placeholder="IP Address" />
        </View>
        <View style={Styles.wrappper}>
          <CustomInput form placeholder="Port Number" />
        </View>
      </View>
      <View style={{flex: 0.4}}>
        <View style={CommonStyles.buttonWrapper}>
          <CustomButton
            text="Continue"
            backgroundStyle={CommonStyles.buttonBgStyle}
            textStyle={CommonStyles.buttonTextStyle}
            onpress={() => setStep(2)}
          />
        </View>
      </View>
    </View>
  );
};

const Forms = ({step, setStep, navigation}) => {
  if (step === 1) {
    return <Form1 setStep={setStep} />;
  } else if (step === 2) {
    return <Form2 setStep={setStep} />;
  } else if (step === 3) {
    return <Form3 setStep={setStep} />;
  } else if (step === 4) {
    return <Form4 setStep={setStep} />;
  } else if (step === 5) {
    return <Form5 setStep={setStep} navigation={navigation} />;
  }
};

const serverConfigScreen = ({navigation}) => {
  const [step, setStep] = useState(1);
  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <TopBottomLayout
        topHeight={0.5}
        bottomHeight={1}
        backButtonType="backArrow"
        backButtonAction={() => {
          if (step === 1) {
            navigation.goBack();
          } else {
            setStep(step - 1);
          }
        }}
        topSection={<StepsPreview step={step} status={'completed'} />}
        bottomSection={
          <Forms step={step} setStep={setStep} navigation={navigation} />
        }
      />
    </ScrollView>
  );
};

export default serverConfigScreen;
