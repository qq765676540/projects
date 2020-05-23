package com.ebi.export;

import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.*;

public class PoiExcelUtil {


    public static void main(String[] args) throws IOException {
        PoiExcelUtil poi = new PoiExcelUtil();
//        poi.exportExcel("d:\\test.xlsx");

        File file_a = new File("d:\\a.xlsx");
        InputStream input_a = new FileInputStream(file_a);
        Workbook workbook_a = new XSSFWorkbook(input_a);
        Sheet sheet_a = workbook_a.getSheetAt(0);

        File file_b = new File("d:\\b.xlsx");
        InputStream input_b = new FileInputStream(file_b);
        Workbook workbook_b = new XSSFWorkbook(input_b);
        Sheet sheet_b = workbook_b.getSheetAt(0);

        Row rowa = sheet_a.getRow(0);
        Cell cella = rowa.getCell(1);
//        System.out.println(sheet_a.getNumMergedRegions());

//        CellStyle setBorder = workbook_a.createCellStyle();
//        setBorder.setBorderBottom(BorderStyle.THIN);
//        setBorder.setBorderLeft(BorderStyle.THIN);
//        setBorder.setBorderRight(BorderStyle.THIN);
//        setBorder.setBorderTop(BorderStyle.THIN);
//        cella.setCellStyle(setBorder);
//        rowa.setRowStyle(setBorder);

//        sheet_a.setDefaultColumnStyle(1,setBorder);

        Row rowb = sheet_b.getRow(0);
        Cell cellb = rowb.getCell(0);
//        System.out.println(cellb.getStringCellValue());
        poi.copyCell(cellb,cella);

        //保存关闭
//        OutputStream output = new FileOutputStream("d:\\a.xlsx");

////        workbook_a.write(output);
////        workbook_a.close();
////        workbook_b.close();
////        input_a.close();
////        input_b.close();
////        output.close();
    }

    public void exportExcel(String str) throws IOException {
        //读取excel
        File file = new File(str);
        InputStream input = null;
        input = new FileInputStream(file);
        Workbook workbook = new XSSFWorkbook(input);
        Sheet sheet = workbook.getSheetAt(0);
        //插入行
        sheet.shiftRows(0, sheet.getLastRowNum(), 4);
        //创建单元格
        Row newRow0 = sheet.createRow(0);
        Cell newCell0 = newRow0.createCell(0);
        newCell0.setCellValue("我是标题");

        //设置样式
        CellStyle cellStyle = workbook.createCellStyle();
        //设置对齐方式
        cellStyle.setAlignment(HorizontalAlignment.CENTER);
        //设置自动换行
        cellStyle.setWrapText(true);
        //创建字体样式
        Font font = workbook.createFont();
        //设置字体
        font.setFontName("宋体");
        //设置字的大小
        font.setFontHeightInPoints((short) 16);
        //设置粗体
        font.setBold(true);
        cellStyle.setFont(font);
        //设置列样式
        newCell0.setCellStyle(cellStyle);

        //合并单元格
        CellRangeAddress region = new CellRangeAddress(0, 0, 0, 7);
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

    public void copyRows(int startRow, int endRow, int pPosition, Sheet sheet) {
        int pStartRow = startRow - 1;
        int pEndRow = endRow - 1;
        int targetRowFrom;
        int targetRowTo;
        int columnCount;
        CellRangeAddress region = null;
        int i;
        int j;
        if (pStartRow == -1 || pEndRow == -1) {
            return;
        }
        // 拷贝合并的单元格
        for (i = 0; i < sheet.getNumMergedRegions(); i++) {
            region = sheet.getMergedRegion(i);
            if ((region.getFirstRow() >= pStartRow)
                    && (region.getLastRow() <= pEndRow)) {
                targetRowFrom = region.getFirstRow() - pStartRow + pPosition;
                targetRowTo = region.getLastRow() - pStartRow + pPosition;
                CellRangeAddress newRegion = region.copy();
                newRegion.setFirstRow(targetRowFrom);
                newRegion.setFirstColumn(region.getFirstColumn());
                newRegion.setLastRow(targetRowTo);
                newRegion.setLastColumn(region.getLastColumn());
                sheet.addMergedRegion(newRegion);
            }
        }
        // 设置列宽
        for (i = pStartRow; i <= pEndRow; i++) {
            Row sourceRow = sheet.getRow(i);
            columnCount = sourceRow.getLastCellNum();
            if (sourceRow != null) {
                Row newRow = sheet.createRow(pPosition - pStartRow + i);
                newRow.setHeight(sourceRow.getHeight());
                for (j = 0; j < columnCount; j++) {
                    Cell templateCell = sourceRow.getCell(j);
                    if (templateCell != null) {
                        Cell newCell = newRow.createCell(j);
                        copyCell(templateCell, newCell);
                    }
                }
            }
        }
    }

    public void copyCell(Cell srcCell, Cell distCell) {
//        distCell.setCellStyle(srcCell.getCellStyle());
        distCell.getCellStyle().cloneStyleFrom(srcCell.getCellStyle());
        if (srcCell.getCellComment() != null) {
            distCell.setCellComment(srcCell.getCellComment());
        }
        int srcCellType = srcCell.getCellType();
        distCell.setCellType(srcCellType);
        if (srcCellType == HSSFCell.CELL_TYPE_NUMERIC) {
            if (HSSFDateUtil.isCellDateFormatted(srcCell)) {
                distCell.setCellValue(srcCell.getDateCellValue());
            } else {
                distCell.setCellValue(srcCell.getNumericCellValue());
            }
        } else if (srcCellType == HSSFCell.CELL_TYPE_STRING) {
            distCell.setCellValue(srcCell.getRichStringCellValue());
        } else if (srcCellType == HSSFCell.CELL_TYPE_BLANK) {
            // nothing21
        } else if (srcCellType == HSSFCell.CELL_TYPE_BOOLEAN) {
            distCell.setCellValue(srcCell.getBooleanCellValue());
        } else if (srcCellType == HSSFCell.CELL_TYPE_ERROR) {
            distCell.setCellErrorValue(srcCell.getErrorCellValue());
        } else if (srcCellType == HSSFCell.CELL_TYPE_FORMULA) {
            distCell.setCellFormula(srcCell.getCellFormula());
        } else { // nothing29

        }
    }


}
