package com.ycq.springboot.controller;

import com.jcraft.jsch.SftpException;
import com.ycq.springboot.utils.SFTPUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.*;

@Controller
public class HelloController {

    @Value("${sftp.user}")
    private String sftpUser;

    @Value("${sftp.pass}")
    private String sftpPass;

    @Value("${sftp.ip}")
    private String sftpIp;

    @Value("${sftp.port}")
    private int sftpPort;

    @RequestMapping(value = "/hello")
    public @ResponseBody String hello(){
        return "hello springboot";
    }

    @GetMapping(value = "/sftp/upload")
    public @ResponseBody String sftp_upload(String pathname, String savedir, String savename){
        SFTPUtil sftp = new SFTPUtil(sftpUser, sftpPass, sftpIp, sftpPort);
        sftp.login();
        File file = new File(pathname);
        InputStream is = null;
        try {
            is = new FileInputStream(file);
            sftp.upload(savedir, savename, is);
            is.close();
            sftp.logout();
        } catch (SftpException | IOException e) {
            e.printStackTrace();
        }

        return "upload success";
    }

    @GetMapping(value = "/sftp/download")
    public @ResponseBody String sftp_download(String fileDir, String fileName, String saveFile){
        SFTPUtil sftp = new SFTPUtil(sftpUser, sftpPass, sftpIp, sftpPort);
        sftp.login();
        sftp.download(fileDir,fileName,saveFile);
        return "download success";
    }
}
