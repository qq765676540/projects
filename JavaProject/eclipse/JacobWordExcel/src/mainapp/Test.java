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
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;
import java.util.Timer;
import java.util.TimerTask;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

import org.apache.pdfbox.PDFToImage;
import org.apache.pdfbox.exceptions.COSVisitorException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.util.ImageIOUtil;

import com.alibaba.fastjson.JSONObject;
import com.jacob.com.Dispatch;
import com.jacob.com.Variant;

public class Test {

    public static void main(String[] args) throws COSVisitorException, IOException, MessagingException {
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


//        ExcelHandle eh = new ExcelHandle();
//        String filepath = "D:/test.xlsx";
//        eh.OpenExcel(filepath, false, false);
//        Dispatch dp = eh.getSheetByIndex(1);
//        Dispatch cell = Dispatch.invoke(dp, "Range", Dispatch.Get,
//
//                new Object[]{"A3:B3"}, new int[1]).toDispatch();
//        System.out.println(Dispatch.get(cell, "Value").toString());
//        Dispatch.call(cell, "Copy");
//        eh.CloseExcel(false, false);
//        System.out.println(123);
    	
    	
    	Date dNow = new Date();
        SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd hh:mm:ss");
   
        System.out.println("当前时间为: " + ft.format(dNow));
           	

    }
    
}
