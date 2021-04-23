import axios from 'axios';

const BASEURL = 'https://web.nyquestindia.com/API/api/index.php';

const LOGINURL = '/logincheck';
const SEND_OTP = '/sendotp';
const LOGIN_WITH_OTP = '/loginwithotp';
const DEALER_DEVICE_LIST = '/dealeractivedevice';
const VALIDATE_DEVICE = '/checkDeviceIdExists';
const SAVED_DEALER_CUSTOMER = '/savedealercustomer';
const SAVED_DEVICE_DEPLOY = '/savedevicedeploy';
const EDIT_ACCOUNT = '/editaccount';
const CHANGE_PASSWORD = '/changepassword';
// Customer API's
const GET_DEVICE_FOR_CUSTOMER = '/getdeviceforcust';

const MiddleWareForAuth = async (method, endPont, params, callback) => {
  if (method === 'GET') {
    GETRequest(endPont, params, callback);
  }

  if (method === 'POST') {
    POSTRequest(endPont, params, callback);
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

const POSTRequest = (endPont, params, callback) => {
  const url = BASEURL + '' + endPont;
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
