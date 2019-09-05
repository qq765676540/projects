package com.ebi.export;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;

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
}
