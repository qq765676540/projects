<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta http-equiv="refresh" content="65">
<title>qsreport</title>
<style type="text/css">
body {
	margin: 0; /* Reset default margin */
}

iframe {
	display: block; /* iframes are inline by default */
	background: #000;
	border: none; /* Reset default border */
	height: 100vh; /* Viewport-relative units */
	width: 100vw;
}
</style>
</head>

<body>
	<iframe src="<%= session.getAttribute("qsreport") %>"></iframe>
</body>
</html>