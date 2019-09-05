package tools;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.UnknownHostException;
import java.security.KeyStore;
import java.security.NoSuchAlgorithmException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.TrustManagerFactory;
import javax.net.ssl.X509TrustManager;

import com.alibaba.fastjson.JSONObject;

public class TokenServiceUtil {


    private static String xrfkey = "0123456789abcdef";

    private static String protocol = "https";

    private static String host = "192.168.28.137";
    private static String vproxy = "";

    public static String getTicket(String username) {
        System.out.println("protocol------------" + protocol);
        HttpsURLConnection connection = null;
        OutputStreamWriter wr = null;
        BufferedReader in = null;
        try {
            /************** BEGIN Certificate Acquisition **************/
            // String certFolder = "c:\\javaTicket\\";
//			ClassLoader loader = Thread.currentThread().getContextClassLoader();
//			String path2 = Thread.currentThread().getContextClassLoader().getResource("/").getPath();
            String path2 = "D:\\key\\";
            System.out.println("path2:" + path2);
            File newFile = new File(path2 + "client.jks");
            File newFile1 = new File(path2 + "root.jks");
            String proxyCertPass = "123456";
            String rootCertPass = "123456";
            /************** END Certificate Acquisition **************/

            /**************
             * BEGIN Certificate configuration for use in connection
             **************/
            KeyStore ks = KeyStore.getInstance("JKS");
            ks.load(new FileInputStream(newFile), proxyCertPass.toCharArray());
            KeyManagerFactory kmf = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm());
            kmf.init(ks, proxyCertPass.toCharArray());
            KeyStore ksTrust = KeyStore.getInstance("JKS");
            ksTrust.load(new FileInputStream(newFile1), rootCertPass.toCharArray());
            TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
            tmf.init(ksTrust);
            SSLContext context = SSLContext.getInstance("SSL");
//			context.init(kmf.getKeyManagers(), tmf.getTrustManagers(), null);
            context.init(kmf.getKeyManagers(), new TrustManager[]{new TrustAnyTrustManager()}, null);
            SSLSocketFactory sslSocketFactory = context.getSocketFactory();
            /**************
             * END Certificate configuration for use in connection
             **************/

            /************** BEGIN HTTPS Connection **************/
            System.out.println("Browsing to: " + "http://" + host + ":4243/qps" + vproxy + "/ticket?xrfkey=" + xrfkey);
            URL url = new URL(protocol + "://" + host + ":4243/qps" + vproxy + "/ticket?xrfkey=" + xrfkey);
            connection = (HttpsURLConnection) url.openConnection();
            connection.setSSLSocketFactory(sslSocketFactory);
            connection.setRequestProperty("x-qlik-xrfkey", xrfkey);
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Accept", "application/json");

            connection.setHostnameVerifier(new TokenServiceUtil().new TrustAyHostnameVerifier());
            connection.setRequestMethod("POST");
            /************** BEGIN JSON Message to Qlik Sense Proxy API **************/

            String body = "{ 'UserId':'" + username + "','UserDirectory':'ycq',";
            body += "'Attributes': [],";
            body += "}";
            System.out.println("Payload: " + body);
            /************** END JSON Message to Qlik Sense Proxy API **************/

            wr = new OutputStreamWriter(connection.getOutputStream());
            wr.write(body);
            wr.flush(); // Get the response from the QPS BufferedReader
            in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder builder = new StringBuilder();
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                builder.append(inputLine);
            }
            in.close();
            String data = builder.toString();
            System.out.println("The response from the server is: " + data);
            JSONObject json = JSONObject.parseObject(data);
            String ticket = json.getString("Ticket");

            /************** END HTTPS Connection **************/
            return ticket;
        } catch (UnknownHostException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (CertificateException e) {
            e.printStackTrace();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (UnrecoverableKeyException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (Exception e2) {
                    e2.printStackTrace();
                }
            }
            if (wr != null) {
                try {
                    wr.close();
                } catch (Exception e2) {
                    e2.printStackTrace();
                }
            }
        }
        return "";
    }

    public class TrustAyHostnameVerifier implements HostnameVerifier {
        public boolean verify(String hostname, SSLSession session) {
            return true;
        }
    }

    private static class TrustAnyTrustManager implements X509TrustManager {
        public void checkClientTrusted(X509Certificate[] chain, String authType)
                throws CertificateException {
        }

        public void checkServerTrusted(X509Certificate[] chain, String authType)
                throws CertificateException {
        }

        public X509Certificate[] getAcceptedIssuers() {
            return new X509Certificate[]{};
        }
    }

    public static void main(String[] args) {
        String p = getTicket("administrator");
        System.out.println(p);
    }

}
