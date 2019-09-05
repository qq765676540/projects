package tools;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;


import java.io.InputStream;
import java.io.OutputStream;

import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class PoiExcelUtil {

    public static void main(String[] args) throws IOException {
        String fileName = "d:\\test.xlsx";
        PoiExcelUtil excelDAO = new PoiExcelUtil();
        excelDAO.insertRow(fileName);
    }

    public void insertRow(String fileName) throws IOException {

        File file = new File(fileName);
        InputStream input = null;
        input = new FileInputStream(file);
        Workbook workbook = new XSSFWorkbook(input);
        Sheet sheet = workbook.getSheetAt(0);
        sheet.shiftRows(0, 10, 2);
//	        Row newRow0 = sheet.createRow(0);
        OutputStream output = null;
        output = new FileOutputStream(fileName);
        workbook.write(output);
        workbook.close();
        input.close();
        output.close();
        file = null;
        input = null;
        output = null;
//	        System.gc();

    }

}
