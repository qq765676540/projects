package mainapp;

import tools.*;

import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.Properties;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

import org.apache.pdfbox.PDFToImage;
import org.apache.pdfbox.exceptions.COSVisitorException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.util.ImageIOUtil;

public class Test {

	public static void main(String[] args) throws COSVisitorException, IOException, MessagingException{
		//多个PDF合并成一个
		/*String path = System.getProperty("user.dir")+"\\MergePdf.properties";
		
		Properties properties = new Properties();
		BufferedReader bufferedReader = new BufferedReader(new FileReader(path));
		properties.load(bufferedReader);
		MergePDF mergepdf = new MergePDF();
		String inFilePath = properties.getProperty("inFilePath");
		String outFile = properties.getProperty("outFile");
		mergepdf.mergePdf(inFilePath, outFile);*/
		
		
		//发送QQ邮件
		/*SendQQMailUtil sendqqemail = new SendQQMailUtil();
		String TO="765676540@qq.com";
        String[] TOS=TO.split(";");
        InternetAddress[] sendTo = new InternetAddress[TOS.length]; // 加载收件人地址
        for (int j = 0; j < TOS.length; j++) {  
            sendTo[j] = new InternetAddress(TOS[j]);  
        }
        sendqqemail.sendQQemail(sendTo, "邮件标题", "正文内容","765676540@qq.com","jafyfkvetrjebecd");*/
		
		// PDF转图片
		
		
		String a = new String("123");
		a = "123";
		String b = "123";
		System.out.println(a == b);
		
	}
}
