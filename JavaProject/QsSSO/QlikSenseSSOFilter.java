package cas.sso.qs.ebi.com;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * Servlet Filter implementation class QlikSenseSSOFilter
 */
//@WebFilter("/QlikSenseSSOFilter")
public class QlikSenseSSOFilter implements Filter {

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		// TODO Auto-generated method stub
		System.out.println("我的过滤器被执行了");
		String username = ((HttpServletRequest)request).getRemoteUser();
		QlikTicketServiceUtil qsutil = new QlikTicketServiceUtil();
		String qlikTicket = qsutil.getTicket(username, "ycq", "https", "192.168.28.137", "", "0123456789abcdef", "D:\\key\\", "123456");
		((HttpServletResponse)response).sendRedirect("http://192.168.28.137/single/?appid=c4d86565-cbef-478e-b46e-a81b29321226&obj=jwELPL&opt=nointeraction&select=clearall&qlikTicket="+qlikTicket);
		chain.doFilter(request, response);
	}

	
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}
	
	public void destroy() {
		// TODO Auto-generated method stub
	}

}
