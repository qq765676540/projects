package mainapp;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.Properties;
import tools.*;

public class SFTPRun {

	public static void main(String[] args) throws Exception {
		

		Properties properties = new Properties();
		BufferedReader bufferedReader = new BufferedReader(new FileReader(
				"C:/qlik/ETL_MAP/Email.properties"));
		properties.load(bufferedReader);
		File file = new File("C:/qlik/ETL_MAP/SFTP_Upload_Log.txt");
		BufferedReader br = new BufferedReader(new FileReader(file));
		String str_Txt = null;

		while ((str_Txt = br.readLine()) != null) {
			String[] strTxtArr = str_Txt.split(",");
			String str_RawDataType = strTxtArr[0];
			String str_FileName = strTxtArr[1];
			String str_Version = strTxtArr[2];
			String str_UpLoadDate = strTxtArr[3];
			String str_FileUpdate = strTxtArr[4];
			String str_UpLoadFlag = strTxtArr[5];

			if (str_UpLoadFlag.equals("NEW")) {
//				SendQQMailUtil sendqqemail = new SendQQMailUtil();
				ExchangeMailUtil sendqqemail = new ExchangeMailUtil();
				String TO = properties.getProperty(str_RawDataType);
				String[] TOS = TO.split(";");
//				InternetAddress[] sendTo = new InternetAddress[TOS.length]; // 加载收件人地址
//				for (int j = 0; j < TOS.length; j++) {
//					sendTo[j] = new InternetAddress(TOS[j]);
//				}
				sendqqemail.sendExchangeMail(TOS,null, str_FileName + "上传成功",
//					 "FileName:"+ str_FileName + ",    Version:"
				      "Version:"+ str_Version + ",    UpLoadDate:"
								+ str_UpLoadDate + ",    FileUpdate:"
								+ str_FileUpdate,
						properties.getProperty("StmpUser"),
						properties.getProperty("StmpPassword"));
			}
			continue;
		}

		br.close();

	}

}
