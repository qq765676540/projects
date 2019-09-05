package mainapp;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import javax.net.ssl.*;
import java.io.*;
import java.net.InetAddress;
import java.net.URL;
import java.security.*;
import java.security.cert.CertificateException;


public class QlikSenseSSO {


    private static String getTicket(String username) {
        //String xrfkey = "7rBHABt65vFflaZ7";
        String xrfkey = "0123456789abcdef"; //Xrfkey to prevent cross-site issues
        //String host = "jxwlbi.juneyaoair.com";
        String host = "192.168.28.123";
        String vproxy = "juneyaoair";
        try {

            /************** BEGIN Certificate Acquisition **************/
            //String certFolder = "c:\\javaTicket\\";
            InetAddress addr = InetAddress.getLocalHost();
            //String hostName=addr.getHostName().toString();
            String hostName = "192.168.28.123";
            Resource proxyCert = new ClassPathResource("javaTicket/" + hostName + "/client.jks");
            Resource rootCert = new ClassPathResource("javaTicket/" + hostName + "/root.jks");
            String proxyCertPass = "1qaz!QAZ";
            String rootCertPass = "1qaz!QAZ";
            /************** END Certificate Acquisition **************/

            /************** BEGIN Certificate configuration for use in connection **************/
            KeyStore ks = KeyStore.getInstance("JKS");
            ks.load(new FileInputStream(proxyCert.getFile()), proxyCertPass.toCharArray());
            KeyManagerFactory kmf = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm());
            kmf.init(ks, proxyCertPass.toCharArray());
            KeyStore ksTrust = KeyStore.getInstance("JKS");
            ksTrust.load(new FileInputStream(rootCert.getFile()), rootCertPass.toCharArray());
            TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
            tmf.init(ksTrust);
            SSLContext context = SSLContext.getInstance("SSL");
            context.init(kmf.getKeyManagers(), tmf.getTrustManagers(), null);
            SSLSocketFactory sslSocketFactory = context.getSocketFactory();
            /************** END Certificate configuration for use in connection **************/


            /************** BEGIN HTTPS Connection **************/
            System.out.println(("Browsing to: " + "https://" + host + ":4243/qps/" + vproxy + "/ticket?xrfkey=" + xrfkey));
            URL url = new URL("https://" + host + ":4243/qps/" + vproxy + "/ticket?xrfkey=" + xrfkey);
            HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
            connection.setSSLSocketFactory(sslSocketFactory);
            connection.setRequestProperty("x-qlik-xrfkey", xrfkey);
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Accept", "application/json");
            connection.setRequestMethod("POST");
            /************** BEGIN JSON Message to Qlik Sense Proxy API **************/


            //String body = "{ 'UserId':'" + args[0] + "','UserDirectory':'" + args[1] +"',";
            //String body = "{ 'UserId':'" + "testbi" + "','UserDirectory':'" + "T-BI-SRV" +"',";
            String body = "{ 'UserId':'" + username + "','UserDirectory':'" + "JXWL-BI-SERVER0" + "',";
            body += "'Attributes': [],";
            body += "}";
            System.out.println("Payload: " + body);
            /************** END JSON Message to Qlik Sense Proxy API **************/


            OutputStreamWriter wr = new OutputStreamWriter(connection.getOutputStream());
            wr.write(body);
            wr.flush(); //Get the response from the QPS BufferedReader
            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder builder = new StringBuilder();
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                builder.append(inputLine);
            }
            in.close();
            String data = builder.toString();
            System.out.println("The response from the server is: " + data);
            /************** END HTTPS Connection **************/
            return data;
        } catch (KeyStoreException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (CertificateException e) {
            e.printStackTrace();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (UnrecoverableKeyException e) {
            e.printStackTrace();
        } catch (KeyManagementException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static void main(String[] args) {
//		String p = getTicket("administrator");
//        System.out.println(p);

    }

}
