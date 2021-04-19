export const DEVICE_IP = '192.168.4.1';
export const DEVICE_PORT = 5000;
export const DEVICE_TIMEOUT = 3000;

export const SERVER_IP = '3.7.33.233';
export const SERVER_PORT = 8788;
export const SERVER_PORT_HV = 8799;
export const SERVER_TIMEOUT = 5000;

export const SYNC_WORD_LV = 'CC';
export const SYNC_WORD_HV = 'BB';
export const EEPROM = 'FC00';
export const BATTERY_EEPROM = 'FC6A';
export const BATTERY_EEPROM_HV = 'FC62';
export const UPS_EEPROM = 'FC62';
export const THRESHOLD_EEPROM = 'FC85';
export const WIFI_EEPROM = 'FC22';

export const BASE_SESSION_ID = '00000000';
export const BASE_CONSTANT = '0000';

export const CONSTANT1 = '07';
export const CONSTANT2 = '05';

export const HandleBytes = (data, size) => {};

export const splitDataFromResponseAndSessionId = (str, type) => {
  const syncWord = str.substr(0, 2);
  const constant1 = str.substr(2, 2);
  const length = str.substr(4, 4);
  const dvf = str.substr(8, 2);
  const deviceId = str.substr(10, 24);
  const deviceType = str.substr(34, 2);
  const HWMajorV = str.substr(36, 2);
  const HWMinerV = str.substr(38, 2);
  const FWMajorV = str.substr(40, 2);
  const hwMinerV = str.substr(42, 2);
  const UMajorV = str.substr(44, 2);
  const UMinorV = str.substr(46, 2);
  const sessionID = str.substr(48, 8);
  const checksum = str.substr(56, 4);

  if (type === 'deviceType') {
    return deviceType;
  } else {
    return sessionID;
  }
};
