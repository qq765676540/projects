using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aspose.Pdf;
using System.IO;

namespace MergePDF2
{
    class Program
    {
        static void Main(string[] args)
        {
            string path_Source = "D:\\pdf";
            string path_Target = "D:\\";//计算机桌面的路径
            MergePDF(path_Source, path_Target, "666666.pdf");
        }

        private static void MergePDF(string SourcePath, string TargetPath, string NewFileName)
        {
            string[] filenames = Directory.GetFiles(SourcePath, "*.pdf", SearchOption.AllDirectories);
            int fileNum = filenames.Length;//pdf的个数
            Dictionary<int, string> myDictionary = new Dictionary<int, string>();
            if (fileNum < 2)
            {
                return;//源路径下只有一个PDF文件，那么不合并
            }
            Aspose.Pdf.Document a = new Document();
            foreach (var file in filenames)//遍历源路径，获取该路径下所有PDF文件的path
            {
                Document b = new Document(file);
                foreach (Page item in b.Pages)
                {
                    a.Pages.Add(item);
                }
                a.Save(TargetPath + "\\" + NewFileName);
            }
        }
    }
}
