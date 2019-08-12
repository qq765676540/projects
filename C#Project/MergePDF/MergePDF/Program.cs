using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using iTextSharp.text;
using iTextSharp.text.pdf;

namespace MergePDF
{
    class Program
    {
        static void Main(string[] args)
        {
            MergePDF("d:\\pdf","d:\\abc.pdf");
        }
        /// <summary>
        /// 读取合并的pdf文件名称
        /// </summary>
        /// <param name="Directorypath">目录</param>
        /// <param name="outpath">导出的路径</param>
        public static void MergePDF(string Directorypath, string outpath)
        {
            List<string> filelist2 = new List<string>();
            System.IO.DirectoryInfo di2 = new System.IO.DirectoryInfo(Directorypath);
            FileInfo[] ff2 = di2.GetFiles("*.pdf");
            BubbleSort(ff2);
            foreach (FileInfo temp in ff2)
            {
                filelist2.Add(Directorypath + "\\" + temp.Name);
            }
            mergePDFFiles(filelist2, outpath);
            //DeleteAllPdf(Directorypath);
        }


        /// <summary>
        /// 冒泡排序
        /// </summary>
        /// <param name="arr">文件名数组</param>
        public static void BubbleSort(FileInfo[] arr)
        {
            for (int i = 0; i < arr.Length; i++)
            {
                for (int j = i; j < arr.Length; j++)
                {
                    if (arr[i].LastWriteTime > arr[j].LastWriteTime)//按创建时间（升序）
                    {
                        FileInfo temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                    }
                }
            }
        }


        /// <summary>
        /// 合成pdf文件
        /// </summary>
        /// <param name="fileList">文件名list</param>
        /// <param name="outMergeFile">输出路径</param>
        public static void mergePDFFiles(List<string> fileList, string outMergeFile)
        {
            PdfReader reader;
            Rectangle rec = new Rectangle(1660, 1000);
            Document document = new Document(rec);
            PdfWriter writer = PdfWriter.GetInstance(document, new FileStream(outMergeFile, FileMode.Create));
            document.Open();
            PdfContentByte cb = writer.DirectContent;
            PdfImportedPage newPage;
            for (int i = 0; i < fileList.Count; i++)
            {
                reader = new PdfReader(fileList[i]);
                int iPageNum = reader.NumberOfPages;
                for (int j = 1; j <= iPageNum; j++)
                {
                    document.NewPage();
                    newPage = writer.GetImportedPage(reader, j);
                    cb.AddTemplate(newPage, 0, 0);
                }
            }
            document.Close();
        }


        /// <summary>
        /// 删除一个文件里所有的文件
        /// </summary>
        /// <param name="Directorypath">文件夹路径</param>
        public static void DeleteAllPdf(string Directorypath)
        {
            System.IO.DirectoryInfo di = new System.IO.DirectoryInfo(Directorypath);
            if (di.Exists)
            {
                FileInfo[] ff = di.GetFiles("*.pdf");
                foreach (FileInfo temp in ff)
                {
                    File.Delete(Directorypath + "\\" + temp.Name);
                }
            }
        }
    }
}
