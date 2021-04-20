package com.nyquestall;

import java.math.BigInteger;
// bridging headers
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.concurrent.Callable;
import javax.security.auth.callback.CallbackHandler;
import java.util.HashMap;
import android.widget.Toast;
import com.facebook.react.bridge.Callback;
// ------ END -------

import android.util.Log;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;
import java.nio.charset.StandardCharsets;

public class SocketConnection extends ReactContextBaseJavaModule {
        SocketConnection(ReactApplicationContext context) {
            super(context);
        }

    private boolean DEBUG = false;
    static Socket socket = null;
    static DataOutputStream os = null;
    static DataInputStream is = null;

    private final String TAG = SocketConnection.this.getClass().getSimpleName();
    
    @Override
    public String getName() {
        return "SocketConnection";
    }

    @ReactMethod
    public void onTest(String name, Callback cb) {
        cb.invoke(name);
    }

    @ReactMethod
    public void setDebug(boolean enable, Callback callback) {
        DEBUG = enable;
        callback.invoke(DEBUG); 
    }

    public boolean getDebug() {
        return DEBUG;
    }

    @ReactMethod
    public void connect(String tcpIp, int port, int timeout, Callback callback) throws IOException {
        if (DEBUG)
            Log.d(TAG, "Connect to " + tcpIp + ":" + port + " with timeout " + timeout);
        InetAddress host = InetAddress.getByName(tcpIp);
        
        socket = new Socket(host.getHostName(), port);
        socket.setSoTimeout(timeout);

        os = new DataOutputStream(socket.getOutputStream());
        is = new DataInputStream(socket.getInputStream());
        // return 1;
        callback.invoke(1); 
    }

    @ReactMethod
    public void readWrite(String request, Callback callback) throws IOException {
        
        if (DEBUG)
            Log.d(TAG, "Write : hexStringToByteArray " + Utils.bytesToHex(Utils.hexStringToByteArray(request) ));
            
        String dataRead = null;
        byte[] request_bytes = Utils.hexStringToByteArray(request);            
        try{            
            if (socket != null && os != null && is != null) {
                os.write(request_bytes);
                byte[] data = new byte[128];
                int count = is.read(data);
                dataRead = Utils.bytesToHex(data, count);
                if (DEBUG)
                    Log.d(TAG, "Read : " + dataRead);
                // os.close();
                // is.close();
            }
            callback.invoke(dataRead); 
            
        }catch(Exception e) {
            e.printStackTrace();
                Log.d(TAG, e.getMessage());
   

                StringWriter sw = new StringWriter();
                PrintWriter pw = new PrintWriter(sw);
                e.printStackTrace(pw);
        }
        return;
    }

    @ReactMethod
    public int close() throws IOException {

        if (DEBUG)
            Log.d(TAG, "Close socket " + socket.toString());
        os.close();
        is.close();
        socket.close();
        return 1;
    }


    @ReactMethod
    public String generateChecksum(String request, Callback callback) {
        byte[] requestBytes = Utils.hexStringToByteArray(request);

        if (DEBUG)
            Log.d(TAG, "In : " + Utils.bytesToHex(requestBytes));

        BigInteger a = new BigInteger(new byte[]{(byte) 0x00, (byte) 0x00});
        for (int i = 0; i < requestBytes.length; i++) {
            BigInteger b = new BigInteger(new byte[]{(byte) 0x00, requestBytes[i]});
            a = a.add(b);
        }
        if (DEBUG)
            Log.d(TAG, "CheckSum : " + Utils.bytesToHex(a.toByteArray()));

            callback.invoke(Utils.bytesToHex(a.toByteArray()) );
        return "";
    }

    public static class Utils {
        private static final byte[] HEX_ARRAY = "0123456789ABCDEF".getBytes(StandardCharsets.US_ASCII);

        /* s must be an even-length string. */
        public static byte[] hexStringToByteArray(String s) {
            int len = s.length();
            byte[] data = new byte[len / 2];
            for (int i = 0; i < len; i += 2) {
                data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4)
                                    + Character.digit(s.charAt(i+1), 16));
            }
            return data;
        }

        public static String bytesToHex(byte[] bytes) {
            byte[] hexChars = new byte[bytes.length * 2];
            for (int j = 0; j < bytes.length; j++) {
                int v = bytes[j] & 0xFF;
                hexChars[j * 2] = HEX_ARRAY[v >>> 4];
                hexChars[j * 2 + 1] = HEX_ARRAY[v & 0x0F];
            }
            return new String(hexChars, StandardCharsets.UTF_8);
        }

        public static String bytesToHex(byte[] bytes, int length) {
            byte[] hexChars = new byte[length * 2];
            for (int j = 0; j < length; j++) {
                int v = bytes[j] & 0xFF;
                hexChars[j * 2] = HEX_ARRAY[v >>> 4];
                hexChars[j * 2 + 1] = HEX_ARRAY[v & 0x0F];
            }
            return new String(hexChars, StandardCharsets.UTF_8);
        }
    }
}