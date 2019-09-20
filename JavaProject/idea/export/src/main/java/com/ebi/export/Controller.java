package com.ebi.export;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.lang.reflect.InvocationTargetException;
import java.util.*;

@RestController
@CrossOrigin
public class Controller {
    @RequestMapping(value = "/hello")
    public String hello() {
        return "hello,Spring Boot";
    }

    @GetMapping(value = "export")
    public String export(String str) throws IOException {
        File file = new File(str);
        InputStream input = null;
        input = new FileInputStream(file);
        Workbook workbook = new XSSFWorkbook(input);
        Sheet sheet = workbook.getSheetAt(0);
        sheet.shiftRows(0, 10, 2);
        Row newRow0 = sheet.createRow(0);
        OutputStream output = null;
        output = new FileOutputStream(str);
        workbook.write(output);
        workbook.close();
        input.close();
        output.close();
        file = null;
        input = null;
        output = null;
        return str;
    }

    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
    public void uploadFiles(HttpServletRequest request, HttpServletResponse response) throws IOException {


    }

}
