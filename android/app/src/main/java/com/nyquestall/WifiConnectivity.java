package com.nyquestall;

import android.annotation.SuppressLint;
import android.app.Dialog;
import android.app.ListActivity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.net.NetworkRequest;
import android.net.NetworkSpecifier;
import android.net.Uri;
import android.net.wifi.ScanResult;
import android.net.wifi.WifiConfiguration;
import android.net.wifi.WifiManager;
import android.net.wifi.WifiNetworkSpecifier;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;
import com.facebook.react.bridge.Callback;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.os.CountDownTimer;
import java.util.Arrays;
import org.json.JSONArray;


// ReactApplicationContext context = getRNContext()

// import com.thanosfisherman.wifiutils.WifiUtils;
// import com.thanosfisherman.wifiutils.wifiConnect.ConnectionErrorCode;
// import com.thanosfisherman.wifiutils.wifiConnect.ConnectionSuccessListener;

import java.util.List;
// End WIFI

public class WifiConnectivity extends ReactContextBaseJavaModule {
    ReactApplicationContext contextGlobal;
    List<ScanResult> wifiScanLists;
    WifiManager wifiManager;
    
    WifiConnectivity(ReactApplicationContext context) {
        super(context);
        this.contextGlobal = context;
    }

    WifiManager mainWifiObj;
    // WifiScanReceiver wifiReciever;
    ListView list;
    String wifis[];
    private ConnectivityManager mConnectivityManager;
    EditText pass;
    BroadcastReceiver wifiScanReceiver;
    @Override
    public String getName() {
        return "WifiConnectivity";
    }

    @ReactMethod
    public void onCreate(Callback callback) {
        wifiManager = (WifiManager)
        contextGlobal.getSystemService(Context.WIFI_SERVICE);
         wifiScanReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context c, Intent intent) {
                boolean success = intent.getBooleanExtra(
                        WifiManager.EXTRA_RESULTS_UPDATED, false);
                        Log.e("01----", String.valueOf(success));
                if (success) {
                    scanSuccess(callback);
                } else {
                    // scan failure handling
                    scanFailure();
                    callback.invoke(String.valueOf(success));
                }

            }
        };
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(WifiManager.SCAN_RESULTS_AVAILABLE_ACTION);
        contextGlobal.registerReceiver(wifiScanReceiver, intentFilter);

        boolean success = wifiManager.startScan();
        if (!success) {
            // scan failure handling
            scanFailure();
        }


        // new CountDownTimer(10000, 1000) {

        //     public void onTick(long millisUntilFinished) {
        //     }
        //     public void onFinish() {
        //     if(wifiScanLists!=null){
        //         Log.e("Size results 03----", String.valueOf(wifiScanLists.size()));

        //     }else{
        //         Log.e("Size results 04----", "null");
        //     }
        //     // for (int i=0; i<wifiScanLists.size();i++){
        //     //     Log.e("VALUE_WIFI",wifiScanLists.get(i).SSID);
        //     //         }

        //             wifis = new String[wifiScanLists.size()];
        //     for(int i = 0; i < wifiScanLists.size(); i++){
        //         wifis[i] = ((wifiScanLists.get(i)).toString());
        //     }
        //     String filtered[] = new String[wifiScanLists.size()];
        //     int counter = 0;
        //     for (String eachWifi : wifis) {
        //         String[] temp = eachWifi.split(",");
        //         filtered[counter] = temp[0].substring(5).trim();
        //         //+"\n" + temp[2].substring(12).trim()+"\n" +temp[3].substring(6).trim();
        //         //0->SSID, 2->Key Management 3-> Strength
        //         counter++;
        //     }
        //     Log.e("Array_value", Arrays.toString(filtered));
        //         // Log.e("Size results 03----", wifiScanLists);
        //         callback.invoke(filtered);
        //     }
        // }.start();

    }

    public List<ScanResult> Wifiresult(){
        
        Log.e("Size results 02----", String.valueOf(wifiScanLists.size()));
        return wifiScanLists;
    }

    private void scanSuccess(Callback callback) {
        Log.e("01----", "Success");

        List<ScanResult> results = wifiManager.getScanResults();
        Log.e("Size results 01----", String.valueOf(results.size()));
        wifiScanLists = results;
        
        // for(int i = 0; i < wifiScanLists.size(); i++){
        //     Log.e("Size results 01----",String.valueOf(i)+" ::::: "+ wifiScanLists.get(i).SSID);
        //     callback.invoke(wifiScanLists.get(i).SSID);            
        // }

        
            JSONArray jsonArray = new JSONArray();
            for (int i = 0; i < wifiScanLists.size(); i++) {
                Log.e("Size results 01----", String.valueOf(i) + " ::::: " + wifiScanLists.get(i).SSID);
                jsonArray.put(wifiScanLists.get(i).SSID);
            }
            callback.invoke(jsonArray.toString());
        
    

        // wifis = new String[wifiScanLists.size()];
        // for(int i = 0; i < wifiScanLists.size(); i++){
        //     wifis[i] = ((wifiScanLists.get(i)).toString());
        // }
        // String filtered[] = new String[wifiScanLists.size()];
        // int counter = 0;
        // for (String eachWifi : wifis) {
        //     String[] temp = eachWifi.split(",");
        //     filtered[counter] = temp[0].substring(5).trim();
        //     callback.invoke(temp[0].substring(5).trim());

        //     //+"\n" + temp[2].substring(12).trim()+"\n" +temp[3].substring(6).trim();
        //     //0->SSID, 2->Key Management 3-> Strength
        //     counter++;
        // }
        // Log.e("Array_value", Arrays.toString(filtered));
            // Log.e("Size results 03----", wifiScanLists);
            // callback.invoke(filtered);

    }

    private void scanFailure() {
        Log.e("01----", "failed");

        // handle failure: new scan did NOT succeed
        // consider using old scan results: these are the OLD results!
        List<ScanResult> results = wifiManager.getScanResults();
    }
    @ReactMethod
    protected void onPause() {
        contextGlobal.unregisterReceiver(wifiScanReceiver);
    }

    @ReactMethod
    protected void onResume() {
        // contextGlobal.registerReceiver(wifiReciever, new IntentFilter(WifiManager.SCAN_RESULTS_AVAILABLE_ACTION));
    }

    @ReactMethod
    public void onTest(String name, Callback cb) {
        cb.invoke(name);
    }

}
