package com.ebi.export;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.*;

public class PoiExcelUtil {
    public static void main(String[] args) throws IOException {
        PoiExcelUtil poi = new PoiExcelUtil();
        poi.exportExcel("d:\\test.xlsx");
    }

    public void exportExcel(String str) throws IOException {
        //读取excel
        File file = new File(str);
        InputStream input = null;
        input = new FileInputStream(file);
        Workbook workbook = new XSSFWorkbook(input);
        Sheet sheet = workbook.getSheetAt(0);
        //插入行
//        sheet.shiftRows(0, 10, 2);
//        Row newRow0 = sheet.createRow(0);
        //合并单元格
        CellRangeAddress region = new CellRangeAddress(1, 1, 0, 2);
        sheet.addMergedRegion(region);
        //保存关闭
        OutputStream output = null;
        output = new FileOutputStream(str);
        workbook.write(output);
        workbook.close();
        input.close();
        output.close();
        file = null;
        input = null;
        output = null;
    }
}
