package tools;

import java.io.UnsupportedEncodingException;
import java.util.Date;  
import java.util.Properties;  
  






import javax.mail.BodyPart;  
import javax.mail.Message;  
import javax.mail.MessagingException;  
import javax.mail.Multipart;  
import javax.mail.Session;  
import javax.mail.Transport;  
import javax.mail.internet.InternetAddress;  
import javax.mail.internet.MimeBodyPart;  
import javax.mail.internet.MimeMessage;  
import javax.mail.internet.MimeMultipart;


  
public class ExchangeMailUtil {  
     
  
    public void sendExchangeMail(String[] to,String[] cc, String subject, String content,String username,String password) throws MessagingException, UnsupportedEncodingException {  
        Properties props = new Properties();  
        props.put("mail.smtp.host", "192.168.248.18");  
        props.put("mail.smtp.auth", "true");
        Session s = Session.getInstance(props);  
        s.setDebug(true);  
  
        MimeMessage message = new MimeMessage(s);  
  
        InternetAddress from = new InternetAddress(username+"@vitasoy-chn.com");  
        message.setFrom(from);  
        InternetAddress[] Toaddress = new InternetAddress[to.length];  
        for (int i = 0; i < to.length; i++)  
            Toaddress[i] = new InternetAddress(to[i]);  
        message.setRecipients(Message.RecipientType.TO, Toaddress);  
  
        if (cc != null) {  
            InternetAddress[] Ccaddress = new InternetAddress[cc.length];  
            for (int i = 0; i < cc.length; i++)  
                Ccaddress[i] = new InternetAddress(cc[i]);  
            message.setRecipients(Message.RecipientType.CC, Ccaddress);  
        }  
        

//        sun.misc.BASE64Encoder enc = new sun.misc.BASE64Encoder();  
//        message.setSubject("=?UTF-8?B?"+enc.encode(subject.getBytes())+"?=");

        message.setSubject(subject,"UTF-8");  
        message.setSentDate(new Date());  
  
        BodyPart mdp = new MimeBodyPart();  
        mdp.setContent(content, "text/html;charset=utf-8");  
        Multipart mm = new MimeMultipart();  
        mm.addBodyPart(mdp);  
        message.setContent(mm);  
  
        message.saveChanges();  
        Transport transport = s.getTransport("smtp");  
        transport.connect("192.168.248.18", username, password); 
        transport.sendMessage(message, message.getAllRecipients());  
        transport.close();  
          
    }  
  
}  