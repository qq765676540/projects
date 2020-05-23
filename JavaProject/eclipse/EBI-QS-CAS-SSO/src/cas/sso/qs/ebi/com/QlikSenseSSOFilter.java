package cas.sso.qs.ebi.com;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.Properties;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class QlikSenseSSOFilter implements Filter {

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        HttpSession ss = req.getSession();
        //获取配置文件
        String propertiesPath = URLDecoder.decode(Thread.currentThread().getContextClassLoader().getResource("/").getPath(), "UTF-8");
        Properties properties = new Properties();
        BufferedReader bufferedReader = new BufferedReader(new FileReader(propertiesPath + "qs-cas-sso.properties"));
        properties.load(bufferedReader);
        //读取配置信息
        String isOnlyOneDirectory = properties.getProperty("isOnlyOneDirectory");
        String onlyDirectoryName = properties.getProperty("onlyDirectoryName");
        String protocol = properties.getProperty("protocol");
        String qshost = properties.getProperty("qshost");
        String vproxy = properties.getProperty("vproxy");
        vproxy = vproxy.isEmpty() ? "" : vproxy;
        String xrfkey = properties.getProperty("xrfkey");
        String certificatepath = properties.getProperty("certificatepath");
        certificatepath = certificatepath.isEmpty() ? (propertiesPath) : certificatepath;
        String certpass = properties.getProperty("certpass");
        String parametername = properties.getProperty("parametername");

        //从CAS获取用户登陆ID
        String username = req.getRemoteUser();
        String reporturl = req.getParameter(parametername);
        String baseurl = req.getParameter(parametername);
        
        if (username != null && reporturl != null && isOnlyOneDirectory.equals("yes")) {
            QlikTicketServiceUtil qsutil = new QlikTicketServiceUtil();
            String qlikTicket = qsutil.getTicket(username, onlyDirectoryName, protocol, qshost, vproxy, xrfkey, certificatepath, certpass);
            String url = baseurl + "?qlikTicket=" + qlikTicket;
            ss.setAttribute("qsreport", url);
            
        } else {

        	
        }
        
        chain.doFilter(request, response);
        
        
    }


    public void init(FilterConfig fConfig) throws ServletException {
        // TODO Auto-generated method stub
    }

    public void destroy() {
        // TODO Auto-generated method stub
    }

}
