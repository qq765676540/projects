﻿using O2S.Components.PDFRender4NET;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;
using System.Drawing.Imaging;

namespace PDFTOIMG
{
    class Program
    {
        static void Main(string[] args)
        {
            PdfToPng("d:\\ReportName2.pdf","d:\\","C#PdfToImg",1,1,ImageFormat.Png, 100);

        }

        /// <summary>
        /// 将PDF转换为图片的方法
        /// </summary>
        /// <param name="pdfInputPath">PDF文件路径</param>
        /// <param name="imageOutputPath">图片输出路径</param>
        /// <param name="imageName">生成图片的名字</param>
        /// <param name="startPageNum">从PDF文档的第几页开始转换</param>
        /// <param name="endPageNum">从PDF文档的第几页开始停止转换</param>
        /// <param name="imageFormat">设置所需图片格式</param>
        /// <param name="definition">设置图片的清晰度，数字越大越清晰</param>
        public static void PdfToPng(string pdfInputPath, string imageOutputPath,
        string imageName, int startPageNum, int endPageNum, ImageFormat imageFormat, int qxd)
        {
            PDFFile pdfFile = PDFFile.Open(pdfInputPath);
            if (!Directory.Exists(imageOutputPath))
            {
                Directory.CreateDirectory(imageOutputPath);
            }
            // validate pageNum
            if (startPageNum <= 0)
            {
                startPageNum = 1;
            }
            if (endPageNum > pdfFile.PageCount)
            {
                endPageNum = pdfFile.PageCount;
            }
            if (startPageNum > endPageNum)
            {
                int tempPageNum = startPageNum;
                startPageNum = endPageNum;
                endPageNum = startPageNum;
            }
            // start to convert each page
            if (endPageNum == 1)
            {
                Bitmap pageImage = pdfFile.GetPageImage(1 - 1, qxd);
                pageImage.Save(imageOutputPath + imageName + "." + imageFormat.ToString(), imageFormat);
                pageImage.Dispose();
            }
            else
            {
                for (int i = startPageNum; i <= endPageNum; i++)
                {
                    Bitmap pageImage = pdfFile.GetPageImage(i - 1, qxd);
                    pageImage.Save(imageOutputPath + imageName + i.ToString() + "." + imageFormat.ToString(), imageFormat);
                    pageImage.Dispose();
                }
            }
            pdfFile.Dispose();
        }
    }
}
