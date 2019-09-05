package mainapp;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.Properties;

import javax.mail.internet.InternetAddress;

import com.jacob.com.Dispatch;

import tools.*;

public class MainApp {

    public static void main(String[] args) throws Exception {

        Properties properties = new Properties();
        BufferedReader bufferedReader = new BufferedReader(new FileReader("C:/qlik/ETL_MAP/Email.properties"));
        properties.load(bufferedReader);
        System.out.println("Success");
        ExcelHandle eh = new ExcelHandle();
        String filepath = "C:/qlik/ETL_MAP/SFTP_Upload_Log.csv";
        eh.OpenExcel(filepath, false, false);
        eh.SaveAs("C:/qlik/ETL_MAP/SFTP_Upload_Log.xlsx");
        Dispatch dp = eh.getSheetByIndex(1);

        int i = 2;
        while (true) {

            String str_RawDataType = eh.getValue("A" + i, dp);
            String str_FileName = eh.getValue("B" + i, dp);
            String str_Version = eh.getValue("C" + i, dp);
            String str_UpLoadDate = eh.getValue("D" + i, dp);
            String str_FileUpdate = eh.getValue("E" + i, dp);
            String str_UpLoadFlag = eh.getValue("F" + i, dp);
            if (str_RawDataType == "null") {
                break;
            } else {
                i++;

                if (str_UpLoadFlag.equals("NEW")) {
                    SendQQMailUtil sendqqemail = new SendQQMailUtil();
                    String TO = properties.getProperty(str_RawDataType);
                    String[] TOS = TO.split(";");
                    InternetAddress[] sendTo = new InternetAddress[TOS.length]; // 加载收件人地址
                    for (int j = 0; j < TOS.length; j++) {
                        sendTo[j] = new InternetAddress(TOS[j]);
                    }
                    sendqqemail.sendQQemail(sendTo,
                            str_RawDataType + "上传成功",
                            "FileName：" + str_FileName
                                    + ",    Version:" + str_Version
                                    + ",    UpLoadDate:" + str_UpLoadDate
                                    + ",    FileUpdate:" + str_FileUpdate,
                            properties.getProperty("StmpUser"),
                            properties.getProperty("StmpPassword")
                    );
                }
                continue;
            }
        }

        eh.CloseExcel(false, false);

    }

}
