package cas.sso.qs.ebi.com;

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

public class QlikTicketServiceUtil {

    public String getTicket(String username, String userdirectory,
                            String protocol, String host, String vproxy, String xrfkey, String certificatepath,
                            String certpass) {

        /***************参数说明 ******************
         * username 登陆Qliksense的用户ID
         * userdirectory 登陆Qliksense的域名
         * protocol 请求HTTP or HTTPS
         * host QS服务器地址
         * vproxy 代理名称，可空
         * xrfkey
         * certificatepath 证书路径
         * certpass 证书密码
         *
         *
         */

        HttpsURLConnection connection = null;
        OutputStreamWriter wr = null;
        BufferedReader in = null;
        try {
            /************** BEGIN Certificate Acquisition **************/

            // ClassLoader loader =
            // Thread.currentThread().getContextClassLoader();
            // String path2 =
            // Thread.currentThread().getContextClassLoader().getResource("/").getPath();
            File certificatepath_client = new File(certificatepath + "client.jks");
            File certificatepath_root = new File(certificatepath + "root.jks");
            String proxyCertPass = certpass;
            String rootCertPass = certpass;
            /************** END Certificate Acquisition **************/

            /**************
             * BEGIN Certificate configuration for use in connection
             **************/
            KeyStore ks = KeyStore.getInstance("JKS");
            ks.load(new FileInputStream(certificatepath_client), proxyCertPass.toCharArray());
            KeyManagerFactory kmf = KeyManagerFactory
                    .getInstance(KeyManagerFactory.getDefaultAlgorithm());
            kmf.init(ks, proxyCertPass.toCharArray());
            KeyStore ksTrust = KeyStore.getInstance("JKS");
            ksTrust.load(new FileInputStream(certificatepath_root),
                    rootCertPass.toCharArray());
            TrustManagerFactory tmf = TrustManagerFactory
                    .getInstance(TrustManagerFactory.getDefaultAlgorithm());
            tmf.init(ksTrust);
            SSLContext context = SSLContext.getInstance("SSL");
            context.init(kmf.getKeyManagers(),
                    new TrustManager[]{new TrustAnyTrustManager()}, null);
            SSLSocketFactory sslSocketFactory = context.getSocketFactory();
            /**************
             * END Certificate configuration for use in connection
             **************/

            /************** BEGIN HTTPS Connection **************/
            URL url = new URL(protocol + "://" + host + ":4243/qps" + vproxy
                    + "/ticket?xrfkey=" + xrfkey);
            connection = (HttpsURLConnection) url.openConnection();
            connection.setSSLSocketFactory(sslSocketFactory);
            connection.setRequestProperty("x-qlik-xrfkey", xrfkey);
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Accept", "application/json");

            connection
                    .setHostnameVerifier(new QlikTicketServiceUtil().new TrustAyHostnameVerifier());
            connection.setRequestMethod("POST");
            /************** BEGIN JSON Message to Qlik Sense Proxy API **************/

            String body = "{ 'UserId':'" + username
                    + "','UserDirectory':'" + userdirectory + "',";
            body += "'Attributes': [],";
            body += "}";
            /************** END JSON Message to Qlik Sense Proxy API **************/

            wr = new OutputStreamWriter(connection.getOutputStream());
            wr.write(body);
            wr.flush();
            in = new BufferedReader(new InputStreamReader(
                    connection.getInputStream()));
            StringBuilder builder = new StringBuilder();
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                builder.append(inputLine);
            }
            in.close();
            String data = builder.toString();
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
        QlikTicketServiceUtil qs = new QlikTicketServiceUtil();
        String qlikticket = qs.getTicket("administrator", "ycq", "https", "192.168.28.137", "", "0123456789abcdef", "D:\\key\\", "123456");
        System.out.println(qlikticket);

    }

}
