package tools;

import java.io.UnsupportedEncodingException;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeUtility;

public class SendQQMailUtil {
    
    public void sendQQemail(InternetAddress[] sendTo,String subject,String bodytxt,String StmpUser,String StmpPassword) throws AddressException,MessagingException, UnsupportedEncodingException {
        Properties properties = new Properties();
        properties.put("mail.transport.protocol", "smtp");// 连接协议
        properties.put("mail.smtp.host", "smtp.qq.com");// 主机名
        properties.put("mail.smtp.port", 465);// 端口号
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.ssl.enable", "true");// 设置是否使用ssl安全连接 ---一般都使用
        properties.put("mail.debug", "true");// 设置是否显示debug信息 true 会在控制台显示相关信息
        // 得到回话对象
        Session session = Session.getInstance(properties);
        // 获取邮件对象
        MimeMessage message = new MimeMessage(session);
        // 设置发件人邮箱地址
        message.setFrom(new InternetAddress(StmpUser));
        // 设置收件人邮箱地址 
        message.setRecipients(Message.RecipientType.TO, sendTo);
        //message.setRecipient(Message.RecipientType.TO, new InternetAddress("765676540@qq.com"));//一个收件人
        // 设置邮件标题
        message.setSubject(subject,"GB2312");
        // 设置邮件内容
//        message.setText(bodytxt,"GB2312");
        
        // 创建消息部分
        BodyPart messageBodyPart = new MimeBodyPart();

        // 消息
        messageBodyPart.setText("正文12345678");
        
        // 创建多重消息
        Multipart multipart = new MimeMultipart();

        // 设置文本消息部分
        multipart.addBodyPart(messageBodyPart);

        
        // 得到邮差对象
        
        // 附件部分
        messageBodyPart = new MimeBodyPart();
        // 设置要发送附件的文件路径
        DataSource source = new FileDataSource("d:\\mm.pdf");
        messageBodyPart.setDataHandler(new DataHandler(source));

        
        // 处理附件名称中文（附带文件路径）乱码问题
        messageBodyPart.setFileName(MimeUtility.encodeText("d:\\mm.pdf"));
        multipart.addBodyPart(messageBodyPart);
        
        // 发送完整消息
        message.setContent(multipart);
        
        Transport transport = session.getTransport();
        // 连接自己的邮箱账户
        transport.connect(StmpUser, StmpPassword);// 密码为QQ邮箱开通的stmp服务后得到的客户端授权码
        // 发送邮件
        transport.sendMessage(message, message.getAllRecipients());
        transport.close();
    }
}
