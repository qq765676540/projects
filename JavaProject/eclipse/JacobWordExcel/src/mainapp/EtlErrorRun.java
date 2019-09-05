package mainapp;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.Properties;

import tools.*;

public class EtlErrorRun {

    public static void main(String[] args) throws Exception {

        Properties properties = new Properties();
        BufferedReader bufferedReader = new BufferedReader(new FileReader(
                "C:/qlik/ETL_MAP/Email.properties"));
        properties.load(bufferedReader);
        File file = new File("C:/qlik/ETL_MAP/ETL_SA_ERRORLOG.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
        String str_Txt = null;

        while ((str_Txt = br.readLine()) != null) {
            String[] strTxtArr = str_Txt.split(",");
            String str_DBType = strTxtArr[0];
            String str_LogFlag = strTxtArr[1];


            if (str_LogFlag.equals("ERROR")) {
//				SendQQMailUtil sendqqemail = new SendQQMailUtil();
                ExchangeMailUtil sendqqemail = new ExchangeMailUtil();
                String TO = properties.getProperty("ETL");
                String[] TOS = TO.split(";");
//				InternetAddress[] sendTo = new InternetAddress[TOS.length]; // 加载收件人地址
//				for (int j = 0; j < TOS.length; j++) {
//					sendTo[j] = new InternetAddress(TOS[j]);
//				}
                sendqqemail.sendExchangeMail(TOS, null, str_DBType + "_ETL执行失败",
                        str_DBType + "_ETL执行失败，详细信息请到QMC查看！",
                        properties.getProperty("StmpUser"),
                        properties.getProperty("StmpPassword"));
            }
            continue;
        }

        br.close();

    }

}
