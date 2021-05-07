import axios from 'axios';

const BASEURL = 'https://web.energy24by7.com/API/api/index.php';
//'https://web.nyquestindia.com/API/api/index.php';

const LOGINURL = '/logincheck';
const SEND_OTP = '/sendotp';
const LOGIN_WITH_OTP = '/loginwithotp';
const DEALER_DEVICE_LIST = '/dealeractivedevice';
const VALIDATE_DEVICE = '/checkDeviceIdExists';
const SAVED_DEALER_CUSTOMER = '/savedealercustomer';
const SAVED_DEVICE_DEPLOY = '/savedevicedeploynew'; //'/savedevicedeploy';
const EDIT_ACCOUNT = '/editaccount';
const CHANGE_PASSWORD = '/changepassword';
const DEALER_SEARCH = '/searchdealeractivedevice';
// Customer API's
const GET_DEVICE_FOR_CUSTOMER = '/getdeviceforcust';
const ADD_CUSTOMER_DEVICE = '/addcustomerdevice';
const REGISTER_URL = '/savecustomer';
const FORGOT_PASSWORD_OTP =
  'https://web.energy24by7.com/API3/index.php/forgotpasswordotp';
const VALIDATE_FORGOT_PASSWORD_OTP = '/validateOTPforgotpass';
const UPDATE_PASSWORD = '/updatepasswordreset';

const MiddleWareForAuth = async (
  method,
  endPont,
  params,
  callback,
  noBaseUrl,
) => {
  if (method === 'GET') {
    GETRequest(endPont, params, callback);
  }

  if (method === 'POST') {
    POSTRequest(endPont, params, callback, noBaseUrl);
  }
};

const GETRequest = async (endPont, params, callback) => {
  let url = BASEURL + '' + endPont;
  console.log('You Call GET ==> ', url);
  axios
    .get(url)
    .then(res => {
      callback(res, null);
    })
    .catch(err => {
      console.error('Err in GET API', err);
      callback(null, err);
    });
};

const POSTRequest = (endPont, params, callback, noBaseUrl) => {
  let url = '';
  if (noBaseUrl) {
    url = endPont;
  } else {
    url = BASEURL + '' + endPont;
  }

  console.log('You Call POST', url, params);
  axios
    .post(url, params)
    .then(res => {
      console.log('You Call POST RES ==> ', res.data);
      callback(res, null);
    })
    .catch(err => {
      console.error('Err in POST API', err);
      callback(null, err);
    });
};

export {
  DEALER_SEARCH,
  UPDATE_PASSWORD,
  VALIDATE_FORGOT_PASSWORD_OTP,
  FORGOT_PASSWORD_OTP,
  REGISTER_URL,
  ADD_CUSTOMER_DEVICE,
  CHANGE_PASSWORD,
  EDIT_ACCOUNT,
  GET_DEVICE_FOR_CUSTOMER,
  LOGINURL,
  SEND_OTP,
  LOGIN_WITH_OTP,
  DEALER_DEVICE_LIST,
  VALIDATE_DEVICE,
  SAVED_DEALER_CUSTOMER,
  SAVED_DEVICE_DEPLOY,
  MiddleWareForAuth,
};
