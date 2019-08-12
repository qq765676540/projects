using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace EmailSend
{
    class Program
    {
        static void Main(string[] args)
        {
            EmailDBDataContext emdc = new EmailDBDataContext();
            //邮箱服务器信息
            var emdata = emdc.EmailServer.First();
            string SMTPServer = emdata.EmailServer1;
            string EmailUser = emdata.AdminEmail;
            string EmailPwd = emdata.PassWord;
            string FromUser = emdata.FromUser;
            string DisplayName = emdata.DisplayName;
            Console.WriteLine(SMTPServer + "--" + EmailUser + "--" + EmailPwd + "--" + FromUser + "--" + DisplayName);
            //接收人
            var sendto = emdc.SendDetail.First();
            string EmailTo = sendto.UserName;
            Console.WriteLine(EmailTo);

            SmtpClient sc = new SmtpClient(SMTPServer);
            sc.Credentials = new NetworkCredential(EmailUser,EmailPwd);

            MailAddress from = new MailAddress(FromUser,DisplayName,System.Text.Encoding.UTF8);
            MailAddress to = new MailAddress(EmailTo);
            MailMessage message = new MailMessage(from,to);

            //邮件标题
            message.Subject = "My C# Email Test";
            //邮件附件
            message.Attachments.Add(new Attachment("d:\\ReportName1.pdf"));
            //邮件正文
            message.IsBodyHtml = true;
            string htmlBodyContent = "<img src=\"cid:imgurl\">";
            AlternateView htmlBody = AlternateView.CreateAlternateViewFromString(htmlBodyContent, null, "text/html");
            LinkedResource lrImage = new LinkedResource("d:\\云顶合成.jpg", "image/gif");
            lrImage.ContentId = "imgurl";
            htmlBody.LinkedResources.Add(lrImage);
            message.AlternateViews.Add(htmlBody);  

            sc.Send(message);
            //Console.ReadLine();
        }
    }
}
