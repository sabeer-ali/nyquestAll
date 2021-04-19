import React from 'react';
import {Alert, NativeModules} from 'react-native';
const {SocketConnection} = NativeModules;
import {
  SYNC_WORD_LV,
  SYNC_WORD_HV,
  CONSTANT1,
  CONSTANT2,
  BASE_SESSION_ID,
  DEVICE_IP,
  DEVICE_PORT,
  SERVER_PORT_HV,
  DEVICE_TIMEOUT,
  splitDataFromResponseAndSessionId,
  EEPROM,
  SERVER_IP,
  SERVER_PORT,
  BATTERY_EEPROM,
  UPS_EEPROM,
  THRESHOLD_EEPROM,
  BATTERY_EEPROM_HV,
  DEVICE_PORT_HV,
  WIFI_EEPROM,
} from './constants';

export const decToHex = (data) => {
  console.log('data in decToHex => ', data, typeof data);
  return data.toString(16).toUpperCase();
};

export const hexToDec = (data) => {
  return parseInt(data, 16);
};

export const fillWithZeros = (data, size) => {
  let tempData = '';
  console.log('data size EQL', data, size);

  for (let i = 0; i < size; i++) {
    tempData = tempData + '0';
  }

  return tempData;
};

export const combineDataWithSize = async (data, size, fill, callback) => {
  console.log('data, size, fill', data, size, fill);
  let tempData = '';

  if (data.length !== size) {
    if (fill == 'pre') {
      let tempSize = size - data > 0 ? size - data : size - data.length;
      console.log('tempSize ----------->', tempSize);
      let zeros = fillWithZeros(data, tempSize);
      tempData = `${zeros}${data}`;
    } else {
      console.log('(size - data)', size, data.length);
      let zeros = fillWithZeros(data, size - data.length);
      tempData = `${data}${zeros}`;
    }
  } else {
    tempData = data;
  }

  console.log('tempData ------ > ', tempData);
  if (callback) {
    callback(tempData);
  } else {
    return tempData;
  }
};

export const stringCombine = (data) => {
  let tempData = '';
  data.map((item) => {
    tempData = tempData + '' + item;
  });
  console.log('str combine all ', tempData);
  return tempData;
};

export const ascii_to_hexa = (str) => {
  console.log('str', str);
  let arr1 = [];
  for (let n = 0, l = str.length; n < l; n++) {
    let hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join('');
};

const getFloatValueRounded = (data, position) => {
  return Number(data.toFixed(position));
};

const reverseData = (data) => {
  let result = data.match(/(..?)/g);

  console.log(data);
  let reversedData = result.reverse().join('');
  console.log('reversedData =>', reversedData);

  return reversedData;
};

export const floatToHex = (value) => {
  const getHex = (i) => ('00' + i.toString(16)).slice(-2);

  var view = new DataView(new ArrayBuffer(4)),
    result;

  view.setFloat32(0, value);

  result = Array.apply(null, {length: 4})
    .map((_, i) => getHex(view.getUint8(i)))
    .join('');

  console.log(result);
  return result;
};

export const deviceRequest = async (
  payload,
  ip,
  port,
  time,
  stage,
  callback,
) => {
  console.log('payload ==> ', payload, typeof payload);
  await SocketConnection.setDebug(true, (debug) => {
    console.log('setDebug Response ==> ', debug);
  });

  console.log('Stage ==> ', stage);

  await SocketConnection.connect(ip, port, time, (isConnected) => {
    console.log('connect Response  stage ==> ', stage, isConnected);
    if (isConnected) {
      SocketConnection.readWrite(payload, (deviceResponse) => {
        console.log(
          ' Response From readWrite stage ==> ',
          stage,
          deviceResponse,
        );
        if (callback) callback(deviceResponse);
        // SocketConnection.close();
      });
    }
  });
};

export const THRESHOLD_Config_Stage_6 = async (type, data, callback) => {
  console.log('110', typeof data.equalizationIntervel);
  const device = type === 'LV' ? SYNC_WORD_LV : SYNC_WORD_HV;
  const syncWord = device;
  const DATA_CONSTANT1 = CONSTANT2;
  const reqSessionId = data.sessionId;
  const packetLength = decToHex(8);
  const eepRom = reverseData(THRESHOLD_EEPROM);
  const dataLength = decToHex(5);
  const DATA_CONSTANT2 = '00';
  const DATA_CONSTANT3 = '00';
  const absorptionIntervelIntervel = decToHex(Number(data.absorptionIntervel));
  const equalizationIntervel = decToHex(Number(data.equalizationIntervel));
  const equalizationDuration = decToHex(Number(data.equalizationDuration));

  combineDataWithSize(packetLength.toString(), 4, 'pre', (packetLength1) => {
    combineDataWithSize(dataLength.toString(), 2, 'pre', (dataLength1) => {
      combineDataWithSize(equalizationIntervel.toString(), 2, 'pre', (ei) => {
        combineDataWithSize(equalizationDuration.toString(), 2, 'pre', (ed) => {
          combineDataWithSize(
            absorptionIntervelIntervel.toString(),
            2,
            'pre',
            (ai) => {
              console.log(
                'Datas in stg 6 => ',
                syncWord,
                DATA_CONSTANT1,
                reqSessionId,
                reverseData(packetLength1),
                eepRom,
                dataLength1,
                DATA_CONSTANT2,
                DATA_CONSTANT3,
                ei,
                ed,
                ai,
              );

              let strCombineResult = stringCombine([
                syncWord,
                DATA_CONSTANT1,
                reqSessionId,
                reverseData(packetLength1),
                eepRom,
                dataLength1,
                DATA_CONSTANT2,
                DATA_CONSTANT3,
                ei,
                ed,
                ai,
              ]);

              console.log('str combine', strCombineResult);
              if (strCombineResult) {
                SocketConnection.generateChecksum(
                  strCombineResult,
                  (checksum) => {
                    console.log('checksum stg 6', checksum);
                    combineDataWithSize(checksum, 4, 'pre', (checksumRes) => {
                      let payload = stringCombine([
                        strCombineResult,
                        reverseData(checksumRes),
                      ]);
                      console.log('payload ==> Before', payload);
                      if (payload) {
                        deviceRequest(
                          payload,
                          DEVICE_IP,
                          type === 'LV' ? DEVICE_PORT : DEVICE_PORT_HV,
                          DEVICE_TIMEOUT,
                          '6',
                          (resSuccess) => {
                            console.log('Res stage 6 ===>', resSuccess);
                            if (callback) callback(resSuccess);
                          },
                        );
                      }
                    });
                  },
                );
              }
            },
          );
        });
      });
    });
  });
};

export const DeviceCommunication_ExitConfig = async (type, data, callback) => {
  const device = type === 'LV' ? SYNC_WORD_LV : SYNC_WORD_HV;
  const syncWord = device;
  const DATA_CONSTANT1 = '09';
  const reqSessionId = data.sessionId;

  console.log('Datas in stg WIFI => ', syncWord, DATA_CONSTANT1, reqSessionId);

  let strCombineResult = stringCombine([
    syncWord,
    DATA_CONSTANT1,
    reqSessionId + '0000',
  ]);

  console.log('str combine Exit Config ', strCombineResult);
  if (strCombineResult) {
    SocketConnection.generateChecksum(strCombineResult, (checksum) => {
      console.log('checksum EXIT Config ', checksum);
      combineDataWithSize(checksum, 4, 'pre', (checksumRes) => {
        let payload = stringCombine([
          strCombineResult,
          reverseData(checksumRes),
        ]);
        console.log('payload ==> Before EXIT Config', payload);
        Alert.alert('Send data', JSON.stringify(payload));
        if (payload) {
          deviceRequest(
            payload,
            DEVICE_IP,
            DEVICE_PORT,
            DEVICE_TIMEOUT,
            'EXIT Config',
            (resSuccess) => {
              console.log('EXIT Config Res  ===>', resSuccess);
              if (callback) callback(resSuccess);
            },
          );
        }
      });
    });
  }
};

export const DeviceCommunication_wifisetup = async (type, data, callback) => {
  console.log('data 111111111111111111111111111111', data);
  const device = type === 'LV' ? SYNC_WORD_LV : SYNC_WORD_HV;
  const syncWord = device;
  const DATA_CONSTANT1 = CONSTANT2;
  const reqSessionId = data.sessionId;
  const packetLength = decToHex(67);
  const eepRom = WIFI_EEPROM;
  const dataLength = decToHex(64);
  const wifiSsid = ascii_to_hexa(data.wifiSSID);
  const wifiPassword = ascii_to_hexa(data.wifiPassword);

  combineDataWithSize(wifiSsid.toString(), 64, null, (wifiSSID1) => {
    combineDataWithSize(wifiPassword.toString(), 64, null, (wifiPasswd) => {
      combineDataWithSize(
        packetLength.toString(),
        4,
        'pre',
        (packetLength1) => {
          console.log(
            'Datas in stg WIFI => ',
            syncWord,
            DATA_CONSTANT1,
            reqSessionId,
            reverseData(packetLength1),
            reverseData(eepRom),
            dataLength,
            reverseData(wifiSSID1),
            reverseData(wifiPasswd),
          );

          let strCombineResult = stringCombine([
            syncWord,
            DATA_CONSTANT1,
            reqSessionId,
            reverseData(packetLength1),
            reverseData(eepRom),
            dataLength,
            wifiSSID1,
            wifiPasswd,
          ]);

          console.log('str combine', strCombineResult);
          if (strCombineResult) {
            SocketConnection.generateChecksum(strCombineResult, (checksum) => {
              console.log('checksum WIFI ', checksum);
              combineDataWithSize(checksum, 4, 'pre', (checksumRes) => {
                let payload = stringCombine([
                  strCombineResult,
                  reverseData(checksumRes),
                ]);
                console.log('payload ==> Before Wifi Setup', payload);
                Alert.alert('Send data', JSON.stringify(payload));
                if (payload) {
                  deviceRequest(
                    payload,
                    DEVICE_IP,
                    DEVICE_PORT,
                    DEVICE_TIMEOUT,
                    'WIFI',
                    (resSuccess) => {
                      console.log('Wifi Set up  ===>', resSuccess);
                      if (callback) callback(resSuccess);
                    },
                  );
                }
              });
            });
          }
        },
      );
    });
  });
};

export const SOLAR_Config_Stage_5 = async (type, data, callback) => {
  const device = type === 'LV' ? SYNC_WORD_LV : SYNC_WORD_HV;
  const syncWord = device;
  const DATA_CONSTANT1 = CONSTANT2;
  const reqSessionId = data.sessionId;
  const packetLength = decToHex(15);
  const eepRom = reverseData(UPS_EEPROM);
  const dataLength = decToHex(12);
  const solarCapacity = reverseData(floatToHex(data.solarCapacity));
  const mainChargeIn = reverseData(floatToHex(data.mainChargeIN));
  const mainChargeOut = reverseData(floatToHex(data.mainChargeOUT));

  combineDataWithSize(packetLength.toString(), 4, 'pre', (packetLength1) => {
    combineDataWithSize(dataLength.toString(), 2, 'pre', (dataLength1) => {
      console.log(
        'Datas in stg 5 => ',
        syncWord,
        DATA_CONSTANT1,
        reqSessionId,
        reverseData(packetLength1),
        eepRom,
        dataLength1,
        solarCapacity,
        mainChargeIn,
        mainChargeOut,
      );

      let strCombineResult = stringCombine([
        syncWord,
        DATA_CONSTANT1,
        reqSessionId,
        reverseData(packetLength1),
        eepRom,
        dataLength1,
        solarCapacity,
        mainChargeIn,
        mainChargeOut,
      ]);

      console.log('str combine', strCombineResult);
      if (strCombineResult) {
        SocketConnection.generateChecksum(strCombineResult, (checksum) => {
          console.log('checksum stg 5', checksum);
          combineDataWithSize(checksum, 4, 'pre', (checksumRes) => {
            let payload = stringCombine([
              strCombineResult,
              reverseData(checksumRes),
            ]);
            console.log('payload ==> Before', payload);
            Alert.alert('Send data', JSON.stringify(payload));
            if (payload) {
              deviceRequest(
                payload,
                DEVICE_IP,
                DEVICE_PORT,
                DEVICE_TIMEOUT,
                '5',
                (resSuccess) => {
                  console.log('Res stage 4 ===>', resSuccess);
                  if (callback) callback(resSuccess);
                },
              );
            }
          });
        });
      }
    });
  });
};

export const UPS_Config_Stage_4 = async (type, data, callback) => {
  const device = type === 'LV' ? SYNC_WORD_LV : SYNC_WORD_HV;
  const syncWord = device;
  const DATA_CONSTANT1 = CONSTANT2;
  const reqSessionId = data.sessionId;
  const packetLength = decToHex(11);
  const eepRom = reverseData(UPS_EEPROM);
  const dataLength = decToHex(8);
  const dcOverload = reverseData(
    floatToHex(getFloatValueRounded(data.dcOverload, 2)),
  );
  const acOverload = reverseData(
    floatToHex(getFloatValueRounded(data.acOverload, 2)),
  );

  combineDataWithSize(packetLength.toString(), 4, 'pre', (packetLength1) => {
    combineDataWithSize(dataLength.toString(), 2, 'pre', (dataLength1) => {
      console.log(
        'Datas in stg 4 => ',
        syncWord,
        DATA_CONSTANT1,
        reqSessionId,
        reverseData(packetLength1),
        eepRom,
        dataLength1,
        dcOverload,
        acOverload,
      );

      let strCombineResult = stringCombine([
        syncWord,
        DATA_CONSTANT1,
        reqSessionId,
        reverseData(packetLength1),
        eepRom,
        dataLength1,
        dcOverload,
        acOverload,
      ]);

      console.log('str combine', strCombineResult);
      if (strCombineResult) {
        SocketConnection.generateChecksum(strCombineResult, (checksum) => {
          console.log('checksum stg 3', checksum);
          combineDataWithSize(checksum, 4, 'pre', (checksumRes) => {
            let payload = stringCombine([
              strCombineResult,
              reverseData(checksumRes),
            ]);
            console.log('payload ==> Before', payload);
            Alert.alert('Send data', JSON.stringify(payload));
            if (payload) {
              deviceRequest(
                payload,
                DEVICE_IP,
                DEVICE_PORT,
                DEVICE_TIMEOUT,
                '4',
                (resSuccess) => {
                  console.log('Res stage 4 ===>', resSuccess);
                  if (callback) callback(resSuccess);
                },
              );
            }
          });
        });
      }
    });
  });
};

export const Battery_Config_Stage_3 = async (type, data, callback) => {
  const device = type === 'LV' ? SYNC_WORD_LV : SYNC_WORD_HV;
  const syncWord = device;
  const DATA_CONSTANT1 = CONSTANT2;
  const reqSessionId = data.sessionId;

  console.log('From COde to Dev ', data);

  if (type === 'LV') {
    const packetLength = decToHex(18);
    const eepRom = reverseData(BATTERY_EEPROM);
    const dataLength = reverseData(decToHex(15));
    const batteryType = data.batteryType;
    const batterMaxVolt = reverseData(floatToHex(data.batteryMaxVoltage));
    const batterAh = reverseData(floatToHex(data.batteryAh));
    const batteryAge = decToHex(data.batteryAge);
    const forceTripExileVolt = reverseData(
      floatToHex(data.forceTripExileVoltage),
    );
    const numberOfFTs = data.noOfFts;

    combineDataWithSize(batteryType.toString(), 2, 'pre', (res) => {
      combineDataWithSize(numberOfFTs, 2, null, (res1) => {
        combineDataWithSize(batteryAge.toString(), 2, 'pre', (res2) => {
          combineDataWithSize(dataLength, 2, 'pre', (res3) => {
            combineDataWithSize(packetLength.toString(), 4, null, (res4) => {
              console.log(
                'data -- stage -- 03 =>',
                syncWord,
                DATA_CONSTANT1,
                reqSessionId,
                res4,
                eepRom,
                res3,
                res,
                batterMaxVolt,
                batterAh,
                res2,
                forceTripExileVolt,
                res1,
              );
              let strCombineResult = stringCombine([
                syncWord,
                DATA_CONSTANT1,
                reqSessionId,
                res4,
                eepRom,
                res3,
                res,
                batterMaxVolt,
                batterAh,
                res2,
                forceTripExileVolt,
                res1,
              ]);

              console.log('str combine', strCombineResult);
              if (strCombineResult) {
                SocketConnection.generateChecksum(
                  strCombineResult,
                  (checksum) => {
                    console.log('checksum stg 3', checksum);
                    combineDataWithSize(checksum, 4, 'pre', (checksumRes) => {
                      let payload = stringCombine([
                        strCombineResult,
                        reverseData(checksumRes),
                      ]);
                      console.log('payload ==> Before', payload);
                      if (payload) {
                        deviceRequest(
                          payload,
                          DEVICE_IP,
                          DEVICE_PORT,
                          DEVICE_TIMEOUT,
                          '3',
                          (resSuccess) => {
                            console.log('Res stage 3===>', resSuccess);
                            if (callback) callback(resSuccess);
                          },
                        );
                      }
                    });
                  },
                );
              }
            });
          });
        });
      });
    });
  } else {
    const packetLengthHV = decToHex(17);
    const eepRomHV = reverseData(BATTERY_EEPROM_HV);
    const dataLengthHV = reverseData(decToHex(14));
    const batterySOCHV = decToHex(data.batteryAh);
    const batteryMaxVoltage = floatToHex(data.batteryMaxVoltage);
    const batteryMinVoltage = floatToHex(data.batteryMinVoltage);
    const solarConVolt = floatToHex(data.batteryMaxVoltage);

    combineDataWithSize(batterySOCHV.toString(), 4, 'pre', (batterySOC) => {
      combineDataWithSize(
        packetLengthHV.toString(),
        4,
        'pre',
        (packetLengthHv) => {
          combineDataWithSize(
            dataLengthHV.toString(),
            2,
            'pre',
            (dataLengthHv) => {
              console.log(
                'HV STG 2',
                syncWord,
                DATA_CONSTANT1,
                reqSessionId,
                reverseData(packetLengthHv),
                eepRomHV,
                dataLengthHv,
                reverseData(batterySOC),
                reverseData(batteryMaxVoltage),
                reverseData(batteryMinVoltage),
                reverseData(solarConVolt),
              );

              let strCombineResult = stringCombine([
                syncWord,
                DATA_CONSTANT1,
                reqSessionId,
                reverseData(packetLengthHv),
                eepRomHV,
                dataLengthHv,
                reverseData(batterySOC),
                reverseData(batteryMaxVoltage),
                reverseData(batteryMinVoltage),
                reverseData(solarConVolt),
              ]);

              console.log('str combine', strCombineResult);
              if (strCombineResult) {
                SocketConnection.generateChecksum(
                  strCombineResult,
                  (checksum) => {
                    console.log('checksum stg 3', checksum);
                    combineDataWithSize(checksum, 4, 'pre', (checksumRes) => {
                      let payload = stringCombine([
                        strCombineResult,
                        reverseData(checksumRes),
                      ]);
                      console.log('payload ==> Before', payload);
                      Alert.alert('Send data', JSON.stringify(payload));
                      if (payload) {
                        deviceRequest(
                          payload,
                          DEVICE_IP,
                          DEVICE_PORT,
                          DEVICE_TIMEOUT,
                          '3',
                          (resSuccess) => {
                            console.log('Res stage 3===>', resSuccess);
                            if (callback) callback(resSuccess);
                          },
                        );
                      }
                    });
                  },
                );
              }
            },
          );
        },
      );
    });
  }
};

export const DeviceCommunication_Stage_2 = async (type, data, callback) => {
  const device = type === 'LV' ? SYNC_WORD_LV : SYNC_WORD_HV;
  const syncWord = device;
  const DATA_CONSTANT1 = CONSTANT2;
  const reqSessionId = splitDataFromResponseAndSessionId(data);
  const packetLength = decToHex(37);
  const eepRom = EEPROM;
  const dataLength = decToHex(34);
  const serverIp = ascii_to_hexa(SERVER_IP.toString());
  const serverPort = decToHex(SERVER_PORT);

  let payload = '';

  const ReqSyncWord = await combineDataWithSize(syncWord, 2, 'pre');
  const DataConstant1 = await combineDataWithSize(DATA_CONSTANT1, 2, 'pre');
  const ReqSessionID = await combineDataWithSize(reqSessionId, 8, 'pre');
  const PacketLength = await combineDataWithSize(packetLength, 4);
  const EepRom = await combineDataWithSize(eepRom, 4, 'pre');
  const DataLength = await combineDataWithSize(dataLength, 2, 'pre');
  const ServerIp = await combineDataWithSize(serverIp, 64, null);
  const ServerPort = await combineDataWithSize(serverPort, 4, 'pre');

  // console.log("reverseData ---- >", reverseData(EepRom))
  let strCombineResult = stringCombine([
    ReqSyncWord,
    DataConstant1,
    ReqSessionID,
    PacketLength,
    reverseData(EepRom),
    DataLength,
    ServerIp,
    reverseData(ServerPort),
  ]);
  console.log('strCombineResult 01', strCombineResult);

  if (strCombineResult) {
    SocketConnection.generateChecksum(strCombineResult, (checksum) => {
      console.log('checksum stg 2', checksum);
      combineDataWithSize(checksum, 4, 'pre', (checksumRes) => {
        let payload = stringCombine([
          strCombineResult,
          reverseData(checksumRes),
        ]);
        console.log('payload ==> Before', payload);
        Alert.alert('Send data', JSON.stringify(payload));
        if (payload) {
          deviceRequest(
            payload,
            DEVICE_IP,
            DEVICE_PORT,
            DEVICE_TIMEOUT,
            '2',
            (resSuccess) => {
              if (callback) callback(resSuccess);
            },
          );
        }
      });
    });
  }
};

export const ConnectDevice_Stage_1 = async (type, callback) => {
  const device = type === 'LV' ? SYNC_WORD_LV : SYNC_WORD_HV;
  const syncWord = device;
  const DATA_CONSTANT1 = CONSTANT1;
  const reqSessionId = BASE_SESSION_ID;
  const DATA_CONSTANT2 = '0000';
  let payload = '';

  let strCombineResult = stringCombine([syncWord, DATA_CONSTANT1]);

  const reqSyncWord = await combineDataWithSize(syncWord, 2, 'pre');
  const dataConstant1 = await combineDataWithSize(DATA_CONSTANT1, 2, 'pre');
  const reqSessionID = await combineDataWithSize(reqSessionId, 8, 'pre');
  const dataConstant2 = await combineDataWithSize('0', 4);

  if (strCombineResult) {
    SocketConnection.generateChecksum(strCombineResult, (checksum) => {
      console.log('checksum stg 1', checksum);
      combineDataWithSize(checksum, 4, 'pre', (checsumRes) => {
        let payload = stringCombine([
          reqSyncWord,
          dataConstant1,
          reqSessionID,
          dataConstant2,
          checsumRes,
        ]);
        console.log('payload ==> Before', payload);

        Alert.alert('SEND', JSON.stringify(payload), [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        let isConnectionSuccess = false;
        if (payload) {
          setTimeout(() => {
            if (!isConnectionSuccess) {
              if (callback) callback(null);
            }
          }, 3000);
          deviceRequest(
            payload,
            DEVICE_IP,
            DEVICE_PORT,
            DEVICE_TIMEOUT,
            '1',
            (resSuccess) => {
              isConnectionSuccess = true;
              Alert.alert('Recieve', JSON.stringify(resSuccess));
              let splitFinalData = splitDataFromResponseAndSessionId(
                resSuccess,
                'deviceType',
              );
              console.log(
                'resSuccess in stage 1',
                resSuccess,
                hexToDec(splitFinalData),
              );
              if (callback)
                callback({
                  dev_stage_1: resSuccess,
                  deviceType: hexToDec(splitFinalData),
                  sessionId: splitDataFromResponseAndSessionId(resSuccess),
                });
            },
          );
        }
      });
    });
  }
};
